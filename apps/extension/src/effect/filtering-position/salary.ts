import { extractSalary } from '@/utils/salary';
import { defineNode } from './type';
import { currentPositionLoading, currentPosition } from '@/stores/position';
import { until } from '@vueuse/core';

/*
 * 薪水过滤，判断是否在薪水范围内
 */
export default defineNode(async ({ slices, filterList }) => {
  const calculate = () => {
    const minSalary = currentPosition.value?.min_salary;
    const maxSalary = currentPosition.value?.max_salary;

    for (const { salaryRange, encryptId } of slices) {
      // 薪水过滤
      const salary = extractSalary(salaryRange);

      if (minSalary || maxSalary) {
        // 如果用户写了最低期待
        if (salary.maxSalary && minSalary && minSalary > salary.maxSalary) {
          filterList.push({
            type: 'salaryRange',
            encryptId: encryptId,
          });
          continue;
        }
        // 如果用户写了最高期待
        if (maxSalary && salary.minSalary && maxSalary < salary.minSalary) {
          filterList.push({
            type: 'salaryRange',
            encryptId: encryptId,
          });
        }
      }
    }
  };

  await until(currentPositionLoading).toBe(false);
  calculate();
});
