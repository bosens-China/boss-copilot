<script setup lang="ts">
import type { FormInst } from 'naive-ui';
import type { RoleItem } from '@/hooks/useRoleEdit';
import {
  loadingCreateRole,
  loadingUpdateRole,
  runCreateRoleAsync,
  runUpdateRoleAsync,
} from '@/stores/role';

const show = defineModel<boolean>('show', {
  required: true,
});

const props = defineProps<{
  role?: RoleItem;
  // 刷新方法
  refresh: () => void;
}>();

const title = computed(() => {
  return props.role?.id ? '编辑角色' : '新增角色';
});

const formValue = reactive<Pick<RoleItem, 'name' | 'is_default'>>({
  name: '',
  is_default: false,
});

watch(show, (value) => {
  if (!value) {
    return;
  }

  formValue.name = props.role?.name || '';
  formValue.is_default = props.role?.is_default || false;
});

const rules = {
  name: {
    required: true,
    message: '请输入角色名称',
    trigger: ['input', 'blur'],
  },
};

const handleCancel = () => {
  show.value = false;
};

const formRef = ref<FormInst | null>(null);

const handleSave = async () => {
  await formRef.value?.validate();
  if (props.role?.id) {
    await runUpdateRoleAsync(props.role.id, formValue);
    show.value = false;
    return;
  }
  await runCreateRoleAsync(formValue);
  show.value = false;
};
</script>

<template>
  <n-modal
    v-model:show="show"
    class="custom-card"
    preset="card"
    :style="{
      width: '600px',
    }"
    :title="title"
  >
    <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules">
      <n-form-item label="角色名称" path="name">
        <n-input v-model:value="formValue.name" />
      </n-form-item>
    </n-form>
    <template #footer>
      <div class="flex">
        <div class="flex-1"></div>
        <n-space>
          <n-button @click="handleCancel">关闭</n-button>
          <n-button
            type="primary"
            :loading="loadingCreateRole || loadingUpdateRole"
            @click="handleSave"
            >保存</n-button
          >
        </n-space>
      </div>
    </template>
  </n-modal>
</template>
