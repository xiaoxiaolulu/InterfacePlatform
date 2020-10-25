<template>
<div class="">
  <h1 style="padding: 10px 0">设置</h1>
  <div class="form-group">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules" label-position="left">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="telephone">
        <el-input v-model="form.telephone" placeholder="请输入手机号码"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-upload"
          :action="upload_action"
          :header="headers"
          :show-file-list="false"
          :on-success="onUploadSuccess"
          :before-upload="onBeforeUpload"
        >
          <img v-if="form.avatar" :src="form.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-upload-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button type="default" @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "Settings",
  data() {
    return {
      form: {
        username: "",
        email: "",
        telephone: "",
        avatar: ""
      },
      headers: {
        'Authorization': "JWT " + this.$auth.token
      },
      upload_action: "http://127.0.0.1:8000/auth/upload",
      rules:{
        username: [{required: true,trigger:"blur",message:"请输入用户名！"}],
        email: [{required: true,trigger:"blur",message:"请输入邮箱！"}],
        telephone: [{required: true,trigger:"blur",message:"请输入手机号码！"}],
      }
    }
  },
  components: {},
  mounted(){
    const user = this.$auth.user
    let form = {
      username:user.username,
      email:user.email,
      telephone:user.telephone,
      avatar: user.avatar
    }
    this.form = form
  },
  methods: {
    onUploadSuccess(res,file){
      console.log(file)
      this.form.avatar = res.picture
    },
    onBeforeUpload(file){
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        alert('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        alert('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    onSubmit(){
      this.$refs['form'].validate(valid => {
        if(!valid){
          return
        }
        this.$loading.show()
        this.$http.editUser(this.form).then(res => {
          this.$loading.hide()
          const user = res.data
          this.$auth.setUser(user)
          this.$message.success()
        })
      })
    },
    onCancel(){}
  }
}
</script>

<style scoped lang='scss'>
.form-group{
  width: 400px;
}

.avatar-upload{
  .avatar {
    width: 133px;
    height: 133px;
    display: block;
  }
  .avatar-upload-icon{
    font-size: 28px;
    color: #8c939d;
    width: 133px;
    height: 133px;
    line-height: 133px;
    text-align: center;
  }
}
</style>

<style scoped>
.avatar-upload >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-upload >>> .el-upload:hover {
  border-color: #409eff;
}
</style>