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

createApp(App).mount(
  (() => {
    const app = document.createElement('div');
    document.body.append(app);
    return app;
  })(),
);
