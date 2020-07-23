/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2019-12-17 15:40:32
 * @LastEditTime: 2020-07-21 09:43:40
 */
const Mock = require('mockjs');
const qs = require('qs');

export default {
  /**
    * @name: 登录接口
    * @test: test font
    * @msg: 
    * @param {type} 
    * @return: 
    */
  [`POST /api/user/login`](req, res){
    const data = qs.parse(req.body);
    setTimeout(() => {
      res.status(200).json({
        code: 0,
        message: "登录成功",
        data: {
          token: "sdfasdhfasdhfsdhf",
          userinfo: {
            name: "big bug",
            count: 12,
            avatar: "https://mirror-gold-cdn.xitu.io/16b20352d200ee99993?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1"
          }
        }
      })
    }, 500);
  },

  /**
    * @name: 注销登录接口
    * @test: test font
    * @msg: 
    * @param {type} 
    * @return: 
    */
  [`GET /user/logout`](req, res){
      const data = qs.parse(req.body);
      setTimeout(() => {
        res.status(200).json({
          code: 0,
          message: "注销成功",
        })
      }, 500);
  },

  /**
    * @name: 查询用户信息接口
    * @test: test font
    * @msg: 
    * @param {type} 
    * @return: 
    */
  [`GET /user/getRoles`](req, res) {
    setTimeout(() => {
      res.status(200).json({
        code: 200,
        message: "查询成功",
        data: {
          role_name: '管理员',
          service_line: '聚合分发',
          roles: [
            {
              title: '审核设置',
              route: '/setting',
              data: [
                {
                  name: '查询',
                  key: 'search',
                  route: '/queue/list'
                },
                {
                  name: '新增',
                  key: 'add',
                  route: '/queue/add'
                },
                {
                  name: '修改',
                  key: 'change',
                  route: '/queue/add'
                },
                {
                  name: '删除',
                  key: 'del',
                  route: '/queue/add'
                },
              ]
            }
          ]
        }
      })
    }, 500);
  }
}