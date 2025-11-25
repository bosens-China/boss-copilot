<script setup lang="ts">
import {
  roles,
  loadingRoles,
  runSetDefaultRole,
  loadingSetDefaultRole,
  defaultRole,
} from '@/stores/role';
import RoleEditDialog from './RoleEditDialog.vue';
import { useRoleEdit } from '@/hooks/useRoleEdit';

const options = computed(() => {
  return roles.value?.map((role) => ({
    label: role.name,
    value: role.id as number,
  }));
});

const { showEditDialog, editRole, openEditDialog, refreshRoles } =
  useRoleEdit();
</script>

<template>
  <n-select
    :loading="loadingRoles || loadingSetDefaultRole"
    :value="defaultRole?.id"
    @update:value="
      (id: number) => {
        runSetDefaultRole(id);
      }
    "
    class="w-150px"
    :options="options"
  >
    <template #action>
      <div class="flex justify-center">
        <n-button size="small" type="primary" @click="openEditDialog">
          新增角色
        </n-button>
      </div>
    </template>
  </n-select>

  <RoleEditDialog
    :refresh="refreshRoles"
    v-model:show="showEditDialog"
    :role="editRole"
  />
</template>
