<script setup lang="ts">
import type { FormInst } from 'naive-ui';
import {
  currentPosition,
  currentPositionLoading,
  runUpdateCurrentPosition,
  updateCurrentPositionLoading,
} from '@/stores/position';
import type { PositionUpdate } from '@/api/position';

const rules = {};
const formRef = ref<FormInst | null>(null);

const createDefaultPosition = (): Required<PositionUpdate> => {
  return {
    enabled: false,
    white: '',
    black: '',
    min_salary: null,
    max_salary: null,
    city: '',
    black_company_enabled: false,
    history_highlight_enabled: false,
  };
};

const formValue = reactive<Required<PositionUpdate>>(createDefaultPosition());

watchEffect(() => {
  if (!currentPositionLoading.value) {
    Object.assign(
      formValue,
      currentPosition.value ? currentPosition.value : createDefaultPosition(),
    );
  }
});

const onSubmit = () => {
  runUpdateCurrentPosition(formValue);
};
</script>

<template>
  <n-spin :show="currentPositionLoading">
    <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules">
      <n-form-item label="启用过滤  ">
        <n-switch v-model:value="formValue.enabled" />
      </n-form-item>

      <n-form-item label="白名单">
        <n-input
          type="textarea"
          v-model:value="formValue.white"
          placeholder="输入白名单，以逗号分隔"
        />
      </n-form-item>
      <n-form-item label="黑名单">
        <n-input
          type="textarea"
          v-model:value="formValue.black"
          placeholder="输入黑名单，以逗号分隔"
        />
      </n-form-item>
      <n-form-item label="薪水范围（元/月）">
        <n-space>
          <n-input-number
            v-model:value="formValue.min_salary"
            placeholder="最低薪水"
          />
          <n-input-number
            v-model:value="formValue.max_salary"
            placeholder="最高薪水"
          />
        </n-space>
      </n-form-item>
      <n-form-item label="城市">
        <n-space>
          <n-input v-model:value="formValue.city" placeholder="求职城市" />
        </n-space>
      </n-form-item>
      <n-form-item label="黑名单公司过滤">
        <n-switch v-model:value="formValue.black_company_enabled" />
      </n-form-item>
      <n-form-item label="浏览历史高亮">
        <n-switch v-model:value="formValue.history_highlight_enabled" />
      </n-form-item>

      <n-form-item>
        <n-button
          type="primary"
          :loading="updateCurrentPositionLoading"
          @click="onSubmit"
          >保存</n-button
        >
      </n-form-item>
    </n-form>
  </n-spin>
</template>
