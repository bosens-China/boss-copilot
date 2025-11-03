export interface Root {
  code: number;
  message: string;
  zpData: ZpData;
}

export interface ZpData {
  pageType: number;
  selfAccess: boolean;
  securityId: string;
  sessionId: any;
  lid: string;
  jobInfo: JobInfo;
  bossInfo: BossInfo;
  brandComInfo: BrandComInfo;
  oneKeyResumeInfo: OneKeyResumeInfo;
  relationInfo: RelationInfo;
  handicappedInfo: any;
  appendixInfo: AppendixInfo;
  atsOnlineApplyInfo: AtsOnlineApplyInfo;
  certMaterials: any[];
}

export interface JobInfo {
  encryptId: string;
  encryptUserId: string;
  invalidStatus: boolean;
  jobName: string;
  position: number;
  positionName: string;
  location: number;
  locationName: string;
  locationUrl: string;
  experienceName: string;
  degreeName: string;
  jobType: number;
  proxyJob: number;
  proxyType: number;
  salaryDesc: string;
  payTypeDesc: any;
  postDescription: string;
  encryptAddressId: string;
  address: string;
  longitude: number;
  latitude: number;
  staticMapUrl: string;
  pcStaticMapUrl: string;
  baiduStaticMapUrl: string;
  baiduPcStaticMapUrl: string;
  overseasAddressList: any[];
  overseasInfo: any;
  showSkills: string[];
  anonymous: number;
  jobStatusDesc: string;
}

export interface BossInfo {
  name: string;
  title: string;
  tiny: string;
  large: string;
  activeTimeDesc: string;
  bossOnline: boolean;
  brandName: string;
  bossSource: number;
  certificated: boolean;
  tagIconUrl: any;
  avatarStickerUrl: any;
}

export interface BrandComInfo {
  encryptBrandId: string;
  brandName: string;
  logo: string;
  stage: number;
  stageName: string;
  scale: number;
  scaleName: string;
  industry: number;
  industryName: string;
  introduce: string;
  labels: string[];
  activeTime: number;
  visibleBrandInfo: boolean;
  focusBrand: boolean;
  customerBrandName: string;
  customerBrandStageName: string;
}

export interface OneKeyResumeInfo {
  inviteType: number;
  alreadySend: boolean;
  canSendResume: boolean;
  canSendPhone: boolean;
  canSendWechat: boolean;
}

export interface RelationInfo {
  interestJob: boolean;
  beFriend: boolean;
}

export interface AppendixInfo {
  canFeedback: boolean;
  chatBubble: any;
}

export interface AtsOnlineApplyInfo {
  inviteType: number;
  alreadyApply: boolean;
}
