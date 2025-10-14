<script setup lang="tsx">
import {
  blacklistStore,
  deleteBlacklist,
  type GeneralItem,
} from '@/stores/blacklist';
import { getId } from '@/utils/id';
import { NButton, NPopconfirm, type DataTableColumns } from 'naive-ui';
import blacklist from '@/constant/blacklist';

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
            deleteBlacklist(row.id, 'general');
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
  return blacklistStore.value.general || [];
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
    if (!blacklistStore.value.general.some((f) => f.name == item)) {
      blacklistStore.value.general.push({
        id: getId(),
        name: item,
      });
    }
  });

  message.success('添加成功');
};

const onReset = () => {
  blacklistStore.value.general = blacklist;
  message.success('恢复初始化成功');
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

      <n-popconfirm @positive-click="onReset">
        <template #trigger>
          <n-button type="warning">恢复初始化</n-button>
        </template>
        确认恢复初始化吗？
      </n-popconfirm>
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
