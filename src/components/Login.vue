<template>
    <div class="">
        <div class="login-container">
            <el-row>
                <el-col :span="8" :offset="8">
                    <h1 class='page-title'>API测试平台</h1>
                    <el-form ref="loginForm" :model="loginForm" label-width="80px" class='login-form' :rules="rules">
                        <el-form-item label="手机" prop="username">
                            <el-input v-model="loginForm.username"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="loginForm.password" type="password"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">登录</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "",
        data() {
            let validateTel = (rule, value, callback) => {
                if (!value.match(/^1[0-9]{10}$/)) {
                    callback(new Error("请输入正确的手机号码！"))
                } else {
                    callback()
                }
            }
            return {
                loginForm: {
                    username: "",
                    password: ""
                },
                rules: {
                    username: [
                        {required: true, message: "请输入手机号码！", trigger: "blur"},
                        {validator: validateTel, trigger: "blur"}
                    ],
                    password: [
                        {required: true, message: "请输入密码！", trigger: "blur"},
                        {min: 6, max: 20, message: "密码字符应该在6-20之间！", trigger: "blur"},
                    ]
                }
            }
        },
        components: {},
        methods: {
            onSubmit() {
                this.$refs['loginForm'].validate(valid => {
                    if (!valid) {
                        return;
                    }
                    console.log(this.loginForm)
                    this.$http.login(this.loginForm).then(res => {
                        const data = res.data
                        const token = data.token;
                        const user = data.user
                        this.$auth.setUserToken(user, token)
                        this.$router.push('/')
                    })
                })
            }
        }
    }
</script>
<style lang='scss'>
    body {
        background-color: #eee;
    }

    .login-container {
        padding-top: 80px;

        .page-title {
            text-align: center;
        }

        .login-form {
            padding-top: 40px;
        }
    }
</style>