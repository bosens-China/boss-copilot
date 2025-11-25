import { useEventListener, createGlobalState } from '@vueuse/core';

/*
 * 路由守卫
 * 目前是油猴支持在boss直聘的任意页面运行
 * 但是程序必须在某些url下才能真正使用
 * https://www.zhipin.com/web/geek/jobs?query=%E5%A4%A7%E6%A8%A1%E5%9E%8B%E5%BC%80%E5%8F%91&city=101220100
 * https://www.zhipin.com/web/geek/jobs?city=101220100
 *
 */
const usePathGuard = () => {
  const isAllowed = ref(false);

  const checkPath = () => {
    const url = window.location.href;
    if (url.includes('https://www.zhipin.com/web/geek/jobs')) {
      isAllowed.value = true;
    } else {
      isAllowed.value = false;
    }
  };
  useEventListener(window, 'popstate', checkPath);
  checkPath();
  return { isAllowed };
};

export default createGlobalState(usePathGuard);
