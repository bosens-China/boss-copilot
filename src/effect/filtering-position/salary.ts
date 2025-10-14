import { extractSalary } from '@/utils/salary';
import { defineNode } from './type';
import { addFilter } from '@/stores/filter';

/*
 * 薪水过滤
 */
export default defineNode((config) => {
  const {
    job: { salaryDesc },
    currentPosition: { minSalary, maxSalary },
  } = config;
  // 薪水过滤
  const salary = extractSalary(salaryDesc);

  if (minSalary || maxSalary) {
    // 如果用户写了最低期待
    if (salary.maxSalary && minSalary && minSalary > salary.maxSalary) {
      addFilter('salaryRange', config.global.filterItem);
      return;
    }
    // 如果用户写了最高期待
    if (maxSalary && salary.minSalary && maxSalary < salary.minSalary) {
      addFilter('salaryRange', config.global.filterItem);
    }
  }
});
