/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-28 17:35:04
 * @LastEditTime: 2020-08-26 18:04:00
 */ 
import { BASEURL } from '@/config';
// 上传文件路径
export const UPLOAD_FILE_URL = BASEURL+ '/audit/file/upload/image';

// 个人中心按钮配置
export const userSetMenu = [
  {
    id: '0',
    name: '个人中心',
  },
  {
    id: '1',
    name: '安全退出',
  },
]

// 首页数据对应表
export const statisticCount = {
  'yesterdayAuditNews': '昨日审核图文数',
  'yesterdayAuditVideo': '昨日审核视频数',
  'yesterdayAuditAudio': '昨日审核音频数',
  'yesterdayAuditImage': '昨日审核图集数',
  'todayAddNews': '今日新增图文数',
  'todayAddVideo': '今日新增视频数',
  'todayAddAudio': '今日新增音频数',
  'todayAddImage': '今日新增图集数',
  'notAuditNews': '待审图文数',
  'notAuditVideo': '待审视频数',
  'notAuditAudio': '待审音频数',
  'notAuditImage': '待审图集数',
}

// 系统使用的随机颜色
export const colorList = ['#7eacea', '#e15777', '#95ea71', '#ea9b4f', '#7577df', '#be72d8', '#6633FF', '#6600CC', '#006633', '#993333', '#FF9900', '#9999FF']

// 时间类型
export const dateFormat = 'YYYY-MM-DD HH:mm:ss';

// 内容类型
export const contentType =  { '': '全部', 'NEWS': '图文', 'VIDEO': '视频', 'AUDIO': '音频', 'IMAGE': '图集' };

// 队列机制
export const queueType = { '': '全部', 1: '先审后发', 2: '先发后审', 3: '免审' };

// 队列保存时长
export const keepDays = { '': '全部', 1: '1天', 3: '3天', 7: '7天', 15: '15天', 30: '30天', 60: '60天', 90: '90天' };

// 队列状态
export const queueStatus = { '': '全部', 1: '有效', 2: '隐藏' };

// 权限状态 
export const rightStatus = { '': '全部', 0: '离线', 1: '在线', 2: '注销' };

// 角色状态 
export const roleStatus = { '': '全部', 0: '有效', 1: '失效'};

// 审核状态
export const auditStatus = { '' : '全部', 1: '待审核', 2: '审核通过', 3: '审核未通过' };

// 上架状态
export const runningStatus = { '' : '全部', 'ONLINE': '上架', 'OFFLINE': '下架' };

// 统计排序
export const orderFieldMap = { '': '全部', 'dt': '时间', 'entry_queue_count': '入审量', 'audit_count': '审核量', 'audit_passed_count': '审核通过量'};

// 统计排序
export const orderTypeMap = { 'desc': '降序', 'asc': '升序'};

// 审核结果
export const auditResult = { '': '全部', 'INIT': '待审', 'PENDING': '已领取', 'PASS': '通过', 'REJECT': '删除'};