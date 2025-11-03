<script setup lang="tsx">
import { ref } from 'vue';
import Blacklist from './Blacklist/Blacklist.vue';
import Filtered from './Filtered.vue';
import Jobs from './Jobs.vue';
import Roles from './Roles/Roles.vue';
import { activeTab } from '@/stores/other';
import { NSelect, NSpace } from 'naive-ui';
import { roleStore } from '@/stores/role';
import { filterStore, getCurrentRoleFilters } from '@/stores/filter';
import { hiddenPositions } from '@/effect/hidden-positions';
import About from './About/About.vue';
import Copilot from '@/components/Copilot.vue';

const showOuter = ref(false);

function doShowOuter() {
  showOuter.value = true;
}

const tabs = [
  {
    name: 'Roles',
    tab: '角色管理',
    component: Roles,
  },
  {
    name: 'Jobs',
    tab: '岗位管理',
    component: Jobs,
  },
  {
    name: 'Blacklist',
    tab: '黑名单管理',
    component: Blacklist,
  },
  {
    name: 'Filtered',
    tab: '过滤结果',
    component: Filtered,
  },
  {
    name: 'About',
    tab: '关于',
    component: About,
  },
];

const options = computed(() => {
  return roleStore.value.roles.map((role) => ({
    label: role.name,
    value: role.id,
  }));
});

const title = (
  <NSpace align="center">
    <span>boss-copilot</span>
    <NSelect
      v-model={[roleStore.value.currentRoleId, 'value']}
      class="w-150px"
      options={options.value}
    ></NSelect>
  </NSpace>
);

const message = useMessage();

/*
 * 监听过滤结果的变化，如果变化了，则隐藏对应的岗位
 */
watch(
  () => filterStore.value,
  () => {
    const filters = getCurrentRoleFilters();

    const encryptIds = Object.values(filters || {})
      .flat(2)
      .map((item) => item.encryptId);

    const count = hiddenPositions(encryptIds);

    if (count) {
      message.success(`隐藏了${count}个岗位`);
    } else {
      message.info(`没有发现需要隐藏的岗位`);
    }
  },
  { deep: true, flush: 'post' },
);
</script>

<template>
  <n-float-button
    :right="34"
    :bottom="200"
    shape="square"
    @click="doShowOuter"
    class="z-10"
    title="boss-copilot 助手，点击开启配置"
  >
    <n-icon>
      <Copilot />
    </n-icon>
  </n-float-button>

  <n-drawer v-model:show="showOuter" :width="800" :auto-focus="false">
    <n-drawer-content :title="(title as any)" closable>
      <n-tabs type="line" animated placement="left" v-model:value="activeTab">
        <n-tab-pane
          v-for="tab in tabs"
          :key="tab.name"
          :name="tab.name"
          :tab="tab.tab"
        >
          <component :is="tab.component" />
        </n-tab-pane>
      </n-tabs>
    </n-drawer-content>
  </n-drawer>
</template>
