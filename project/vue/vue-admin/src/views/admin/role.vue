<template>
  <div class="app-container">
    <el-button v-btnPermission="['add']" type="primary" @click="handleAddRole">{{ $t('role.addRole') }}</el-button>
    <el-table :data="rolesList" style="width: 100%;margin-top:30px;" border>
      <el-table-column :label="$t('role.roleName')" width="120px">
        <template slot-scope="scope">
          {{ scope.row.key }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('role.roleDescription')">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.operations')" width="250px">
        <template slot-scope="scope">
          <el-button v-btnPermission="['update']" type="primary" @click="handleEditRole(scope)">{{ $t('common.edit') }}</el-button>
          <el-button v-btnPermission="['delete']" type="danger" @click="handleDelete(scope)">{{ $t('common.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogType==='edit'?$t('role.editRole'):$t('role.addRole')" :visible.sync="dialogVisiable">
      <el-form :model="role" label-width="100px" label-position="left">
        <el-form-item :label="$t('role.roleName')">
          <el-input v-model="role.name" :placeholder="$t('role.roleName')" />
        </el-form-item>
        <el-form-item :label="$t('role.roleDescription')">
          <el-input
            v-model="role.description"
            :placeholder="$t('role.roleDescription')"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
          />
        </el-form-item>
        <el-form-item :label="$t('role.menu')">
          <el-tree
            ref="tree"
            :data="routesData"
            :check-strictly="checkStrictly"
            :props="defaultProps"
            show-checkbox
            default-expand-all
            node-key="path"
            class="permission-tree"
            @check="treeSet"
          />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisiable=false">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" @click="confirmRole">{{ $t('common.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import permissionFn from '@/directive/permission/index.js' // 权限判断指令
import path from 'path'
import { deepClone } from '@/utils'
import { getAllRoutes, getRoles, deleteRole, addRole, updateRole } from '@/api/admin/role'
import i18n from '@/lang'

const defaultRole = {
  key: '',
  name: '',
  routes: []
}

export default {
  directives: { ...permissionFn },
  data() {
    return {
      role: Object.assign({}, defaultRole),
      routes: [],
      rolesList: [],
      dialogType: 'new',
      checkStrictly: true,
      dialogVisiable: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  computed: {
    routesData() {
      return this.routes
    },
    lang() {
      return this.$store.getters.language
    }
  },
  watch: {
    lang() {
      this.getRoutes()
    }
  },
  created() {
    this.getRoutes()
    this.getRoles()
  },
  methods: {
    async getRoutes() {
      const res = await getAllRoutes()
      this.serviceRoutes = res.data
      const routes = this.generateRoutes(res.data)
      this.routes = this.i18nRoutes(routes)
    },
    async getRoles() {
      const res = await getRoles()
      this.rolesList = res.data
    },
    i18nRoutes(routes) {
      const app = routes.map(route => {
        route.title = i18n.t(`route.${route.title}`)
        if (route.children) {
          route.children = this.i18nRoutes(route.children)
        }
        return route
      })
      return app
    },
    generateRoutes(routes, basePath = '/') {
      const res = []

      for (let route of routes) {
        // skip
        if (route.hidden) { continue }

        const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)
        if (route.children && onlyOneShowingChild && !route.alwaysShow) {
          route = onlyOneShowingChild
        }

        const data = {
          path: path.resolve(basePath, route.path),
          title: route.meta && route.meta.title
        }

        // recursive child reoutes
        if (route.children) {
          data.children = this.generateRoutes(route.children, data.path)
        } else {
          // show item permit
          if (route.perms) {
            data.children = route.perms.map((item) => {
              return { title: item, path: data.path + '/' + item }
            })
          }
        }

        res.push(data)
      }
      return res
    },
    handleAddRole() {
      this.role = Object.assign({}, defaultRole)
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogType = 'new'
      this.dialogVisiable = true
    },
    handleEditRole(scope) {
      this.dialogType = 'edit'
      this.dialogVisiable = true
      // this.checkStrictly = true
      this.role = deepClone(scope.row)
      this.$nextTick(() => {
        const routes = this.generateRoutes(this.role.routes)
        this.$refs.tree.setCheckedNodes(this.generateArr(routes))
        // set checked state of a node not affects its father and child nodes
        // this.checkStrictly = false
      })
    },
    handleDelete({ $index, row }) {
      this.$confirm(i18n.t(`role.confirmRemoveRole`), i18n.t(`common.warning`), {
        confirmButtonText: i18n.t(`common.confirm`),
        cancelButtonText: i18n.t(`common.cancel`),
        type: 'warning'
      }).then(async() => {
        await deleteRole(row.key)
        this.rolesList.splice($index, 1)
        this.$message({
          type: 'success',
          message: 'Delete Successd'
        })
      }).catch(err => { console.error(err) })
    },
    treeSet(currentObj, treeStatus) {
      // 用于：父子节点严格互不关联时，父节点勾选变化时通知子节点同步变化，实现单向关联。
      const selected = treeStatus.checkedKeys.indexOf(currentObj.path) // -1未选中

      if (selected !== -1) {
        // 子节点只要被选中父节点就被选中
        this.selectedTreeParent(currentObj)
        // 统一处理子节点为相同的勾选状态
        this.uniteTreeChildSame(currentObj, true)
      } else {
        // 未选中 处理子节点全部未选中
        if (currentObj.children && currentObj.children.length !== 0) {
          this.uniteTreeChildSame(currentObj, false)
        }
      }
    },
    selectedTreeParent(currentObj) {
      const currentNode = this.$refs.tree.getNode(currentObj)
      if (currentNode.parent.key !== undefined) {
        this.$refs.tree.setChecked(currentNode.parent, true)
        this.selectedTreeParent(currentNode.parent)
      }
    },
    uniteTreeChildSame(treeList, isSelected) {
      this.$refs.tree.setChecked(treeList.path, isSelected)
      if (treeList.children) {
        for (let i = 0; i < treeList.children.length; i++) {
          this.uniteTreeChildSame(treeList.children[i], isSelected)
        }
      }
    },
    async confirmRole() {
      const isEdit = this.dialogType === 'edit'

      const checkedKeys = this.$refs.tree.getCheckedKeys()

      this.role.routes = this.generateTree(deepClone(this.serviceRoutes), '/', checkedKeys)
      if (isEdit) {
        await updateRole(this.role.key, this.role)
        for (let index = 0; index < this.rolesList.length; index++) {
          if (this.rolesList[index].key === this.role.key) {
            this.rolesList.splice(index, 1, Object.assign({}, this.role))
            break
          }
        }
      } else {
        const { data } = await addRole(this.role)
        this.role.key = data.key
        this.rolesList.push(this.role)
      }

      const { description, name } = this.role
      this.dialogVisiable = false
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: `
          <div>${i18n.t(`role.roleName`)}: ${name}</div>
          <div>${i18n.t(`role.roleDescription`)}: ${description}</div>
        `,
        type: 'success'
      })
    },
    generateTree(routes, basePath = '/', checkedKeys) {
      const res = []

      for (const route of routes) {
        const routePath = path.resolve(basePath, route.path)

        // recursive child routes
        if (route.children) {
          route.children = this.generateTree(route.children, routePath, checkedKeys)
        }

        if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
          if (route.perms && route.perms.length > 0) {
            // delete route['perms']
            const setPermis = []
            for (const permsItem of route.perms) {
              if (checkedKeys.some(v => v === routePath + '/' + permsItem)) {
                setPermis.push(permsItem)
              }
            }

            route['perms'] = setPermis
          }

          res.push(route)
        }
      }

      return res
    },
    generateArr(routes) {
      let data = []
      routes.forEach(route => {
        data.push(route)
        if (route.children) {
          const temp = this.generateArr(route.children)
          if (temp.length > 0) {
            data = [...data, ...temp]
          }
        }
      })

      return data
    },
    // reference: src/view/layout/components/Sidebar/SidebarItem.vue
    onlyOneShowingChild(children = [], parent) {
      let onlyOneChild = null
      const showingChildren = children.filter(item => !item.hidden)

      // if (showingChildren.length === 1) {
      //   onlyOneChild = showingChildren[0]
      //   onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
      //   return onlyOneChild
      // }

      // show parent if there are no child route to display
      if (showingChildren.length === 0) {
        onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return onlyOneChild
      }

      return false
    }
  }

}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
