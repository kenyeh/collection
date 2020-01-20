<template>
  <div class="app-container">
    <!-- filter -->
    <div class="filter-container">
      <el-input v-model="listQuery.userName" style="width: 150px;" placeholder="商户名" class="filter-item" />
      <el-select v-model="listQuery.status" placeholder="状态" clearable style="width: 120px" class="filter-item">
        <el-option v-for="item in statusOptions" :key="item" :label="item | statusCn" :value="item" />
      </el-select>
      <el-date-picker
        v-model="listQuery.dateRange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        unlink-panels
        value-format="yyyy-MM-dd"
        class="filter-item"
      />
      <el-button class="filter-item btn-search" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="" width="110">
        <template slot-scope="scope">
          {{ scope.$index+1 + (listQuery.limit * (listQuery.page -1)) }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="商户名">
        <template slot-scope="scope">
          {{ scope.row.merchantCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="钱包类型">
        <template slot-scope="scope">
          {{ scope.row.pointType }}
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="注册时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.register_time }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status | statusCn }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <router-link :to="'/merchant/agentEdit/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">
              Edit
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :page-size="listQuery.limit"
      @pagination="fetchData"
    />
  </div>
</template>

<script>
import { fetchList } from '@/api/merchant/agentList'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        normal: 'success',
        ban: 'danger'
      }
      return statusMap[status]
    },
    statusCn(status) {
      const strMap = {
        normal: '正常',
        ban: '禁止'
      }
      return strMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        userName: undefined,
        status: undefined,
        dateRange: ''
      },
      statusOptions: [
        'normal',
        'ban'
      ],
      dialogFormVisible: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.fetchData()
    }
  }
}
</script>

<style>

</style>
