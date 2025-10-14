<script setup lang="tsx">
import { deleteRole, roleStore, type RoleItem } from '@/stores/role';
import { NButton, NPopconfirm, NSpace, type DataTableColumns } from 'naive-ui';
import RoleEditDialog from './RoleEditDialog.vue';

const message = useMessage();

const columns = computed<DataTableColumns<RoleItem>>(() => {
  return [
    {
      key: 'name',
      title: '角色名称',
    },
    {
      key: 'isDefault',
      title: '是否默认',
      render(row) {
        return row.isDefault ? '是' : '否';
      },
    },
    {
      key: 'actions',
      title: '操作',
      render(row) {
        const handlePositiveClick = () => {
          // 首先判断当前是不是激活角色
          if (row.id === roleStore.value.currentRoleId) {
            roleStore.value.currentRoleId = roleStore.value.roles[0]!.id;
          }
          deleteRole(row.id);
          message.success('删除成功');
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
            {roleStore.value.roles.length > 1 && (
              <NPopconfirm onPositiveClick={handlePositiveClick}>
                {{
                  trigger: () => (
                    <NButton type="error" size="small">
                      删除
                    </NButton>
                  ),
                  default: () => (
                    <span>确认删除吗？删除后当前角色的信息将不存在。</span>
                  ),
                }}
              </NPopconfirm>
            )}

            {roleStore.value.roles.length > 1 &&
              row.id !== roleStore.value.currentRoleId && (
                <NButton
                  type="info"
                  size="small"
                  onClick={() => {
                    roleStore.value.currentRoleId = row.id;
                    message.success('设为默认成功');
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

const data = computed(() => {
  return roleStore.value.roles || [];
});

const showEditDialog = ref(false);
const editRole = ref<RoleItem>();

const openEditDialog = () => {
  showEditDialog.value = true;
  editRole.value = undefined;
};
</script>

<template>
  <n-button class="mb-2" type="primary" @click="openEditDialog"
    >新增角色</n-button
  >
  <n-data-table
    :columns="columns"
    :data="data"
    :pagination="{}"
    :bordered="false"
    :row-key="(row) => row.id"
  />
  <RoleEditDialog v-model:show="showEditDialog" :role="editRole" />
</template>
