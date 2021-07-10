<template>
  <div class="app-container">
    周报添加
    <el-form label-width="120px">
      <el-form-item label="周报类型名称" width="300px">
        <el-input v-model="reportInfo.name"/>
      </el-form-item>
      <el-form-item label="我的角色">
        <el-input v-model="reportInfo.createman" :rows="10"/>
      </el-form-item>
      <el-form-item label="本周成就">
        <el-input v-model="reportInfo.achievement"/>
      </el-form-item>
      <el-form-item label="本周问题">
        <el-input v-model="reportInfo.problem" :rows="10" type="textarea"/>
      </el-form-item>
      <el-form-item label="下周计划">
        <el-input v-model="reportInfo.plan" :rows="10" type="textarea"/>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveReport">保存</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import report from '@/api/report/report'

  export default{
    data(){
      return{
        reportInfo: {},
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
      //"修改周报"时跳转的"添加周报"页面(页面复用)
      init(){
        if(this.$route.params && this.$route.params.id){
          const id = this.$route.params.id
          this.selectById(id)
        }
      },
      add(){
        report.addReport(this.reportInfo)
          .then(response => {
            this.$message({
              type: "success",
              message: "添加成功"
            });
          })
          this.$router.push({path:'/report/reportList'})
      },
      //保存周报
      saveReport(){
        if(this.reportInfo.id){
          //修改周报
          this.update();
        }else{
          //添加周报
          this.add();
        }
      },
      //根据id查询周报
      selectById(id){
        report.selectReportById(id)
          .then(response => {
            this.reportInfo = response.data.tReport
            // console.log(this.reportInfo)
          })
      },
      //修改周报
      update(){
        report.updateReport(this.reportInfo)
        .then(response => {
          this.$message({
            type: "success",
            message: "修改成功"
          })
        })
        this.$router.push({path: "/report/reportList"})
      }
    }
  }
</script>
