import { defineNode } from './type';
import { blacklistStore, getCurrentRoleBlacklist } from '@/stores/blacklist';
import { addFilter } from '@/stores/filter';

/*
 * 黑名单公司过滤
 */
export default defineNode(({ currentPosition, job, global }) => {
  const { blackCompanyEnabled } = currentPosition;
  if (!blackCompanyEnabled) {
    return;
  }
  const currentRoleBlacklist = getCurrentRoleBlacklist();
  const arr = [...blacklistStore.value.general, ...currentRoleBlacklist].map(
    (item) => item.name,
  );

  const { brandName } = job;
  if (arr.includes(brandName)) {
    addFilter('blackCompany', global.filterItem);
  }
});
