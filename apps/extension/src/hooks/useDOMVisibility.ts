/*
 * 隐藏和恢复dom岗位的显示
 */

const ATTR_NAME = 'hide';

export const useDOMVisibility = () => {
  const hidePositions = (encryptIds: Array<string>) => {
    if (!encryptIds.length) {
      return 0;
    }
    let count = 0;
    const lis = document.querySelectorAll(
      `.rec-job-list .card-area:not([${ATTR_NAME}=true])`,
    ) as NodeListOf<HTMLLIElement>;

    lis.forEach((li) => {
      const a = li.querySelector('.job-name') as HTMLAreaElement;
      const href = a.href;

      if (encryptIds.some((encryptId) => href.includes(encryptId))) {
        li.style.display = 'none';
        li.setAttribute(ATTR_NAME, 'true');
        count++;
      }
    });
    return count;
  };

  const showPositions = (encryptIds?: Array<string>) => {
    const lis = document.querySelectorAll(
      `.rec-job-list .card-area[${ATTR_NAME}=true]`,
    ) as NodeListOf<HTMLLIElement>;
    // 如果不传递恢复的，则恢复所有
    if (!encryptIds) {
      lis.forEach((li) => {
        li.style.display = 'block';
        li.removeAttribute(ATTR_NAME);
      });
      return;
    }
    lis.forEach((li) => {
      const a = li.querySelector('.job-name') as HTMLAreaElement;
      const href = a.href;
      if (encryptIds.some((encryptId) => href.includes(encryptId))) {
        li.style.display = 'block';
        li.removeAttribute(ATTR_NAME);
      }
    });
  };

  return {
    hidePositions,
    showPositions,
  };
};
