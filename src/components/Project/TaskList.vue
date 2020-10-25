<template>
    <div>
        <div class="top-group">
            <el-button type="primary" icon="el-icon-plus" @click="addTask">新增任务</el-button>
        </div>
        <el-table :data="project.task_list" style="width: 100%">
            <el-table-column prop="name" label="名称" width="180">
            </el-table-column>
            <el-table-column prop="case.name" label="用例" width=100>
            </el-table-column>
            <el-table-column label="表达式" prop="expr">
            </el-table-column>
            <el-table-column label="状态" width="100" prop="status">
                <template slot-scope="scope">
                    <span v-if="scope.row.status === 1">停止</span>
                    <span v-if="scope.row.status === 2">启动</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="300">
                <template slot-scope="scope">
                    <el-button @click="onEditTask(scope.row)" size="mini">编辑</el-button>
                    <el-button @click="onChangeStatus(scope.row)" size="mini" type="primary">
                        <template v-if="scope.row.status === 1">停止</template>
                        <template v-if="scope.row.status === 2">启动</template>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="新增任务" :visible.sync="dialogVisible">
            <el-form ref="taskForm" :model="taskForm" label-width="80px" :rules="taskRules">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="taskForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用例" prop="case_id">
                    <el-select v-model="taskForm.case_id" placeholder="请选择用例">
                        <el-option v-for="caseobj in project.case_list" :label="caseobj.name" :value="caseobj.id"
                                   :key="caseobj.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="表达式" prop="expr">
                    <el-input type="textarea" v-model="taskForm.expr" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmitAddTask">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "TaskList",
        props: ["project"],
        data() {
            return {
                dialogVisible: false,
                dialogIsEditing: false,
                taskForm: {
                    name: "",
                    case_id: "",
                    expr: ""
                },
                taskRules: {
                    name: [{required: true, trigger: "blur", message: "请输入任务名称！"}],
                    case_id: [{required: true, trigger: "change", message: "请选择用例！"}],
                    expr: [{required: true, trigger: "blur", message: "请输入任务表达式！"}],
                },
            }
        },
        methods: {
            addTask() {
                this.dialogVisible = true;
            },
            onSubmitAddTask() {
                this.$refs['taskForm'].validate(valid => {
                    if (!valid) {
                        return
                    }
                    const params = JSON.parse(JSON.stringify(this.taskForm))
                    params.project_id = this.project.id;
                    if (this.dialogIsEditing) {
                        this.$http.editTask(params.id, params).then(res => {
                            const theTask = res.data;
                            for(let task of this.project.task_list) {
                               if (task.id === theTask.id){
                                   task.name = theTask.name;
                                   task.case_id = theTask.id;
                                   task.expr = theTask.expr;
                               }
                               break
                            }
                            this.$message.success("任务更新完成");
                            this.dialogVisible = false;
                        })
                    } else {
                        this.$http.addTask(params).then(res => {
                            const task = res.data;
                            this.project.task_list.push(task);
                            this.$message.success();
                            this.dialogVisible = false;
                        })
                    }
                })
            },
            onEditTask(task) {
                this.taskForm.name = task.name;
                this.taskForm.case_id = task.case.id;
                this.taskForm.expr = task.expr;
                this.taskForm.id = task.id;
                this.dialogIsEditing = true;
                this.dialogVisible = true
            },
            onChangeStatus(task) {
                const task_status = task.status === 1 ? 2 : 1;
                this.$http.changeTaskStatus(task.id, task_status).then(res => {
                    const correct_task = res.data;
                    for (let task of this.project.task_list) {
                        if (task.id === correct_task.id) {
                            task.status = task_status;
                            break;
                        }
                    }
                    const msg = task_status === 1 ? "任务已经启动" : "任务已经停止"
                    this.$message.success(msg);
                })

            }
        }
    }
</script>

<style scoped>

</style>