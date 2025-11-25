import { allHistory } from '@/stores/history';
import { filteringPosition } from '@/effect/filtering-position/actuator';
import usePathGuard from './usePathGuard';
import { addFilter, getCurrentRoleFilters } from '@/stores/filter';
import { useDOMVisibility } from './useDOMVisibility';
import {
  commonBlockedCompanies,
  currentRoleBlockedCompanies,
} from '@/stores/blacklist';
import { currentPosition } from '@/stores/position';
import { watchDebounced } from '@vueuse/core';

/*
 * 执行说明挂载成功了，现在需要对数据进行处理
 * 我们需要先看下当前的岗位是否也获取成功了
 * 注意，我们需要判断下当前页面是否存在dom，如果不存在说明不是要执行的页面，跳过就好
 */
export const useFilterPosition = () => {
  const { isAllowed } = usePathGuard();
  const { hidePositions, showPositions } = useDOMVisibility();
  const message = useMessage();

  // 过滤岗位，手动操作
  const filterPositions = async () => {
    // 必须在允许页面才执行过滤
    if (!isAllowed.value) {
      return;
    }
    const ul = document.querySelector('.rec-job-list');
    if (!ul) {
      return;
    }
    // 截取区间，因为会很多岗位，但是我们不区分，通过dom来进行区分即可
    const li = Array.from(ul.querySelectorAll('.card-area'));
    const [start, end] = [li.at(0), li.at(-1)];
    if (!start || !end) {
      return;
    }
    const startHref = start.querySelector('.job-name') as HTMLLinkElement;
    const endHref = end.querySelector('.job-name') as HTMLLinkElement;

    const startEncryptId = startHref.href;
    const endEncryptId = endHref.href;

    const startIndex = allHistory.value.findLastIndex(
      (item) => item.url === startEncryptId,
    );

    const endIndex = allHistory.value.findLastIndex(
      (item) => item.url === endEncryptId,
    );
    if (startIndex === -1 || endIndex === -1) {
      return;
    }
    /*
     * 获取所有的过滤结果，然后先把岗位列表已经出现在过滤结果中的岗位隐藏掉
     */
    const allFilters = Object.values(getCurrentRoleFilters() || {})
      .flat(2)
      .map((item) => item.encryptId);

    const currentRangeHistory = allHistory.value.slice(
      startIndex,
      endIndex + 1,
    );

    // 1. 找出已经在过滤列表中的 ID (这些也需要确保被隐藏)
    const alreadyFilteredIds = currentRangeHistory
      .filter((item) => allFilters.includes(item.encryptId))
      .map((item) => item.encryptId);

    // 2. 找出未在过滤列表中的，进行新一轮检测
    const slices = currentRangeHistory.filter(
      (item) => !allFilters.includes(item.encryptId),
    );

    const newFilteredIds: string[] = [];

    if (slices.length) {
      // 执行过滤，获取过滤后的结果
      const filterList = await filteringPosition(slices);
      if (filterList.length) {
        filterList.forEach((filter) => {
          const item = allHistory.value.find(
            (item) => item.encryptId === filter.encryptId,
          );
          if (item) {
            addFilter(filter.type, item);
          }
        });
        newFilteredIds.push(...filterList.map((item) => item.encryptId));
      }
    }

    // 合并所有需要隐藏的 ID
    const idsToHide = [...alreadyFilteredIds, ...newFilteredIds];

    if (idsToHide.length) {
      const count = hidePositions(idsToHide);
      // 只有当确实有新过滤的岗位，且实际发生了隐藏操作时才提示
      if (count && newFilteredIds.length > 0) {
        message.success(
          `隐藏了${count}个岗位，过滤结果可以在“过滤结果”页面查看`,
        );
      }
    }
  };

  /*
   * 只要岗位列表刷新，默认就执行过滤
   */
  watch(
    [allHistory, isAllowed],
    () => {
      filterPositions();
    },
    {
      deep: true,
      flush: 'post',
    },
  );

  /*
   * 岗位或者黑名单发生变化也要执行过滤
   */
  watchDebounced(
    [commonBlockedCompanies, currentRoleBlockedCompanies, currentPosition],
    () => {
      showPositions();
      filterPositions();
    },
    {
      deep: true,
      flush: 'post',
      debounce: 500,
    },
  );
};
