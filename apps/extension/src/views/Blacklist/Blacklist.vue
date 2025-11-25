<script setup lang="tsx">
import CurrentRole from './currentRole.vue';
import General from './general.vue';

const tabs = [
  {
    tab: '通用',
    name: 'general',
    component: General,
  },
  {
    tab: '当前角色',
    name: 'currentRole',
    component: CurrentRole,
  },
];
</script>

<template>
  <n-tabs type="line" animated>
    <n-tab-pane
      v-for="tab in tabs"
      :key="tab.name"
      :name="tab.name"
      :tab="tab.tab"
    >
      <component :is="tab.component" />
    </n-tab-pane>
  </n-tabs>
</template>
