<template>
    <div class="">
        <h1>项目列表</h1>
        <div class="top-group">
            <el-button type="primary" icon="el-icon-plus" @click="onAddProjectButtonClick">新增项目</el-button>
        </div>
        <el-table :data="projects" style="width: 100%">
            <el-table-column prop="name" label="项目名称" width="180">
                <template slot-scope="scope">
                    <router-link :to="'/project/'+scope.row.id">{{scope.row.name}}</router-link>
                </template>
            </el-table-column>
            <el-table-column prop="type" label="类型" width=100>
            </el-table-column>
            <el-table-column prop="last_update_time" label="最后修改时间">
            </el-table-column>
            <el-table-column prop="description" label="描述">
            </el-table-column>
            <el-table-column label="状态" width="100">
                <template>
                    <!-- <el-tag type="success" v-if="scope.row.status==true">可用</el-tag>
                    <el-tag type="danger" v-if="scope.row.status==false">禁用</el-tag> -->
                    <el-tag type="success">可用</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="300">
                <template slot-scope="scope">
                    <el-button @click="onEditProject(scope.row)" size="mini">编辑</el-button>
                    <el-button type="danger" size="mini">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="新增项目" :visible.sync="addDialogVisiable">
            <el-form ref="projectForm" :model="projectForm" label-width="80px" :rules="projectRules">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="projectForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-select v-model="projectForm.type" placeholder="请选择类型">
                        <el-option label="Web" value="web"></el-option>
                        <el-option label="App" value="app"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input type="textarea" v-model="projectForm.description" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisiable = false">取 消</el-button>
                <el-button type="primary" @click="onSubmitAddProject" :loading="addProjectButtonLoading">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">

    export default {
        name: "ProjectList",
        data() {
            return {
                projects: [],
                addDialogVisiable: false,
                addProjectButtonLoading: false,
                dialogType: "add",
                projectForm: {
                    name: "",
                    type: "",
                    description: ""
                },
                projectRules: {
                    name: [
                        {required: true, message: "请输入手机号码！", trigger: "blur"}
                    ],
                    type: [
                        {required: true, message: "请选择项目类型！", trigger: "blur"}
                    ]
                }
            }
        },
        components: {},
        mounted() {
            // this.$http.getProjectList().then(res => {
            //     const projects = res.data
            //     this.projects = projects
            // })
        },
        methods: {
            initProjectForm() {
                this.projectForm = {
                    name: "",
                    type: "",
                    description: ""
                }
            },
            onAddProjectButtonClick() {
                this.dialogType = 'add';
                this.addDialogVisiable = true;
            },
            onEditProject(project) {
                this.projectForm = {
                    name: project.name,
                    type: project.type,
                    description: project.description,
                    id: project.id
                }
                this.addDialogVisiable = true
                this.dialogType = "edit"
            },
            onSubmitAddProject() {
                this.$refs['projectForm'].validate(valid => {
                    if (!valid) {
                        return
                    }
                    this.addProjectButtonLoading = true
                    if (this.dialogType == 'add') {
                        // this.$http.addProject(this.projectForm).then(res => {
                        //     this.addProjectButtonLoading = false
                        //     if (res && res.status == 201) {
                        //         const project = res.data
                        //         this.projects.push(project)
                        //         this.addDialogVisiable = false
                        //         this.initProjectForm()
                        //         this.$message.success("恭喜！项目创建成功！")
                        //     }
                        // })
                    } else {
                        // this.$http.editProject(this.projectForm.id, this.projectForm).then(res => {
                        //     this.addProjectButtonLoading = false
                        //     if (res) {
                        //         this.addDialogVisiable = false
                        //         this.initProjectForm()
                        //         this.$message.success("恭喜！项目修改成功！")
                        //         const project = res.data
                        //         let index = 0
                        //         for (let loop_project of this.projects) {
                        //             console.log(loop_project);
                        //             console.log('xxxxx');
                        //             if (loop_project.id == project.id) {
                        //                 Vue.set(this.projects, index, project)
                        //                 break
                        //             }
                        //             index++
                        //         }
                        //     }
                        // })
                    }
                })
            }
        }
    }
</script>

<style scoped lang='scss'>
    .top-group {
        padding: 10px 0;
        text-align: right;
    }
</style>