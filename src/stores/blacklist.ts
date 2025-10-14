/*
 * 黑名单单位列表
 */

import { useLocalSync } from '@/hooks/useLocalSync';
import blacklist from '@/constant/blacklist';
import { roleStore } from './role';

export interface GeneralItem {
  name: string;
  id: string;
}

interface CurrentRoleItem {
  roleId: string;
  name: string;
  id: string;
}

// 设计复杂一些，分为通用和当前角色黑名单
interface Blacklist {
  general: GeneralItem[];
  roleBlacklist: Record<string, CurrentRoleItem[]>;
}

export const blacklistStore = useLocalSync<Blacklist>('blacklistStore', {
  general: blacklist,
  roleBlacklist: {},
});

/*
 * 获取当前角色的黑名单
 */
export const getCurrentRoleBlacklist = () => {
  return (blacklistStore.value.roleBlacklist[roleStore.value.currentRoleId] ||=
    []);
};

/*
 * 删除指定的黑名单id
 */
export const deleteBlacklist = (id: string, type: 'general' | 'role') => {
  if (type === 'general') {
    blacklistStore.value.general = blacklistStore.value.general.filter(
      (f) => f.id !== id,
    );
    return;
  }
  const currentRoleBlacklist = getCurrentRoleBlacklist();
  blacklistStore.value.roleBlacklist[roleStore.value.currentRoleId] =
    currentRoleBlacklist.filter((f) => f.id !== id);
};
