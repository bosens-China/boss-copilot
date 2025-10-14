import { useLocalSync } from '@/hooks/useLocalSync';
import { getId } from '@/utils/id';

export interface RoleItem {
  id: string;
  name: string;
  isDefault: boolean;
}

export interface Role {
  roles: RoleItem[];
  currentRoleId: string;
}

export const roleStore = useLocalSync<Role>('roleStore', {
  roles: [
    {
      isDefault: true,
      name: '默认角色',
      id: 'default',
    },
  ],
  currentRoleId: 'default',
});

export const addRole = (name: string, isDefault = false) => {
  roleStore.value.roles.push({
    isDefault,
    name,
    id: getId(),
  });
};

export const updateRole = (id: string, values: Partial<RoleItem>) => {
  const role = roleStore.value.roles.find((role) => role.id === id);
  if (role) {
    Object.assign(role, values);
  }
};

export const deleteRole = (id: string) => {
  roleStore.value.roles = roleStore.value.roles.filter(
    (role) => role.id !== id,
  );
};
