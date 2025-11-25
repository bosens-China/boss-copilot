<script setup lang="tsx">
import { ref } from 'vue';
import Blacklist from './Blacklist/Blacklist.vue';
import Filtered from './Filtered.vue';
import Jobs from './Jobs.vue';
import Roles from './Roles/Roles.vue';
import History from './History.vue';
import { activeTab } from '@/stores/other';
import { NSpace } from 'naive-ui';
import Copilot from '@/components/Copilot.vue';
import { ArrowDownSharp, LogoGithub } from '@vicons/ionicons5';
import { usePostMark } from '@/hooks/usePostMark';
import RoleTitle from './Roles/Title.vue';
import { useMonitorClicks } from '@/hooks/useMonitorClicks';
import { useFilterPosition } from '@/hooks/useFilterPosition';
import { useScrollElement } from '@/hooks/useScrollElement';

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
    name: 'History',
    tab: '浏览历史',
    component: History,
  },
];

const title = (
  <NSpace align="center">
    <span>boss-copilot</span>
    <RoleTitle />
  </NSpace>
);

useMonitorClicks();
useFilterPosition();
usePostMark();

const { startScrolling, isAllowed, isEnd } = useScrollElement();

const loadAllJobs = () => {
  startScrolling();
};

const openGithub = () => {
  window.open('https://github.com/bosens-China/boss-copilot', '_blank');
};
</script>

<template>
  <n-float-button
    :right="34"
    :bottom="200"
    shape="square"
    @click="doShowOuter"
    class="z-10"
    title="boss-copilot 助手，点击开启配置"
    menu-trigger="hover"
  >
    <n-icon>
      <Copilot />
    </n-icon>

    <template #menu>
      <n-float-button
        title="一键加载所有岗位"
        @click="loadAllJobs"
        :disabled="!isAllowed || isEnd"
      >
        <n-icon>
          <ArrowDownSharp />
        </n-icon>
      </n-float-button>
      <n-float-button title="访问 Github" @click="openGithub">
        <n-icon>
          <LogoGithub />
        </n-icon>
      </n-float-button>
    </template>
  </n-float-button>

  <n-drawer v-model:show="showOuter" :width="800" :auto-focus="false">
    <n-drawer-content :title="(title as any)" closable>
      <n-tabs
        class="copilot-tabs"
        type="line"
        animated
        placement="left"
        v-model:value="activeTab"
      >
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

<style scoped>
.copilot-tabs {
  width: 100%;
  max-width: 100%;
}

.copilot-tabs :deep(.n-tabs-content) {
  min-width: 0;
  overflow-x: hidden;
}

.copilot-tabs :deep(.n-tab-pane) {
  min-width: 0;
}
</style>
