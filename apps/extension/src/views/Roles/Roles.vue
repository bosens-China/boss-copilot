<script setup lang="tsx">
import { NButton, NPopconfirm, NSpace, type DataTableColumns } from 'naive-ui';
import RoleEditDialog from './RoleEditDialog.vue';
import { pagination } from '@/constant/pagination';
import {
  roles,
  loadingRoles,
  loadingSetDefaultRole,
  runSetDefaultRole,
  loadingDeleteRole,
  runDeleteRole,
} from '@/stores/role';
import { useRoleEdit, type RoleItem } from '@/hooks/useRoleEdit';

const columns = computed<DataTableColumns<RoleItem>>(() => {
  return [
    {
      key: 'name',
      title: '角色名称',
    },
    {
      key: 'is_default',
      title: '是否默认',
      render(row) {
        return row.is_default ? '是' : '否';
      },
    },
    {
      key: 'actions',
      title: '操作',
      render(row) {
        const handlePositiveClick = () => {
          runDeleteRole(row.id as number);
        };
        return (
          <NSpace>
            <NButton
              size="small"
              onClick={() => {
                editRole.value = row;
                showEditDialog.value = true;
              }}
            >
              编辑
            </NButton>
            {(roles.value?.length ?? 0) > 1 && (
              <NPopconfirm onPositiveClick={handlePositiveClick}>
                {{
                  trigger: () => (
                    <NButton
                      type="error"
                      size="small"
                      loading={loadingDeleteRole.value}
                    >
                      删除
                    </NButton>
                  ),
                  default: () => (
                    <span>确认删除吗？删除后当前角色的信息将不存在。</span>
                  ),
                }}
              </NPopconfirm>
            )}

            {(roles.value?.length ?? 0) > 1 && !row.is_default && (
              <NButton
                type="info"
                size="small"
                loading={loadingSetDefaultRole.value}
                onClick={() => {
                  runSetDefaultRole(row.id as number);
                }}
              >
                设为默认
              </NButton>
            )}
          </NSpace>
        );
      },
    },
  ];
});

const { showEditDialog, editRole, openEditDialog, refreshRoles } =
  useRoleEdit();
</script>

<template>
  <n-button class="mb-2" type="primary" @click="openEditDialog"
    >新增角色</n-button
  >
  <n-data-table
    :columns="columns"
    :data="roles"
    :loading="loadingRoles"
    :pagination="pagination"
    :bordered="false"
    :row-key="(row) => row.id"
  />
  <RoleEditDialog
    :refresh="refreshRoles"
    v-model:show="showEditDialog"
    :role="editRole"
  />
</template>
