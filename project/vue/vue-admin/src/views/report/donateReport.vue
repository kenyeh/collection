<template>
  <div class="app-container">
    <!-- filter -->
    <div class="filter-container">
      <el-input v-model="listQuery.userName" style="width: 150px;" :placeholder="$t('report.user')" class="filter-item" />
      <el-input v-model="listQuery.host" style="width: 150px;" :placeholder="$t('report.host')" class="filter-item" />
      <el-date-picker
        v-model="listQuery.dateRange"
        type="daterange"
        :range-separator="$t('common.rangeSeparator')"
        :start-placeholder="$t('common.startDate')"
        :end-placeholder="$t('common.endDate')"
        unlink-panels
        value-format="yyyy-MM-dd"
        class="filter-item"
      />
      <el-button v-btnPermission="['search']" class="filter-item btn-search" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('common.search') }}
      </el-button>
    </div>

    <!-- table -->
    <el-table
      v-loading="listLoading"
      :data="list"
      show-summary
      :element-loading-text="$t('common.loading')"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="" width="110">
        <template slot-scope="scope">
          {{ scope.$index+1 + (listQuery.limit * (listQuery.page -1)) }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('userInfo.merchant')">
        <template slot-scope="scope">
          {{ scope.row.merchantCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('userInfo.account')">
        <template slot-scope="scope">
          {{ scope.row.userName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="主播">
        <template slot-scope="scope">
          {{ scope.row.host }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="打赏额" prop="rewardAmount">
        <template slot-scope="scope">
          {{ scope.row.rewardAmount }}
        </template>
      </el-table-column>
    </el-table>

    <!-- pagination -->
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
import permissionFn from '@/directive/permission/index.js' // 权限判断指令
import { fetchList } from '@/api/report/donateReport'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  directives: { ...permissionFn },
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        host: undefined,
        userName: undefined,
        dateRange: [new Date(), new Date()]
      }
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
