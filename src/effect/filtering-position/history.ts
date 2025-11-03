import { historyStore } from '@/stores/history';
import { defineNode } from './type';

/*
 * 这里直接把所有的岗位都添加到历史记录中
 */
export default defineNode(({ global }) => {
  historyStore.value.push(global.filterItem);
});
