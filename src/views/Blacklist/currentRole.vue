<script setup lang="tsx">
import {
  deleteBlacklist,
  getCurrentRoleBlacklist,
  type GeneralItem,
} from '@/stores/blacklist';
import { roleStore } from '@/stores/role';
import { getId } from '@/utils/id';
import { NButton, NPopconfirm, type DataTableColumns } from 'naive-ui';

const columns: DataTableColumns<GeneralItem> = [
  {
    key: 'name',
    title: '名称',
  },

  {
    key: 'action',
    title: '操作',
    render(row) {
      return (
        <NPopconfirm
          onPositiveClick={() => {
            deleteBlacklist(row.id, 'role');
            message.success('删除成功');
          }}
        >
          {{
            trigger: () => (
              <NButton size="small" type="error">
                删除
              </NButton>
            ),
            default: () => '确认删除吗？',
          }}
        </NPopconfirm>
      );
    },
  },
];
const data = computed(() => {
  return getCurrentRoleBlacklist();
});

const inputValue = ref('');

const message = useMessage();
const onAdd = () => {
  const arr = inputValue.value
    .trim()
    .split(',')
    .filter((f) => f.trim());
  if (!arr.length) {
    return;
  }
  arr.forEach((item) => {
    if (!data.value.some((f) => f.name == item)) {
      data.value.unshift({
        id: getId(),
        name: item,
        roleId: roleStore.value.currentRoleId,
      });
    }
  });

  message.success('添加成功');
};
</script>

<template>
  <div class="my-2">
    <n-input
      type="textarea"
      class="mb-2"
      placeholder="输入黑名单，以逗号分隔"
      v-model:value="inputValue"
    ></n-input>

    <n-space>
      <n-button type="primary" @click="onAdd">添加到黑名单</n-button>
    </n-space>
  </div>

  <n-data-table
    :columns="columns"
    :data="data"
    :pagination="{
      pageSize: 50,
    }"
    :bordered="false"
    max-height="calc(100vh - 400px)"
  />
</template>
