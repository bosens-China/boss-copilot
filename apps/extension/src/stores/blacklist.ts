/*
 * 黑名单有关操作
 */

import { defaultRole } from './role';
import {
  getCommonBlockedCompanies,
  deleteCommonBlockedCompany,
  getCurrentRoleBlockedCompanies,
  deleteCurrentRoleBlockedCompany,
  addCommonBlockedCompany,
  addCurrentRoleBlockedCompany,
  resetCommonBlockedCompanies,
} from '@/api/blacklist';
import { message } from '@/utils/discrete-api';
import { createGlobalState } from '@vueuse/core';
import { useRequest } from 'vue-request';

// 通用黑名单列表
const useCommonBlockedCompanies = createGlobalState(() => {
  return useRequest(getCommonBlockedCompanies, {
    onError(err) {
      message.error(err.message);
    },
  });
});

export const {
  data: commonBlockedCompanies,
  loading: commonBlockedCompaniesLoading,
  refresh: refreshCommonBlockedCompanies,
} = useCommonBlockedCompanies();

// 当前角色的黑名单列表
const useCurrentRoleBlockedCompanies = createGlobalState(() => {
  return useRequest(getCurrentRoleBlockedCompanies, {
    onError(err) {
      message.error(err.message);
    },
    // debounceInterval: 500,
    refreshDeps: [defaultRole],
  });
});

export const {
  data: currentRoleBlockedCompanies,
  loading: currentRoleBlockedCompaniesLoading,
  refresh: refreshCurrentRoleBlockedCompanies,
} = useCurrentRoleBlockedCompanies();

// 删除通用黑名单公司
const useDeleteCommonBlockedCompany = createGlobalState(() => {
  return useRequest(deleteCommonBlockedCompany, {
    manual: true,
    onError(err) {
      message.error(err.message);
    },
    onSuccess() {
      message.success('删除成功');
      refreshCommonBlockedCompanies();
    },
  });
});

export const {
  run: runDeleteCommonBlockedCompany,
  loading: deleteCommonBlockedCompanyLoading,
} = useDeleteCommonBlockedCompany();

// 删除当前角色的黑名单公司
const useDeleteCurrentRoleBlockedCompany = createGlobalState(() => {
  return useRequest(deleteCurrentRoleBlockedCompany, {
    manual: true,
    onError(err) {
      message.error(err.message);
    },
    onSuccess() {
      message.success('删除成功');
      refreshCurrentRoleBlockedCompanies();
    },
  });
});

export const {
  run: runDeleteCurrentRoleBlockedCompany,
  loading: deleteCurrentRoleBlockedCompanyLoading,
} = useDeleteCurrentRoleBlockedCompany();

// 添加通用黑名单公司
const useAddCommonBlockedCompany = createGlobalState(() => {
  return useRequest(addCommonBlockedCompany, {
    manual: true,
    onError(err) {
      message.error(err.message);
    },
    onSuccess() {
      message.success('添加成功');
      refreshCommonBlockedCompanies();
    },
  });
});

export const {
  run: runAddCommonBlockedCompany,
  loading: addCommonBlockedCompanyLoading,
} = useAddCommonBlockedCompany();

// 添加当前角色的黑名单公司
const useAddCurrentRoleBlockedCompany = createGlobalState(() => {
  return useRequest(addCurrentRoleBlockedCompany, {
    manual: true,
    onError(err) {
      message.error(err.message);
    },
    onSuccess() {
      message.success('添加成功');
      refreshCurrentRoleBlockedCompanies();
    },
  });
});

export const {
  run: runAddCurrentRoleBlockedCompany,
  loading: addCurrentRoleBlockedCompanyLoading,
} = useAddCurrentRoleBlockedCompany();

// 重置通用黑名单公司列表
const useResetCommonBlockedCompanies = createGlobalState(() => {
  return useRequest(resetCommonBlockedCompanies, {
    manual: true,
    onError(err) {
      message.error(err.message);
    },
    onSuccess() {
      message.success('重置成功');
      refreshCommonBlockedCompanies();
    },
  });
});

export const {
  run: runResetCommonBlockedCompanies,
  loading: resetCommonBlockedCompaniesLoading,
} = useResetCommonBlockedCompanies();
