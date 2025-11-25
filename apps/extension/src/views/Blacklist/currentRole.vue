<script setup lang="tsx">
import { NButton, NPopconfirm, type DataTableColumns } from 'naive-ui';
import {
  deleteCurrentRoleBlockedCompanyLoading,
  runDeleteCurrentRoleBlockedCompany,
  currentRoleBlockedCompanies,
  currentRoleBlockedCompaniesLoading,
  runAddCurrentRoleBlockedCompany,
  addCurrentRoleBlockedCompanyLoading,
} from '@/stores/blacklist';
import { pagination } from '@/constant/pagination';

type CurrentRoleBlockedCompany = NonNullable<
  typeof currentRoleBlockedCompanies.value
>[number];

const columns: DataTableColumns<CurrentRoleBlockedCompany> = [
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
            runDeleteCurrentRoleBlockedCompany(row.id as number);
          }}
        >
          {{
            trigger: () => (
              <NButton
                size="small"
                type="error"
                loading={deleteCurrentRoleBlockedCompanyLoading.value}
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
  runAddCurrentRoleBlockedCompany(arr);
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
      <n-button
        type="primary"
        @click="onAdd"
        :loading="addCurrentRoleBlockedCompanyLoading"
        >添加到黑名单</n-button
      >
    </n-space>
  </div>

  <n-data-table
    :columns="columns"
    :data="currentRoleBlockedCompanies"
    :loading="currentRoleBlockedCompaniesLoading"
    :pagination="pagination"
    :bordered="false"
    max-height="calc(100vh - 400px)"
  />
</template>
