import { client } from '@/utils/request';
import type { components } from '@boss-copilot/codegen';

export type PositionUpdate = components['schemas']['PositionUpdate'];

/*
 * 获取当前角色的岗位设置
 * @returns 岗位设置
 */
export const getCurrentPosition = async () => {
  const res = await client.GET('/position/');
  return res.data;
};

/*
 * 更新当前角色的岗位设置
 * @param position 岗位设置
 * @returns 岗位设置
 */
export const updateCurrentPosition = async (position: PositionUpdate) => {
  const res = await client.PUT('/position/', {
    body: position,
  });
  return res.data;
};
