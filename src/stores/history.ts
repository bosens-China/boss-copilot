import { useLocalSync } from '@/hooks/useLocalSync';
import type { FilterItem } from './filter';
import { roleStore } from './role';

export type HistoryItem = FilterItem & {
  time: number;
};

/*
 * 所有的历史记录
 */
export const historyStore = ref<FilterItem[]>([]);

/*
 * 当前角色的点击记录
 */
export const currentRoleHistoryStore = useLocalSync<
  // 角色id -> 岗位id -> 历史记录
  Record<string, Record<string, HistoryItem>>
>('currentRoleHistoryStore', {});

export const addCurrentRoleHistory = (encryptId: string) => {
  currentRoleHistoryStore.value[roleStore.value.currentRoleId] ||= {};

  const item = historyStore.value.find((item) => item.encryptId === encryptId);
  if (!item) {
    return;
  }

  currentRoleHistoryStore.value[roleStore.value.currentRoleId]![encryptId] = {
    ...item,
    time: Date.now(),
  };
};

/*
 * 删除某条点击记录
 */
export const deleteHistory = (encryptId: string) => {
  delete currentRoleHistoryStore.value[roleStore.value.currentRoleId]![
    encryptId
  ];
};

/*
 * 获取当前角色的所有点击记录
 */
export const getCurrentRoleHistory = () => {
  return currentRoleHistoryStore.value[roleStore.value.currentRoleId] || {};
};
