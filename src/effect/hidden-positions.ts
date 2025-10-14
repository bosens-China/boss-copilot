/*
 * 根据id隐藏岗位
 */

export const hiddenPositions = (encryptIds: Array<string>) => {
  if (!encryptIds.length) {
    return 0;
  }

  let count = 0;
  const lis = document.querySelectorAll(
    '.rec-job-list .card-area:not([mark=true])',
  ) as NodeListOf<HTMLLIElement>;

  lis.forEach((li) => {
    const a = li.querySelector('.job-name') as HTMLAreaElement;
    const href = a.href;

    if (encryptIds.some((encryptId) => href.includes(encryptId))) {
      li.style.display = 'none';
      li.setAttribute('mark', 'true');
      count++;
    }
  });
  return count;
};
