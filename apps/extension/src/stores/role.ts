import { useRequest } from 'vue-request';
import { createGlobalState } from '@vueuse/core';
import {
  getRoles,
  getDefaultRole,
  setDefaultRole,
  deleteRole,
  createRole,
  updateRole,
} from '@/api/role';

import { message } from '@/utils/discrete-api';

// 获取默认角色
const useDefaultRole = createGlobalState(() => {
  return useRequest(getDefaultRole, {
    onError(err) {
      message.error(err.message);
    },
  });
});

export const {
  data: defaultRole,
  loading: loadingDefaultRole,
  refresh: refreshDefaultRole,
} = useDefaultRole();

// 获取角色列表
const useRoles = createGlobalState(() =>
  useRequest(getRoles, {
    onError(err) {
      message.error(err.message);
    },
    onSuccess() {
      // refreshDefaultRole();
    },
  }),
);

export const {
  data: roles,
  loading: loadingRoles,
  refresh: refreshRoles,
} = useRoles();

// 设置默认角色
const useSetDefaultRole = createGlobalState(() => {
  return useRequest(setDefaultRole, {
    manual: true,
    onError(err) {
      message.error(err.message);
    },
    onSuccess() {
      refreshDefaultRole();
      refreshRoles();
    },
  });
});

export const { run: runSetDefaultRole, loading: loadingSetDefaultRole } =
  useSetDefaultRole();

// 删除角色
const useDeleteRole = createGlobalState(() => {
  return useRequest(deleteRole, {
    manual: true,
    onError(err) {
      message.error(err.message);
    },
    onSuccess() {
      refreshRoles();
      refreshDefaultRole();
      message.success('删除成功');
    },
  });
});

export const { run: runDeleteRole, loading: loadingDeleteRole } =
  useDeleteRole();

const useCreateRole = createGlobalState(() => {
  return useRequest(createRole, {
    manual: true,
    onError(err) {
      message.error(err.message);
    },
    onSuccess() {
      refreshRoles();
      message.success('新增角色成功');
    },
  });
});

export const {
  run: runCreateRole,
  loading: loadingCreateRole,
  runAsync: runCreateRoleAsync,
} = useCreateRole();

// 更新角色
const useUpdateRole = createGlobalState(() => {
  return useRequest(updateRole, {
    manual: true,
    onError(err) {
      message.error(err.message);
    },
    onSuccess() {
      refreshRoles();
      refreshDefaultRole();
      message.success('更新成功');
    },
  });
});

export const {
  run: runUpdateRole,
  loading: loadingUpdateRole,
  runAsync: runUpdateRoleAsync,
} = useUpdateRole();
