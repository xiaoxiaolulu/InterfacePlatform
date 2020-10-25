<template>
    <div class="">
        <el-table :data="user_list" style="width: 100%">
            <el-table-column prop="username" label="用户名"></el-table-column>
            <el-table-column prop="telephone" label="手机号"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="date_joined" label="加入时间"></el-table-column>
            <el-table-column prop="is_active" label="状态">
                <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.is_active===true">可用</el-tag>
                    <el-tag type="danger" v-if="scope.row.is_active===false">冻结</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <el-button type="danger" size="mini">禁用</el-button>
            </el-table-column>
        </el-table>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "MemberList",
        data() {
            return {
                user_list: []
            }
        },
        components: {},
        mounted() {
            this.$http.getUserList().then(res => {
                this.user_list = res.data
            })
        }
    }
</script>

<style scoped lang='scss'>
</style>