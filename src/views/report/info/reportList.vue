<template>
  <div class="app-container">
    周报列表
    <!--条件查询表单-->
    <el-form :inline="true" class="demo-form-inline">

      <el-form-item>
        <el-input v-model="queryReport.name" placeholder="周报名称"/>
      </el-form-item>

      <el-form-item>
        <el-input v-model="queryReport.createman" placeholder="角色"/>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()"></el-button>

      <el-button type="default" @click="resetData()">清空</el-button>

    </el-form>

<!--数据展示表单-->
    <el-table
      :data="list"
      style="width: 100%"
      :default-sort = "{prop: 'createtime', order: 'descending'}"
    >
      <el-table-column type="index" width="50"/>

      <el-table-column prop="createtime" label="创建时间" width="160" sortable/>

      <el-table-column prop="name" label="周报名称" width="120" sortable/>

      <el-table-column prop="achievement" label="本周成就" width="230"/>

      <el-table-column prop="problem" label="本周问题" width="160"/>

      <el-table-column prop="plan" label="下周计划" width="230" />

      <el-table-column prop="createman" label="角色" width="130" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/report/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteById(scope.row.id)"></el-button>
        </template>
      </el-table-column>

    </el-table>

<!--分页-->
    <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="total"
      background
      style="padding: 30px 0; text-align: center;"
      layout="prev, pager, next, jumper"
      @current-change="getList"
      >
    </el-pagination>
  </div>
</template>

<script>
import report from '@/api/report/report'

export default {
  data() {
    return {
      // 查询之后接口返回的集合
      list: null,
      total: 0,
      current: 1,
      limit: 3,
      //条件查询的条件
      queryReport: {},
    }
  },
  created() {
    this.getList()
  },
  methods: {
    //查询所有周报
    getList(page = 1) {
      this.current = page
      report.getReportList(this.current, this.limit, this.queryReport).then(response => {
        // console.log(response)
        this.list = response.data.list
        this.total = response.data.total
        console.log(this.list)
        console.log(this.total)
      }).catch(error => {
        console.log(error)
      })
    },

    //清空条件查询
    resetData(){
      this.queryReport = {}
      this.getList()
    },

    //删除周报
    deleteById(id) {
      this.$confirm('确认删除这条周报?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        report.deleteReportById(id).then(response =>{
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          //删除后重新调用查询方法刷新页面
          this.getList()
        })
      })
    }
  }

}
</script>
