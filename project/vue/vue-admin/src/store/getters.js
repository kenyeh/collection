const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  permission_items: state => state.permission.items
}
export default getters
