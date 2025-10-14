import { addFilter } from '@/stores/filter';
import { defineNode } from './type';

/*
 * 过滤城市
 */
export default defineNode(({ job, currentPosition, global }) => {
  if (!currentPosition.city) {
    return;
  }
  if (job.cityName !== currentPosition.city) {
    addFilter('city', global.filterItem);
  }
});
