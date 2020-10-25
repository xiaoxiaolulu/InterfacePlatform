<template>
<div class="">
  <div class="top-group">
    <el-button type="primary" icon="el-icon-plus" @click="onAddCase">新增用例</el-button>
  </div>

  <el-table :data="project.case_list" style="width: 100%">
    <el-table-column prop="name" label="名称">
    </el-table-column>
    <el-table-column prop="description" label="描述">
    </el-table-column>
    <el-table-column label="创建时间">
      <template slot-scope="scope">
        {{scope.row.create_time|dateFormat}}
      </template>
    </el-table-column>
    <el-table-column label="操作"  width=300>
      <template slot-scope="scope">
        <el-button type="primary" size="mini" @click="onRunCase(scope.row,scope.$index)">运行</el-button>
        <el-button size="mini" @click="onEditCase(scope.row,scope.$index)">编辑</el-button>
        <el-button type="danger" size="mini" @click="onDeleteCase(scope.row,scope.$index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog title="运行结果" :visible.sync="dialogVisible" width="80%">
    <el-table :data="records" height="500">
      <el-table-column fixed property="url" label="url" width="150"></el-table-column>
      <el-table-column property="http_method" label="请求方法" width="100"></el-table-column>
      <el-table-column property="headers" label="请求头"></el-table-column>
      <el-table-column property="data" label="请求体"></el-table-column>
      <el-table-column property="return_code" label="状态码" width="80"></el-table-column>
      <el-table-column property="return_content" label="响应体"></el-table-column>
      <el-table-column property="run_result" label="测试结果" width="100">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.run_result===true">成功</el-tag>
          <el-tag type="danger" v-if="scope.row.run_result===false">失败</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</div>
</template>

<script type="text/ecmascript-6">
import casepage from "./casepage"
export default {
  name: "CaseList",
  props: ['project'],
  data() {
    return {
      dialogVisible: false,
      records: []
    }
  },
  components: {},
  methods: {
    onAddCase(){
      this.$emit("page-changed",casepage.ADD_CASE)
    },
    onRunCase(caseobj,index){
      console.log(index)
      this.$loading.show()
      this.$http.runCase(caseobj.id).then(res => {
        this.$loading.hide()
        const result = res.data
        this.records = result.api_records
        for(let record of this.records){
          if(record.api.expect_code === record.return_code){
            record.run_result = true
          }else{
            record.run_result = false
          }
        }
        this.dialogVisible = true
      })
    },
    onEditCase(caseobj,index){
      console.log(index)
      this.$emit("page-changed",casepage.ADD_CASE,caseobj)
    },
    onDeleteCase(caseobj,index){
      console.log(caseobj)
      console.log(index)
    }
  }
}
</script>

<style scoped lang='scss'>
.top-group{
  padding: 10px 0;
}
</style>