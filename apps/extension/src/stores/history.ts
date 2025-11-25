import { useRequest } from 'vue-request';
import { defaultRole } from './role';
import {
  addHistory,
  deleteCurrentRoleHistory,
  deleteHistory,
  getCurrentRoleHistory,
  type HistoryItem,
} from '@/api/history';
import { createGlobalState } from '@vueuse/core';
import { message } from '@/utils/discrete-api';

// 当前角色的浏览记录
const useCurrentRoleHistory = createGlobalState(() => {
  return useRequest(getCurrentRoleHistory, {
    // manual: true,
    onError(err) {
      message.error(err.message);
    },

    // debounceInterval: 1000,
    refreshDeps: [defaultRole],
  });
});

export const {
  data: currentRoleHistory,
  loading: currentRoleHistoryLoading,
  refresh: refreshCurrentRoleHistory,
} = useCurrentRoleHistory();

// 添加浏览记录
const useAddHistory = createGlobalState(() => {
  return useRequest(addHistory, {
    manual: true,
    onError(err) {
      message.error(err.message);
    },
    onSuccess() {
      // message.success('添加成功');
      refreshCurrentRoleHistory();
    },
  });
});

export const {
  run: runAddHistory,
  loading: addHistoryLoading,
  refresh: refreshAddHistory,
} = useAddHistory();

// 删除当前角色的浏览记录（清空当前角色所有记录）
const useDeleteCurrentRoleHistory = createGlobalState(() => {
  return useRequest(deleteCurrentRoleHistory, {
    manual: true,
    onError(err) {
      message.error(err.message);
    },
    onSuccess() {
      message.success('清空成功');
      refreshCurrentRoleHistory();
    },
  });
});

export const {
  run: runDeleteCurrentRoleHistory,
  loading: deleteCurrentRoleHistoryLoading,
  refresh: refreshDeleteCurrentRoleHistory,
} = useDeleteCurrentRoleHistory();

// 删除某条浏览记录
const useDeleteHistory = createGlobalState(() => {
  return useRequest(deleteHistory, {
    manual: true,
    onError(err) {
      message.error(err.message);
    },
    onSuccess() {
      message.success('删除成功');
      refreshCurrentRoleHistory();
    },
  });
});

export const {
  run: runDeleteHistory,
  loading: deleteHistoryLoading,
  refresh: refreshDeleteHistory,
} = useDeleteHistory();

/*
 * 全部的浏览记录
 * 只本地储存，当前会话有效
 */
export const allHistory = ref<Array<HistoryItem>>([]);
