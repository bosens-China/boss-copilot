/*
 * 对点击过的岗位信息进行标记
 */

import {
  currentRoleHistoryStore,
  getCurrentRoleHistory,
} from '@/stores/history';

// border: 1px solid #c27474;
// opacity: 0.85;

const attr = 'post-mark';

export const postMark = (encryptIds: Array<string>) => {
  if (!encryptIds.length) {
    return 0;
  }

  let count = 0;
  const lis = document.querySelectorAll(
    `.rec-job-list .card-area:not([${attr}=true])`,
  ) as NodeListOf<HTMLLIElement>;

  lis.forEach((li) => {
    const a = li.querySelector('.job-name') as HTMLAreaElement;
    const href = a.href;

    if (encryptIds.some((encryptId) => href.includes(encryptId))) {
      const box = li.querySelector('.job-card-box') as HTMLLIElement;
      box.style.cssText = `border: 1px solid #c27474; opacity: 0.85;`;
      li.setAttribute(attr, 'true');
      count++;
    }
  });
  return count;
};

export const usePostMark = () => {
  watch(
    () => currentRoleHistoryStore.value,
    () => {
      const history = getCurrentRoleHistory();
      const encryptIds = Object.keys(history);
      postMark(encryptIds);
    },
    {
      deep: true,
      flush: 'post',
    },
  );
};
