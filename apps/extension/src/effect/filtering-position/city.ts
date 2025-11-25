import { defineNode } from './type';
import { currentPosition, currentPositionLoading } from '@/stores/position';
import { until } from '@vueuse/core';

/*
 * 过滤城市
 */
export default defineNode(async ({ slices, filterList }) => {
  const calculate = () => {
    const city = currentPosition.value?.city;
    if (!city) {
      return;
    }

    for (const { cityName, encryptId } of slices) {
      if (cityName !== city) {
        filterList.push({
          type: 'city',
          encryptId: encryptId,
        });
      }
    }
  };

  await until(currentPositionLoading).toBe(false);
  calculate();
});
