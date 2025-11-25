<script setup lang="tsx">
import { NButton, NPopconfirm, type DataTableColumns } from 'naive-ui';
import { pagination } from '@/constant/pagination';
import {
  commonBlockedCompanies,
  commonBlockedCompaniesLoading,
  runDeleteCommonBlockedCompany,
  deleteCommonBlockedCompanyLoading,
  runAddCommonBlockedCompany,
  runResetCommonBlockedCompanies,
  resetCommonBlockedCompaniesLoading,
} from '@/stores/blacklist';

type GeneralItem = NonNullable<typeof commonBlockedCompanies.value>[number];

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
            runDeleteCommonBlockedCompany(row?.id as number);
          }}
        >
          {{
            trigger: () => (
              <NButton
                size="small"
                type="error"
                loading={deleteCommonBlockedCompanyLoading.value}
              >
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

const inputValue = ref('');

const onAdd = () => {
  const arr = inputValue.value
    .trim()
    .split(',')
    .filter((f) => f.trim());
  if (!arr.length) {
    return;
  }
  runAddCommonBlockedCompany(arr);
};

const onReset = () => {
  runResetCommonBlockedCompanies();
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
          <n-button type="warning" :loading="resetCommonBlockedCompaniesLoading"
            >恢复初始化</n-button
          >
        </template>
        确认恢复初始化吗？
      </n-popconfirm>
    </n-space>
  </div>

  <n-data-table
    :columns="columns"
    :data="commonBlockedCompanies"
    :loading="commonBlockedCompaniesLoading"
    :pagination="pagination"
    :bordered="false"
    max-height="calc(100vh - 400px)"
  />
</template>
