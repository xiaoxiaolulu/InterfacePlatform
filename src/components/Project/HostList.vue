<template>
    <div class="">
        <div class="top-group">
            <el-button type="primary" icon="el-icon-plus" @click="onAddHostButtonClick">新增Host</el-button>
        </div>

        <el-table
                :data="project.host_list"
                style="width: 100%">
            <el-table-column
                    prop="name"
                    label="名称">
            </el-table-column>
            <el-table-column
                    prop="host"
                    label="Host">
            </el-table-column>
            <el-table-column
                    prop="description"
                    label="描述">
            </el-table-column>
            <el-table-column
                    label="操作"
                    width=300>
                <template slot-scope="scope">
                    <el-button @click="onEditHost(scope.row)" size="mini">编辑</el-button>
                    <el-button type="danger" size="mini" @click="onDeleteHost(scope.row,scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="新增Host" :visible.sync="hostDialogVisible">
            <el-form ref="hostForm" :model="hostForm" label-width="80px" :rules="hostRules">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="hostForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="host" prop="host">
                    <el-input v-model="hostForm.host" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input type="textarea" v-model="hostForm.description" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="hostDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmitAddHost" :loading="hostLoading">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import Vue from "vue";

    export default {
        name: "HostList",
        props: ['project'],
        data() {
            return {
                hostDialogVisible: false,
                dialogType: 'add',
                hostForm: {
                    name: "",
                    host: "",
                    description: ""
                },
                hostRules: {
                    name: [{required: true, trigger: "blur", message: "请输入host名称！"}],
                    host: [{required: true, trigger: "blur", message: "请输入host！"}]
                },
                hostLoading: false
            }
        },
        components: {},
        methods: {
            initHostForm() {
                this.hostForm = {
                    name: "",
                    host: "",
                    description: ""
                }
            },
            onAddHostButtonClick() {
                this.dialogType = 'add';
                this.hostDialogVisible = true;
            },
            onEditHost(host) {
                this.hostForm = {
                    name: "",
                    host: "",
                    description: "",
                    id: host.id
                }
                this.hostDialogVisible = true
                this.dialogType = "edit"
            },
            onSubmitAddHost() {
                this.$refs['hostForm'].validate(valid => {
                    if (!valid) {
                        return;
                    }
                    this.hostLoading = true
                    if (this.dialogType === 'add') {
                        const params = JSON.parse(JSON.stringify(this.hostForm))
                        params.project_id = this.project.id
                        this.$http.addHost(params).then(res => {
                            this.hostLoading = false
                            if (res) {
                                const host = res.data
                                this.project.host_list.push(host)
                                this.hostDialogVisible = false
                                this.initHostForm()
                            }
                        })
                    }
                    if (this.dialogType === 'edit') {
                        const params = JSON.parse(JSON.stringify(this.hostForm))
                        params.project_id = this.project.id
                        this.$http.editHost(this.hostForm.id, params).then(res => {
                            this.hostLoading = false
                            if (res) {
                                this.hostDialogVisible = false
                                this.project.host_list.push(host)
                                this.initHostForm()
                                this.$message.success("恭喜！host修改成功！")
                                const host = res.data
                                let index = 0
                                for (let loop_host of this.project.host_list) {
                                    if (loop_host.id === host.id) {
                                        Vue.set(this.project.host_list, index, host)
                                        break
                                    }
                                    index++
                                }
                            }
                        })
                    }
                })
            },
            onDeleteHost(host, index) {
                this.$messagebox.confirm({
                    message: "您确定要删除这个host吗？",
                    confirmCallback: () => {
                        this.$loading.show();
                        this.$http.deleteHost(host.id).then(res => {
                            console.log(res.data);
                            this.project.host_list.splice(index, 1);
                            this.$loading.hide();
                            this.$message.success("删除成功")
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped lang='scss'>
</style>