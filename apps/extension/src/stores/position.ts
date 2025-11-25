import { useRequest } from 'vue-request';
import { getCurrentPosition, updateCurrentPosition } from '@/api/position';
import { createGlobalState } from '@vueuse/core';
import { defaultRole } from './role';
import { message } from '@/utils/discrete-api';

// 当前角色的岗位设置
const useCurrentPosition = createGlobalState(() => {
  return useRequest(getCurrentPosition, {
    onError(err) {
      message.error(err.message);
    },
    refreshDeps: [defaultRole],
  });
});

export const {
  data: currentPosition,
  loading: currentPositionLoading,
  refresh: refreshCurrentPosition,
} = useCurrentPosition();

// 更新当前角色的岗位设置
const useUpdateCurrentPosition = createGlobalState(() => {
  return useRequest(updateCurrentPosition, {
    manual: true,
    onError(err) {
      message.error(err.message);
    },
    onSuccess() {
      message.success('保存成功');
      refreshCurrentPosition();
    },
  });
});

export const {
  run: runUpdateCurrentPosition,
  loading: updateCurrentPositionLoading,
} = useUpdateCurrentPosition();
