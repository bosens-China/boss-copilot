import type { FilterItem, FilterType } from '@/stores/filter';

export interface Config {
  slices: Array<FilterItem>;
  filterList: Array<{
    type: FilterType;
    encryptId: string;
  }>;
}

export const defineNode = (fn: (config: Config) => void | Promise<void>) => {
  return fn;
};
