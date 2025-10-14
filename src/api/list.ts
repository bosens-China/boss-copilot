export interface Root {
  code: number;
  message: string;
  zpData: ZpData;
}

export interface ZpData {
  resCount: number;
  filterString: string;
  lid: string;
  hasMore: boolean;
  jobList: JobList[];
  totalCount: number;
  brandCard: any;
}

export interface JobList {
  securityId: string;
  bossAvatar: string;
  bossCert: number;
  encryptBossId: string;
  bossName: string;
  bossTitle: string;
  goldHunter: number;
  bossOnline: boolean;
  encryptJobId: string;
  expectId: number;
  jobName: string;
  lid: string;
  salaryDesc: string;
  jobLabels: string[];
  jobValidStatus: number;
  iconWord: string;
  skills: string[];
  jobExperience: string;
  daysPerWeekDesc: string;
  leastMonthDesc: string;
  jobDegree: string;
  cityName: string;
  areaDistrict: string;
  businessDistrict: string;
  jobType: number;
  proxyJob: number;
  proxyType: number;
  anonymous: number;
  outland: number;
  optimal: number;
  iconFlagList: any[];
  itemId: number;
  city: number;
  isShield: number;
  atsDirectPost: boolean;
  gps: Gps;
  afterNameIcons: any[];
  beforeNameIcons: any[];
  encryptBrandId: string;
  brandName: string;
  brandLogo: string;
  brandStageName: string;
  brandIndustry: string;
  brandScaleName: string;
  welfareList: string[];
  industry: number;
  contact: boolean;
  showTopPosition: boolean;
}

export interface Gps {
  longitude: number;
  latitude: number;
}
