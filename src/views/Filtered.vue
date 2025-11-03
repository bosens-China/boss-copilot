<script setup lang="tsx">
import { pagination } from '@/constant/pagination';
import { getCurrentRoleFilters, type FilterItem } from '@/stores/filter';
import type { DataTableColumns } from 'naive-ui';
const tabs = computed(() => {
  const filters = getCurrentRoleFilters();

  const allData = Object.values(filters || {}).flat(2);

  return [
    {
      name: 'all',
      tab: '全部',
      data: allData,
    },
    {
      name: 'whiteList',
      tab: '关键词不符',
      data: filters?.whiteList || [],
    },
    {
      name: 'blackList',
      tab: '黑名单',
      data: filters?.blackList || [],
    },
    {
      name: 'salaryRange',
      tab: '薪水范围',
      data: filters?.salaryRange || [],
    },
    {
      name: 'blackCompany',
      tab: '黑名单公司',
      data: filters?.blackCompany || [],
    },
    {
      name: 'city',
      tab: '城市不符',
      data: filters?.city || [],
    },
  ];
});
const activeTab = ref('all');

// 要根据不同的类型，来展示不同的列
const columns = computed<DataTableColumns<FilterItem>>(() => {
  const base: DataTableColumns<FilterItem> = [
    {
      key: 'jobName',
      title: '岗位名称',
    },
    {
      key: 'companyName',
      title: '公司名称',
    },
    {
      key: 'salaryRange',
      title: '薪水范围',
    },
    {
      key: 'cityName',
      title: '城市名称',
    },
    {
      key: 'url',
      title: '详情页面',
      render: (row) => (
        <a href={row.url} target="_blank">
          点击跳转
        </a>
      ),
    },
  ];
  switch (activeTab.value) {
    case 'whiteList':
    case 'blackList':
    case 'blackCompany':
      base.splice(2, 2);
      break;
    case 'salaryRange':
      base.splice(3, 1);
      break;
    case 'city':
      base.splice(2, 1);
      break;
    default:
      break;
  }

  return base;
});
</script>

<template>
  <n-tabs type="line" animated placement="left" v-model:value="activeTab">
    <n-tab-pane
      v-for="tab in tabs"
      :key="tab.name"
      :name="tab.name"
      :tab="tab.tab"
    >
      <n-data-table
        :columns="columns"
        :data="tab.data"
        :pagination="pagination"
        :bordered="false"
        :row-key="(item) => item.encryptId"
        :max-height="`calc(100vh - 200px)`"
      />
    </n-tab-pane>
  </n-tabs>
</template>
