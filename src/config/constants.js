/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-28 17:35:04
 * @LastEditTime: 2020-08-21 14:08:11
 */ 
// 上传文件路径
export const UPLOAD_FILE_URL = '';

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

// 时间类型
export const dateFormat = 'YYYY-MM-DD HH:mm:ss';

// 内容类型
export const contentType =  { '': '全部', 1: '图文', 2: '视频', 3: '音频', 4: '图集' };

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