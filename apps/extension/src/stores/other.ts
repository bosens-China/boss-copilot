import { useLocalSync } from '@/hooks/useLocalSync';

/*
 * 激活tab的项
 */
export const activeTab = useLocalSync<string>('activeTab', 'Roles');
