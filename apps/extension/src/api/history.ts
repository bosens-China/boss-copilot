import { client } from '@/utils/request';
import type { components } from '@boss-copilot/codegen';

/*
 * 获取当前角色的浏览记录
 * @returns 当前角色的浏览记录
 */
export const getCurrentRoleHistory = async () => {
  const res = await client.GET('/history/current');
  return res.data;
};

export type HistoryItem = components['schemas']['HistoryCreate'];

/*
 * 添加浏览记录
 * @param history 浏览记录
 * @returns 添加结果
 */
export const addHistory = async (history: HistoryItem) => {
  const res = await client.POST('/history/', {
    body: history,
  });
  return res.data;
};

/*
 * 删除当前角色的浏览记录（清空当前角色所有记录）
 * @returns 删除结果
 */
export const deleteCurrentRoleHistory = async () => {
  const res = await client.DELETE('/history/current');
  return res.data;
};

/*
 * 删除某条浏览记录
 * @param id 浏览记录ID
 * @returns 删除结果
 */
export const deleteHistory = async (id: number) => {
  const res = await client.DELETE('/history/{id}', {
    params: {
      path: {
        id,
      },
    },
  });
  return res.data;
};
