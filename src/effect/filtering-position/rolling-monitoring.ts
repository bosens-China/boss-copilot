/*
 * 监听滚动事件
 */

import { rollingStore } from '@/stores/rolling';
import { defineNode } from './type';

export default defineNode(() => {
  if (rollingStore.isEnd) {
    return;
  }
  rollingStore.count++;
});
