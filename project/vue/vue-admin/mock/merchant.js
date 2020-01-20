import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    merchantCode: '@first',
    userName: '@first()_@last()',
    'status|1': ['normal', 'ban'],
    author: 'name',
    register_time: '@datetime',
    pageviews: '@integer(300, 5000)'
  }]
})

const agentData = Mock.mock({
  'items|30': [{
    id: '@id',
    merchantCode: '@first',
    userName: '@first()_@last()',
    'status|1': ['normal', 'ban'],
    register_time: '@datetime',
    'playType|1': ['standard', 'double'],
    pointType: 'oneWay'
  }]
})

export default [
  {
    url: '/lotteryUserInfo/list',
    type: 'get',
    response: config => {
      const { userName, status, page = 1, limit = 20 } = config.query
      // const items = data.items

      const mockList = data.items.filter(item => {
        if (userName && item.userName.indexOf(userName) < 0) {
          return false
        }
        if (status && item.status !== status) {
          return false
        }

        return true
      })

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },

  {
    url: '/lotteryUserInfo/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/agent/list',
    type: 'get',
    response: config => {
      const { userName, status, page = 1, limit = 20 } = config.query
      // const items = data.items

      const mockList = agentData.items.filter(item => {
        if (userName && item.userName.indexOf(userName) < 0) {
          return false
        }
        if (status && item.status !== status) {
          return false
        }

        return true
      })

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  }
]
