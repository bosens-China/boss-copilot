<script setup lang="tsx">
import { ref } from 'vue';
import Blacklist from './Blacklist/Blacklist.vue';
import Filtered from './Filtered.vue';
import Jobs from './Jobs.vue';
import Roles from './Roles/Roles.vue';
import History from './History.vue';
import { activeTab } from '@/stores/other';
import { NSelect, NSpace } from 'naive-ui';
import { roleStore } from '@/stores/role';
import { filterStore, getCurrentRoleFilters } from '@/stores/filter';
import { hiddenPositions } from '@/effect/hidden-positions';
import About from './About/About.vue';
import Copilot from '@/components/Copilot.vue';
import { ArrowDownSharp } from '@vicons/ionicons5';
import { rollingStore } from '@/stores/rolling';
import { usePostMark } from '@/hooks/usePostMark';

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

usePostMark();

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

let timer: number | null = null;

// 每次变化的时候，滚动到页面底部
watch(
  () => rollingStore.count,
  () => {
    if (timer) {
      clearTimeout(timer);
    }

    /*
     * 滚动需要添加一个异常的判断，假设求职页面根本不存在滚动条，那么我们需要显示给一个dom元素设计很大的高度，然后让其触发滚动事件
     */
    const dom = document.body.querySelector(
      '.job-list-container',
    ) as HTMLDivElement;
    const hasVerticalScrollbar =
      document.documentElement.scrollHeight > window.innerHeight;

    if (!hasVerticalScrollbar) {
      dom.style.height = window.innerHeight + `1000px`;
    } else {
      dom.style.height = 'auto';
    }
    window.scrollTo(0, Math.floor(document.body.scrollHeight / 2));
    nextTick(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    // 如果超过5s，则认为已加载完成
    timer = setTimeout(() => {
      rollingStore.isEnd = true;
    }, 5000);
  },
  {
    flush: 'post',
  },
);

watch(
  () => rollingStore,
  () => {
    if (rollingStore.count === 1 || !rollingStore.isEnd) {
      return;
    }
    const dom = document.body.querySelector(
      '.job-list-container',
    ) as HTMLDivElement;
    dom.style.height = 'auto';
    message.info('已加载完成');
  },
  {
    flush: 'post',
    deep: true,
  },
);

/*
 * 模拟滚动，触发分页变化
 * 分页变化后会触发接口的响应，只有接口变化后，我们才继续滚动
 */
const loadAllJobs = () => {
  rollingStore.count = 1;
  rollingStore.isEnd = false;
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
      <n-float-button title="一键加载所有岗位" @click="loadAllJobs">
        <n-icon>
          <ArrowDownSharp />
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
