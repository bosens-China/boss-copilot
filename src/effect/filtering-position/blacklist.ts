import { addFilter } from '@/stores/filter';
import { defineNode } from './type';

/*
 * 黑名单岗位判断
 */
export default defineNode((config) => {
  const {
    currentPosition: { black },
    job: { jobName },
  } = config;

  if (black) {
    const blackReg = new RegExp(black.split('，').join('|'), 'i');
    if (blackReg.test(jobName)) {
      addFilter('blackList', config.global.filterItem);
    }
  }
});
