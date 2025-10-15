import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import 'virtual:uno.css';
import '@/core/hijack-request';
import { broadcast } from '@/core/broadcast';
import { type Root } from '@/api/list';
import { filteringPosition } from './effect/filtering-position/actuator';

broadcast.subscribe<Root>('/wapi/zpgeek/search/joblist.json', (data) => {
  filteringPosition(data);
});
broadcast.subscribe<Root>('/wapi/zpgeek/pc/recommend/job/list.json', (data) => {
  filteringPosition(data);
});

// 等待 DOM 准备好再挂载 Vue 应用
const mountApp = () => {
  const app = document.createElement('div');
  document.body.append(app);
  createApp(App).mount(app);
};

// 如果 body 已经存在，直接挂载；否则等待 DOMContentLoaded
if (document.body) {
  mountApp();
} else {
  document.addEventListener('DOMContentLoaded', mountApp);
}
