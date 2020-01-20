<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.userName" style="width: 150px;" :placeholder="$t('userInfo.user')" class="filter-item" />
      <el-select v-model="listQuery.status" :placeholder="$t('userInfo.loginStatus')" clearable style="width: 140px" class="filter-item">
        <el-option v-for="item in statusOptions" :key="item" :label="item | statusCn" :value="item" />
      </el-select>
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
      <el-button class="filter-item btn-search" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('common.search') }}
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
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

      <el-table-column class-name="status-col" :label="$t('userInfo.loginStatus')" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status | statusCn }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" :label="$t('userInfo.time')">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.register_time }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('common.operations')" width="120">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="handleUpdate(scope.row)">
            {{ $t('common.edit') }}
          </el-button>
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

    <el-dialog :title="$t('common.edit')" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="120px">
        <el-form-item prop="merchantCode">
          <span slot="label">{{ $t('userInfo.merchant') }}</span>
          <span>{{ temp.merchantCode }}</span>
        </el-form-item>
        <el-form-item :label="$t('userInfo.loginStatus')">
          <el-radio-group v-model="temp.status">
            <el-radio label="normal">{{ $t('userInfo.status.normal') }}</el-radio>
            <el-radio label="ban">{{ $t('userInfo.status.ban') }}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('common.cancel') }}
        </el-button>
        <el-button type="primary" @click="updateData()">
          {{ $t('common.confirm') }}
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { fetchList, updateUserData } from '@/api/merchant/lotteryUserInfo'
import Pagination from '@/components/Pagination'
import i18n from '@/lang'

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
        normal: i18n.t('userInfo.status.normal'),
        ban: i18n.t('userInfo.status.ban')
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
      temp: {
        id: undefined,
        merchantCode: '',
        status: ''
      },
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
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogFormVisible = true
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
    },
    updateData() {
      const tempData = Object.assign({}, this.temp)

      updateUserData(tempData).then(() => {
        for (const v of this.list) {
          if (v.id === this.temp.id) {
            const index = this.list.indexOf(v)
            this.list.splice(index, 1, this.temp)
            break
          }
        }
        this.dialogFormVisible = false

        this.$message({
          message: '修改成功',
          type: 'success'
        })
      })
    }
  }
}
</script>

<style>

</style>
