<template>
    <div class="">
        <div class="top-group">
            <el-button type="primary" icon="el-icon-plus" @click="onGotoAddApi">新增API</el-button>
        </div>
        <el-table
                :data="project.api_list"
                style="width: 100%">
            <el-table-column
                    prop="name"
                    label="名称">
            </el-table-column>
            <el-table-column
                    label="Host">
                <template slot-scope="scope">
                    {{scope.row.host.host}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="description"
                    label="描述">
            </el-table-column>
            <el-table-column
                    label="操作"
                    width=300>
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="onRunApi(scope.row,scope.$index)">运行</el-button>
                    <el-button size="mini" @click="onEditApi(scope.row,scope.$index)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="onDeleteApi(scope.row,scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="运行结果" :visible.sync="dialogVisible" width="80%">
            <el-table :data="[record]" height="250">
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
    import apipage from "./apipage"

    export default {
        name: "ApiList",
        props: ['project'],
        data() {
            return {
                dialogVisible: false,
                record: null
            }
        },
        components: {},
        methods: {
            onGotoAddApi() {
                this.$emit("page-changed", apipage.ADD_API)
            },
            onRunApi(api, index) {
                console.log(api)
                console.log(index)
                this.$loading.show()
                this.$http.runApi(api.id).then(res => {
                    this.$loading.hide()
                    const record = res.data
                    record.run_result = record.api.expect_code === record.return_code ? true : false
                    this.record = record
                    this.dialogVisible = true
                })
            },
            onEditApi(api, index) {
                console.log(index)
                this.$emit("page-changed", apipage.ADD_API, api)
            },
            onDeleteApi(api, index) {
                this.$messagebox.confirm({
                    confirmCallback: () => {
                        this.$loading.show()
                        this.$http.deleteApi(api.id).then(res => {
                            console.log(res.data)
                            this.project.api_list.splice(index, 1)
                            this.$loading.hide()
                            this.$message.success()
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped lang='scss'>
    .top-group {
        padding: 10px 0;
    }
</style>