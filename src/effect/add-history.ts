import { addCurrentRoleHistory } from '@/stores/history';
import { broadcast } from '@/core/broadcast';
import { type Root } from '@/api/detail';

/*
 * 每次详情被点击的时候都记录下来
 */
broadcast.subscribe<Root>('/wapi/zpgeek/job/detail.json', (data) => {
  addCurrentRoleHistory(data.zpData.jobInfo.encryptId);
});
