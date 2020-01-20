export const asyncRoutes = [
  {
    id: '1',
    path: '/admin',
    component: 'layout',
    name: 'admin',
    meta: { title: 'admin', icon: 'lock' },
    children: [
      {
        id: '2',
        path: 'role',
        name: 'role',
        component: 'admin/role',
        meta: {
          title: 'role',
          icon: 'peoples'
        },
        perms: [
          'add',
          'update',
          'delete'
        ]
      }
    ]
  },
  {
    id: '3',
    path: '/merchant',
    component: 'layout',
    redirect: 'merchant/lotteryUserInfo',
    name: 'merchant',
    meta: { title: 'merchant', icon: 'user' },
    children: [
      {
        id: '4',
        path: 'agentList',
        name: 'agentList',
        component: 'merchant/agentList',
        meta: {
          title: 'agentList',
          icon: 'user'
        }
      },
      {
        id: '5',
        path: 'lotteryUserInfo',
        name: 'lotteryUserInfo',
        component: 'merchant/lotteryUserInfo',
        meta: {
          title: 'lotteryUserInfo',
          icon: 'user'
        }
      }
    ]
  },

  {
    id: '6',
    path: '/report',
    component: 'layout',
    redirect: 'noRedirect',
    name: 'report',
    meta: { title: 'report', icon: 'documentation' },
    children: [
      {
        id: '7',
        path: 'donateReport',
        name: 'donateReport',
        component: 'report/donateReport',
        meta: { title: 'donateReport' },
        perms: [
          'search'
        ]
      },
      {
        id: '8',
        path: 'donateReport2',
        name: 'donateReport2',
        component: 'report/donateReport',
        meta: { title: 'donateReport2' },
        perms: [
          'search'
        ]
      }
    ]
  }
]
