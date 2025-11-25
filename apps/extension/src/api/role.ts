import { client } from '@/utils/request';
import type { components } from '@boss-copilot/codegen';

/*
 * 获取角色列表
 * @returns 角色列表
 */
export const getRoles = async () => {
  const res = await client.GET('/role/');
  return res.data;
};

/*
 * 创建角色
 * @param role 角色
 * @returns 创建结果
 */
export const createRole = async (role: components['schemas']['Role']) => {
  const res = await client.POST('/role/', {
    body: role,
  });
  return res.data;
};

/*
 * 更新角色
 * @param roleId 角色ID
 * @param role 角色
 * @returns 更新结果
 */
export const updateRole = async (
  roleId: number,
  role: components['schemas']['Role'],
) => {
  const res = await client.PUT(`/role/{role_id}`, {
    body: role,
    params: {
      path: {
        role_id: roleId,
      },
    },
  });
  return res.data;
};

/*
 * 删除角色
 * @param roleId 角色ID
 * @returns 删除结果
 */
export const deleteRole = async (roleId: number) => {
  const res = await client.DELETE(`/role/{role_id}`, {
    params: {
      path: {
        role_id: roleId,
      },
    },
  });
  return res.data;
};

/*
 * 设置默认角色
 * @param roleId 角色ID
 * @returns 设置默认结果
 */
export const setDefaultRole = async (roleId: number) => {
  const res = await client.PUT(`/role/{role_id}/default`, {
    params: {
      path: {
        role_id: roleId,
      },
    },
  });
  return res.data;
};

/* 

 * 获取默认角色
 * @returns 默认角色
 */
export const getDefaultRole = async () => {
  const res = await client.GET('/role/current');
  return res.data;
};
