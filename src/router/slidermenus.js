/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-29 15:06:52
 * @LastEditTime: 2020-07-21 17:27:27
 */ 
 
const AuditQueue = require('../pages/AuditQueue/router');
const AuditSearch = require('../pages/AuditSearch/router');
const AuditSettings = require('../pages/AuditSettings/router');
const AuditStatistics = require('../pages/AuditStatistics/router');
const RightsManage = require('../pages/AuditRights/router');

exports.sliderMenus = [
  ...AuditSettings,
  ...AuditQueue,
  ...AuditSearch,
  ...AuditStatistics,
  ...RightsManage,
];