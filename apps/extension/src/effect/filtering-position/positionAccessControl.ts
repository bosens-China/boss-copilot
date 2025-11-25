import { defineNode } from './type';
import { currentPosition, currentPositionLoading } from '@/stores/position';
import { until } from '@vueuse/core';

/*
 * 黑名单，白名单岗位判断，判断是否在关键词的黑名单或白名单中，这个函数会做两个事情
 */
export default defineNode(async ({ slices, filterList }) => {
  const calculate = () => {
    const blackReg = currentPosition.value?.black
      ? new RegExp(currentPosition.value.black.split('，').join('|'), 'i')
      : null;
    const whiteReg = currentPosition.value?.white
      ? new RegExp(currentPosition.value.white.split('，').join('|'), 'i')
      : null;
    for (const { jobName, encryptId } of slices) {
      // 黑名单判定
      if (blackReg && blackReg.test(jobName)) {
        filterList.push({
          type: 'blackList',
          encryptId: encryptId,
        });
      }
      // 白名单判定
      if (whiteReg && !whiteReg.test(jobName)) {
        filterList.push({
          type: 'whiteList',
          encryptId: encryptId,
        });
      }
    }
  };

  await until(currentPositionLoading).toBe(false);
  calculate();
});
