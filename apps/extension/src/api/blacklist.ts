import { client } from '@/utils/request';

/*
 * 获取通用黑名单列表
 * @returns 通用黑名单列表
 */
export const getCommonBlockedCompanies = async () => {
  const res = await client.GET('/blacklist/common');
  return res.data;
};

/*
 * 获取当前角色的黑名单列表
 * @returns 当前角色的黑名单列表
 */
export const getCurrentRoleBlockedCompanies = async () => {
  const res = await client.GET('/blacklist/current');
  return res.data;
};

/*
 * 删除通用的黑名单公司
 * @param id 公司ID
 * @returns 删除结果
 */
export const deleteCommonBlockedCompany = async (id: number) => {
  const res = await client.DELETE('/blacklist/common/{id}', {
    params: {
      path: {
        id,
      },
    },
  });
  return res.data;
};

/*
 * 删除当前角色的黑名单公司
 * @param id 公司ID
 * @returns 删除结果
 */
export const deleteCurrentRoleBlockedCompany = async (id: number) => {
  const res = await client.DELETE('/blacklist/common/{id}', {
    params: {
      path: {
        id,
      },
    },
  });
  return res.data;
};

/*
 * 添加当前角色的黑名单公司
 * @param name 公司名称
 * @returns 添加结果
 */
export const addCurrentRoleBlockedCompany = async (name: string[]) => {
  const res = await client.POST('/blacklist/current', {
    body: name.map((item) => ({ name: item })),
  });
  return res.data;
};

/*
 * 添加通用的黑名单公司
 * @param name 公司名称
 * @returns 添加结果
 */
export const addCommonBlockedCompany = async (name: string[]) => {
  const res = await client.POST('/blacklist/common', {
    body: name.map((item) => ({ name: item })),
  });
  return res.data;
};

/*
 * 重置通用黑名单公司列表
 * @returns 重置结果
 */
export const resetCommonBlockedCompanies = async () => {
  const res = await client.POST('/blacklist/common/reset');
  return res.data;
};
