/*
 * 对点击过的岗位信息进行标记
 */

import { currentPosition } from '@/stores/position';
import { allHistory, currentRoleHistory } from '@/stores/history';
import { watchDebounced } from '@vueuse/core';

const ATTR_NAME = 'highlight';
/*
 * 对浏览记录进行高亮
 */
export const usePostMark = () => {
  const showMark = () => {
    const lis = Array.from(
      document.querySelectorAll(
        `.rec-job-list .card-area:not([${ATTR_NAME}=true])`,
      ),
    ) as Array<HTMLLIElement>;
    lis.forEach((item) => {
      item.removeAttribute(ATTR_NAME);
      const li = item.querySelector('.job-card-box') as HTMLLIElement;
      li.style.cssText = '';
    });
  };
  const hideMark = () => {
    const lis = Array.from(
      document.querySelectorAll(
        `.rec-job-list .card-area:not([${ATTR_NAME}=true])`,
      ),
    ) as Array<HTMLLIElement>;
    lis.forEach((item) => {
      const link = item.querySelector('.job-name') as HTMLLinkElement;
      const href = link.href;
      const li = item.querySelector('.job-card-box') as HTMLLIElement;
      if (currentRoleHistoryUrls.value.includes(href)) {
        li.style.cssText = `border: 2px solid #373ff6; opacity: 0.80 ;`;
        item.setAttribute(ATTR_NAME, 'true');
      }
    });
  };

  const currentRoleHistoryUrls = computed(() => {
    return currentRoleHistory.value?.map((item) => item.url) || [];
  });

  watchDebounced(
    [allHistory, currentPosition, currentRoleHistoryUrls],
    () => {
      showMark();
      if (
        !currentPosition.value?.history_highlight_enabled ||
        !currentRoleHistoryUrls.value?.length
      ) {
        return;
      }
      hideMark();
    },
    {
      debounce: 500,
      deep: true,
      flush: 'post',
    },
  );
};
