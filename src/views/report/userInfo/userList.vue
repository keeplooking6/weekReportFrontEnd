<template>
  <div class="app-container">
    周报列表
    <!--条件查询表单-->
    <el-form :inline="true" class="demo-form-inline">

      <el-form-item>
        <el-input v-model="queryUser.uname" placeholder="用户名"/>
      </el-form-item>

      <el-form-item>
        <el-input v-model="queryUser.roleid" placeholder="角色"/>
      </el-form-item>

      <el-form-item>
        <el-input v-model="queryUser.gender" placeholder="性别"/>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()"></el-button>

      <el-button type="default" @click="resetData()">清空</el-button>

    </el-form>

    <!--数据展示表单-->
    <el-table
      :data="list"
      style="width: 100%"
      :default-sort = "{prop: 'name', order: 'descending'}"
    >
      <el-table-column type="index" width="50"/>

      <el-table-column prop="uname" label="用户名" width="160" sortable/>

      <el-table-column prop="upass" label="密码" width="120" sortable/>

      <el-table-column prop="gender" label="性别" width="160"/>

      <el-table-column prop="roleid" label="角色" width="230"/>

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/user/edit/'+scope.row.id">
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
  import user from '@/api/report/userInfo'

  export default {
    data() {
      return {
        // 查询之后接口返回的集合
        list: null,
        total: 0,
        current: 1,
        limit: 3,
        //条件查询的条件
        queryUser: {},
      }
    },
    created() {
      this.getList()
    },
    methods: {
      //查询所有用户
      getList(page = 1) {
        this.current = page
        user.getUserList(this.current, this.limit, this.queryUser).then(response => {
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
        this.queryUser = {}
        this.getList()
      },

      //删除用户
      deleteById(id) {
        this.$confirm('确认删除这条用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          user.deleteUserById(id).then(response =>{
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
