<script setup lang="ts">
import { addRole, updateRole, type RoleItem } from '@/stores/role';
import type { FormInst } from 'naive-ui';

const show = defineModel<boolean>('show', {
  required: true,
});

const props = defineProps<{
  role?: RoleItem;
}>();

const title = computed(() => {
  return props.role ? '编辑角色' : '新增角色';
});

const formValue = reactive<Pick<RoleItem, 'name'>>({
  name: '',
});

watch(show, (value) => {
  if (!value) {
    return;
  }

  formValue.name = props.role?.name || '';
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

const message = useMessage();

const handleSave = async () => {
  await formRef.value?.validate();
  if (props.role?.id) {
    updateRole(props.role.id, formValue);
    message.success('更新成功');
    handleCancel();
    return;
  }
  addRole(formValue.name);
  message.success('新增成功');
  handleCancel();
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
          <n-button type="primary" @click="handleSave">保存</n-button>
        </n-space>
      </div>
    </template>
  </n-modal>
</template>
