import { defineNode } from './type';
import {
  commonBlockedCompanies,
  commonBlockedCompaniesLoading,
  currentRoleBlockedCompanies,
  currentRoleBlockedCompaniesLoading,
} from '@/stores/blacklist';
import { currentPositionLoading, currentPosition } from '@/stores/position';
import { until } from '@vueuse/core';

/*
 * 黑名单公司过滤，会过滤通用和用户填写的黑名单公司
 */
export default defineNode(async ({ slices, filterList }) => {
  const calculate = () => {
    if (!currentPosition.value?.black_company_enabled) {
      return;
    }
    const blackList = [
      ...(commonBlockedCompanies.value ?? []),
      ...(currentRoleBlockedCompanies.value ?? []),
    ].map((item) => item.name);

    for (const { encryptId, companyName } of slices) {
      if (blackList.includes(companyName)) {
        filterList.push({
          type: 'blackCompany',
          encryptId: encryptId,
        });
      }
    }
  };

  await until(() => {
    return [
      commonBlockedCompaniesLoading.value,
      currentRoleBlockedCompaniesLoading.value,
      currentPositionLoading.value,
    ].some(Boolean);
  }).toBe(false);

  calculate();
});
