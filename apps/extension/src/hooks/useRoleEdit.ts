import type { getRoles } from '@/api/role';
import { refreshRoles } from '@/stores/role';

export type RoleItem = NonNullable<
  Awaited<ReturnType<typeof getRoles>>
>[number];

/*
 * 封装的一个快捷方法，方便角色的弹窗复用
 */
export const useRoleEdit = () => {
  const showEditDialog = ref(false);
  const editRole = ref<RoleItem>();

  const openEditDialog = () => {
    showEditDialog.value = true;
    editRole.value = undefined;
  };

  return {
    showEditDialog,
    editRole,
    openEditDialog,
    refreshRoles,
  };
};
