/*
 * 岗位设置信息
 */

import { useLocalSync } from '@/hooks/useLocalSync';
import { roleStore } from './role';

export interface PositionItem {
  // 白名单
  white?: string;
  // 黑名单
  black?: string;
  // 最低薪水
  minSalary?: number;
  // 最高薪水
  maxSalary?: number;
  // 是否启用
  enabled?: boolean;
  // 城市
  city?: string;
  // 开启黑名单公司过滤
  blackCompanyEnabled?: boolean;
  // 开启浏览历史高亮
  historyHighlightEnabled?: boolean;
}

export const positionStore = useLocalSync<Record<string, PositionItem>>(
  'positionStore',
  {
    default: {},
  },
);

/*
 * 获取当前角色的岗位设置
 */
export const getCurrentPosition = () => {
  const values = (positionStore.value[roleStore.value.currentRoleId] ||= {});
  if (Object.keys(values).length === 0) {
    Object.assign(values, {
      enabled: true,
      blackCompanyEnabled: true,
      historyHighlightEnabled: true,
    });
  }
  return values;
};
