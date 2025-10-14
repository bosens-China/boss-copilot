import type { JobList } from '@/api/list';
import type { FilterItem } from '@/stores/filter';
import type { PositionItem } from '@/stores/position';

interface Config {
  currentPosition: PositionItem;
  job: JobList;
  global: {
    filterItem: FilterItem;
  };
}

export const defineNode = (fn: (config: Config) => void) => {
  return fn;
};
