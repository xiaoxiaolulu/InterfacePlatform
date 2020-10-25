<template>
<div class="">
  <el-tabs v-model="activeName" type="border-card">
    <el-tab-pane label="API" name="1">
      <RecordTable :records="api_records"></RecordTable>
    </el-tab-pane>
    <el-tab-pane label="用例" name="2">
      <el-collapse>
        <el-collapse-item v-for="(record,index) in case_records" :key="index" :title="record.case.name" class="case-record-list">
          <template slot="title">
            <div class="case-record-title">
              <span>{{record.case.name}}</span>
              <span>{{record.case.create_time|dateFormat}}</span>
            </div>
          </template>
          <RecordTable :records="record.api_records"></RecordTable>
        </el-collapse-item>
      </el-collapse>
    </el-tab-pane>
  </el-tabs>
</div>
</template>

<script type="text/ecmascript-6">
import RecordTable from "./RecordTable"
export default {
  name: "RecordList",
  props: ['project'],
  data() {
    return {
      activeName: "1",
      api_records: [],
      case_records: []
    }
  },
  components: {
    [RecordTable.name]: RecordTable
  },
  watch: {
    project(){
      if(this.project && this.project.id){
        this.$http.getApiRecords(this.project.id).then(res => {
          this.api_records = res.data
        })
    
        this.$http.getCaseRecords(this.project.id).then(res => {
          this.case_records = res.data
        })
      }
    }
  }
}
</script>

<style scoped lang='scss'>
</style>