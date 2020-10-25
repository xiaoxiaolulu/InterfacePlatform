<template>
<div class="record-table">
  <el-table :data="records" style="width: 100%">
    <el-table-column prop="url" label="url">
    </el-table-column>
    <el-table-column prop="http_method" label="请求方法" width="100">
    </el-table-column>
    <el-table-column prop="data" label="请求参数">
    </el-table-column>
    <el-table-column prop="return_code" label="响应状态码" width="100">
    </el-table-column>
    <el-table-column prop="return_content" label="响应体">
    </el-table-column>
    <el-table-column label="测试状态" width="100">
      <template slot-scope="scope">
        <el-tag type="success" v-if="scope.row.api.expect_code == scope.row.return_code" effect="dark">成功</el-tag>
        <el-tag type="danger" v-else effect="dark">失败</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="执行时间" width="200">
      <template slot-scope="scope">
        {{scope.row.create_time|dateFormat}}
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "RecordTable",
  props: ['records'],
  data() {
    return {}
  },
  components: {}
}
</script>

<style scoped lang='scss'>
</style>