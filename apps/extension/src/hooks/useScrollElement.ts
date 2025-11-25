import { useMutationObserver, watchDebounced } from '@vueuse/core';
import usePathGuard from './usePathGuard';

/*
 * 滚动加载更多岗位信息
 */
export const useScrollElement = () => {
  const { isAllowed } = usePathGuard();

  // 加载是否完成
  const isEnd = ref(false);

  // 当路由变化的时候，是我们期待的页面则运行监听器，观察style属性的变化
  let stop: () => void;

  watch(
    isAllowed,
    () => {
      if (!isAllowed.value) {
        stop?.();
        return;
      }
      const el = document.body.querySelector(
        '#footer-wrapper',
      ) as HTMLDivElement | null;
      if (!el) {
        return;
      }
      const fn = () => {
        const display = window.getComputedStyle(el).display;
        isEnd.value = display !== 'none';
      };
      ({ stop } = useMutationObserver(el, fn, {
        attributes: true,
        attributeFilter: ['style'],
      }));
      fn();
    },
    {
      flush: 'post',
      immediate: true,
    },
  );
  const message = useMessage();

  let timer: number | null = null;
  let timeoutTimer: number | null = null;

  // 清理事件
  const clearTimer = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    if (timeoutTimer) {
      clearTimeout(timeoutTimer);
      timeoutTimer = null;
    }
    const dom = document.body.querySelector(
      '.job-list-container',
    ) as HTMLDivElement | null;
    if (dom) {
      dom.style.height = 'auto';
    }

    window.scrollTo(0, document.body.scrollHeight);
  };

  const startScrolling = () => {
    if (!isAllowed.value) {
      return;
    }
    const dom = document.body.querySelector(
      '.job-list-container',
    ) as HTMLDivElement | null;
    if (!dom) {
      return;
    }
    isEnd.value = false;
    // 先进行一个滚动条的判定，因为加载的逻辑需要依赖于滚动条
    const hasVerticalScrollbar =
      document.documentElement.scrollHeight > window.innerHeight;
    // 如果没有滚动条则设置很大的高度让其触发滚动
    if (!hasVerticalScrollbar) {
      dom.style.height = window.innerHeight + `1000px`;
    }

    const rolling = () => {
      window.scrollTo(0, 0);
      nextTick(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
    };

    timer = setInterval(rolling, 500);
    rolling();

    // 15s 后如果就算没有滚动结束也终止
    timeoutTimer = setTimeout(() => {
      if (timer) {
        clearTimer();
        message.info('已加载完成');
      }
    }, 15000);
  };

  watchDebounced(
    isEnd,
    () => {
      if (isEnd.value && timer) {
        clearTimer();
        message.info('已加载完成');
      }
    },
    {
      flush: 'post',
      debounce: 500,
    },
  );
  return {
    startScrolling,
    isAllowed,
    isEnd,
  };
};
