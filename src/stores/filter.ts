import { roleStore } from '@/stores/role';

/*
 * 过滤的结果，被各种条件刷下来的岗位会存放到此处
 */

export interface FilterItem {
  encryptId: string;
  // 岗位名称
  jobName: string;
  // 跳转url
  url: string;
  // 公司名称
  companyName: string;
  // 薪水范围
  salaryRange: string;
  // 城市名称
  cityName: string;
}

export type FilterType =
  | 'blackList'
  | 'whiteList'
  | 'salaryRange'
  | 'blackCompany'
  | 'city';

export const filterStore = ref<
  Record<string, Record<FilterType, FilterItem[]>>
>({});

/*
 * 添加过滤
 */
export const addFilter = (type: FilterType, filter: FilterItem) => {
  const currentRoleId = roleStore.value.currentRoleId;
  filterStore.value[currentRoleId] ||= {
    blackList: [],
    whiteList: [],
    salaryRange: [],
    blackCompany: [],
    city: [],
  };
  filterStore.value[currentRoleId][type].push(filter);
};

/*
 * 获取当前角色的所有过滤结果
 */
export const getCurrentRoleFilters = () => {
  const currentRoleId = roleStore.value.currentRoleId;
  return filterStore.value[currentRoleId];
};
