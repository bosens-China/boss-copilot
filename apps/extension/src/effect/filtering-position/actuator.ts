import positionAccessControl from './positionAccessControl';
import salary from './salary';
import city from './city';
import blacklistCompanies from './blacklist-companies';
import type { FilterItem } from '@/stores/filter';
import { type Config } from './type';

const actuator = [positionAccessControl, salary, blacklistCompanies, city];

/*
 * 入口
 * 过滤岗位，通过职责链来封装
 */
export const filteringPosition = async (slices: Array<FilterItem>) => {
  const filterList: Config['filterList'] = [];

  for (const fn of actuator) {
    // 剩余数组，要去掉已经过滤的岗位
    const remainingSlices = slices.filter(
      (slice) =>
        !filterList.some((filter) => filter.encryptId === slice.encryptId),
    );
    await fn({
      slices: remainingSlices,
      filterList,
    });
  }
  return filterList;
};
