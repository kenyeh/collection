import Mock from 'mockjs'

const donate = Mock.mock({
  'data|50': [{
    id: '@id',
    merchantCode: '@first',
    host: '@cname',
    userName: '@first()_@last()',
    rewardAmount: '@integer(0, 100)'
  }]
})

export default [
  {
    url: '/report/donateReport',
    type: 'get',
    response: config => {
      const { userName, host, page = 1, limit = 20 } = config.query

      const mockList = donate.data.filter(item => {
        if (userName && item.userName.indexOf(userName) < 0) {
          return false
        }
        if (host && item.host.indexOf(host) < 0) {
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
