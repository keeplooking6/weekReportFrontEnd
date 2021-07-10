<template>
  <div class="app-container">
    周报添加
    <el-form label-width="120px">
      <el-form-item label="用户名" width="300px">
        <el-input v-model="userInfo.uname"/>
      </el-form-item>
      <el-form-item label="用户角色">
        <el-input v-model="userInfo.roleid" :rows="10"/>
      </el-form-item>
      <el-form-item label="用户密码">
        <el-input v-model="userInfo.upass"/>
      </el-form-item>
      <el-form-item label="用户性别">
        <el-input v-model="userInfo.gender" :rows="10"/>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveUser">保存</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import user from '@/api/report/userInfo'

  export default{
    data(){
      return{
        userInfo: {},
        //在点击保存之后不能再点击，防止多次提交相同内容
        saveBtnDisabled: false
      }
    },
    created(){
      this.init()
    },


    //实时监听url中id的有无
    watch: {
      $route(to,from){
        this.init();
      }
    },
    methods:{
      //"修改用户"时跳转的"添加用户"页面(页面复用)
      init(){
        if(this.$route.params && this.$route.params.id){
          const id = this.$route.params.id
          this.selectById(id)
        }
      },
      add(){
        user.addUser(this.userInfo)
          .then(response => {
            this.$message({
              type: "success",
              message: "添加成功"
            });
          })
        this.$router.push({path:'/user/userList'})
      },
      //保存用户
      saveUser(){
        if(this.userInfo.id){
          this.update();
        }else{
          this.add();
        }
      },
      //根据id查询用户
      selectById(id){
        user.selectUserById(id)
          .then(response => {
            this.userInfo = response.data.tUser
            console.log(this.userInfo)
          })
      },
      //修改用户
      update(){
        user.updateUser(this.userInfo)
          .then(response => {
            this.$message({
              type: "success",
              message: "修改成功"
            })
          })
        this.$router.push({path: "/user/userList"})
      }
    }
  }
</script>
