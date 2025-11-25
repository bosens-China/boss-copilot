import { useEventListener } from '@vueuse/core';
import usePathGuard from './usePathGuard';
import { allHistory, runAddHistory } from '@/stores/history';

/*
 * 作用是监听用户每次点击岗位信息，然后记录下来
 * 这次不通过拦截接口实现，因为发现默认的时候会点击到第一条，但是这个不一定是用户想看到的，这次要求明确的点击才会被记录下来
 */
export const useMonitorClicks = () => {
  const { isAllowed } = usePathGuard();
  useEventListener(document, 'click', (event) => {
    // 必须在指定页面才能点击
    if (!isAllowed.value) {
      return;
    }
    // 判断点击的元素上级是不是属于 .rec-job-list 下的 .card-area
    const raget = event.target as HTMLElement;
    const card = raget.closest('.card-area');
    if (!card) {
      return;
    }
    const link = card.querySelector('.job-name') as HTMLLinkElement;

    const href = link.href;

    const item = allHistory.value.find((item) => item.url === href);
    if (!item) {
      return;
    }
    // 添加到浏览记录中
    runAddHistory(item);
  });
};
