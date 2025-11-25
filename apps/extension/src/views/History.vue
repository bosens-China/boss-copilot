<script setup lang="tsx">
import { pagination } from '@/constant/pagination';
import { NButton, NPopconfirm, NSpace, type DataTableColumns } from 'naive-ui';
import {
  currentRoleHistory,
  currentRoleHistoryLoading,
  runDeleteCurrentRoleHistory,
  deleteCurrentRoleHistoryLoading,
  runDeleteHistory,
  deleteHistoryLoading,
} from '@/stores/history';

const columns: DataTableColumns<
  NonNullable<typeof currentRoleHistory.value>[number]
> = [
  {
    key: 'jobName',
    title: '岗位名称',
    width: 200,
  },
  {
    key: 'companyName',
    title: '公司名称',
    width: 150,
  },
  {
    key: 'salaryRange',
    title: '薪水范围',
    width: 150,
  },
  {
    key: 'cityName',
    title: '城市名称',
    width: 100,
  },
  {
    key: 'url',
    title: '详情页面',
    width: 100,

    render(row) {
      return (
        <a href={row.url} target="_blank">
          点击跳转
        </a>
      );
    },
  },
  {
    key: 'time',
    title: '浏览时间',
    width: 150,
    fixed: 'right',
    render: (row) => {
      return new Date(row.time as number).toLocaleString();
    },
  },
  {
    key: 'actions',
    title: '操作',
    fixed: 'right',
    width: 100,
    render: (row) => {
      return (
        <NSpace>
          <NPopconfirm
            onPositiveClick={() => {
              runDeleteHistory(row.id as number);
            }}
          >
            {{
              trigger: () => (
                <NButton
                  size="small"
                  type="error"
                  loading={deleteHistoryLoading.value}
                >
                  删除
                </NButton>
              ),
              default: () => '确认删除吗？',
            }}
          </NPopconfirm>
        </NSpace>
      );
    },
  },
];

const scrollX = Math.max(
  900,
  columns.reduce((total, column) => {
    const width = column.width;

    if (typeof width === 'number') {
      return total + width;
    }

    if (typeof width === 'string') {
      const parsed = Number.parseFloat(width);

      if (!Number.isNaN(parsed)) {
        return total + parsed;
      }
    }

    return total;
  }, 0) + 120,
);

const onClearHistory = () => {
  runDeleteCurrentRoleHistory();
};
</script>

<template>
  <div class="w-full min-w-0 overflow-x-hidden">
    <n-alert title="提示" type="info">
      所有的浏览记录会被储存起来，后续如果遇到相似的岗位会进行颜色的区分
    </n-alert>

    <div class="flex my-4">
      <div class="flex-1"></div>

      <n-space>
        <n-popconfirm @positive-click="onClearHistory">
          <template #trigger>
            <n-button type="warning" :loading="deleteCurrentRoleHistoryLoading"
              >清空浏览历史</n-button
            >
          </template>
          确定清空所有的浏览历史吗？
        </n-popconfirm>
      </n-space>
    </div>

    <n-data-table
      class="w-full"
      :columns="columns"
      :loading="currentRoleHistoryLoading"
      :data="currentRoleHistory"
      :pagination="pagination"
      :bordered="false"
      :row-key="(item) => item.id"
      :max-height="`calc(100vh - 350px)`"
      :scroll-x="scrollX"
    />
  </div>
</template>
