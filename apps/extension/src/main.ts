import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import 'virtual:uno.css';
import '@/core/hijack-request';
import { broadcast } from '@/core/broadcast';
import { type Root } from '@/api/list';
import { allHistory } from '@/stores/history';
import type { FilterItem } from './stores/filter';

const fn = (_url: string, data: Root) => {
  data.zpData.jobList.forEach((job) => {
    const { brandName, jobName, salaryDesc, cityName } = job;
    const filterItem: FilterItem = {
      encryptId: job.encryptJobId,
      jobName,
      url: `https://www.zhipin.com/job_detail/${job.encryptJobId}.html`,
      companyName: brandName,
      salaryRange: salaryDesc,
      cityName,
    };
    allHistory.value.push(filterItem);
  });
};
/*
 * 初始化之前需要监听网络的请求，将数据储存起来用于后续的处理
 */
broadcast.subscribe('/wapi/zpgeek/search/joblist.json', fn);
broadcast.subscribe('/wapi/zpgeek/pc/recommend/job/list.json', fn);

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
