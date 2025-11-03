import whitelist from './whitelist';
import blacklist from './blacklist';
import salary from './salary';
import city from './city';
import blacklistCompanies from './blacklist-companies';
import type { Root } from '@/api/list';
import { getCurrentPosition } from '@/stores/position';
import type { FilterItem } from '@/stores/filter';

const actuator = [blacklist, whitelist, salary, blacklistCompanies, city];

/*
 * 入口
 * 过滤岗位，通过职责链来封装
 */

export const filteringPosition = (data: Root) => {
  const currentPosition = getCurrentPosition();
  if (!currentPosition) {
    return;
  }

  for (const job of data.zpData.jobList) {
    const { brandName, jobName, salaryDesc, cityName } = job;

    const filterItem: FilterItem = {
      encryptId: job.encryptJobId,
      jobName,
      url: `https://www.zhipin.com/job_detail/${job.encryptJobId}.html`,
      companyName: brandName,
      salaryRange: salaryDesc,
      cityName,
    };

    for (const fn of actuator) {
      fn({
        currentPosition,
        job,
        global: {
          filterItem,
        },
      });
    }
  }
};
