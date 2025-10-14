import { addFilter } from '@/stores/filter';
import { defineNode } from './type';

/*
 * 白名单岗位判断
 */
export default defineNode((config) => {
  const {
    currentPosition: { white },
    job: { jobName },
  } = config;

  if (white) {
    const whiteReg = new RegExp(white.split('，').join('|'), 'i');

    if (!whiteReg.test(jobName)) {
      addFilter('whiteList', config.global.filterItem);
    }
  }
});
