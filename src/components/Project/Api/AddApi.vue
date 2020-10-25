<template>
<div class="">
  <div class="top-group">
    <el-link type="default" icon="el-icon-back" :underline="false" @click="onGotoApiList">接口列表</el-link>
    <el-button-group>
      <el-button type="primary" @click="onSave">保存</el-button>
      <el-button type="default" @click="onCancel">取消</el-button>
    </el-button-group>
  </div>

  <div class="main-group">
    <el-form ref="form" :model="form" :inline="true" label-width="80px" :rules="rules">
      <el-collapse v-model="activeNames" class='collapse-group'>
        <el-collapse-item title="接口" name="1">
          <el-form-item label="接口名" prop="name">
            <el-input v-model="form.name" placeholder="请输入接口名称"></el-input>
          </el-form-item>
          <el-form-item label="请求方法" prop="http_method">
            <el-select v-model="form.http_method" placeholder="请选择请求方法">
              <el-option label="GET" value="GET"></el-option>
              <el-option label="POST" value="POST"></el-option>
              <el-option label="DELETE" value="DELETE"></el-option>
              <el-option label="PUT" value="PUT"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="域名" prop="host">
            <el-select v-model="form.host" placeholder="请选择域名">
              <template v-if="project && project.host_list">
                <el-option v-for="host in project.host_list" :label="host.name" :value="host.id" :key="host.name"></el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="path" prop="path">
            <el-input v-model="form.path" placeholder="请输入url的path"></el-input>
          </el-form-item>
        </el-collapse-item>

        <el-collapse-item title="请求头部" name="2">
          <el-table
            :data="form.headers"
            style="width: 100%">
            <el-table-column
              prop="name"
              label="key"
              width=200>
              <template slot-scope="scope">
                <el-select placeholder="head类型" v-model="scope.row.name" :filterable="true">
                    <el-option v-for="item in headers" :key="item" :label="item" :value="item"></el-option> 
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              prop="value"
              label="value"
              width="600">
              <template slot-scope="scope">
                <el-input v-model="scope.row.value" :value="scope.row.value" placeholder="请输入内容"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="200">
              <template slot-scope="scope">
                <el-button icon="el-icon-delete" type="danger" size="mini" @click="onDeleteHeader(scope.$index)" v-if="form.headers.length>1"></el-button>
                <el-button icon="el-icon-plus" type="primary" size="mini" v-if="scope.$index===form.headers.length-1" @click="onAddHeader"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>

        <el-collapse-item title="请求参数" name="3">
          <el-table
            :data="form.data"
            style="width: 100%">
            <el-table-column
              prop="name"
              label="参数名"
              width=200>
              <template slot-scope="scope">
                <el-input v-model.trim="scope.row.name" :value="scope.row.name" placeholder="请输入参数名"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="value"
              label="参数值"
              width="600">
              <template slot-scope="scope">
                <el-input v-model.trim="scope.row.value" :value="scope.row.value" placeholder="请输入参数值"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="200">
              <template slot-scope="scope">
                <el-button icon="el-icon-delete" type="danger" size="mini" @click="onDeleteBody(scope.$index)" v-if="form.data.length>1"></el-button>
                <el-button icon="el-icon-plus" type="primary" size="mini" v-if="scope.$index===form.data.length-1" @click="onAddBody"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>

        <el-collapse-item title="期望结果" name="4">
          <el-form-item label="状态码" prop="expect_code">
            <el-select v-model="form.expect_code" placeholder="请选择状态码">
              <el-option v-for="status_code in status_codes" :label="status_code" :value="status_code" :key="status_code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="期望内容" prop="expect_content">
            <el-input v-model="form.expect_content" type="textarea" placeholder="请输入期望内容" rows="5" cols="40"></el-input>
          </el-form-item>
        </el-collapse-item>

        <el-collapse-item title="描述" name="5">
          <el-input class="desc-input" v-model="form.description" type="textarea" placeholder="请输入描述信息！"></el-input>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
import apipage from "./apipage"
export default {
  name: "AddApi",
  props: ['project','api'],
  data() {
    return {
      activeNames: ['1','2','3','4','5'],
      form: {
        name: "",
        host: "",
        http_method: "",
        path: "",
        headers: [{name:"",value:""}],
        data: [{name:"",value:""}],
        description: "",
        expect_code: "",
        expect_content: ""
      },
      rules: {
        name: [{required: true,trigger:"blur",message: "请输入接口名称！"}],
        host: [{required: true,trigger:"change",message: "请选择host！"}],
        http_method: [{required: true,trigger:"change",message: "请选择http method！"}],
        path: [{required: true,trigger:"blur",message: "请输入PATH！"}],
        expect_code: [{required: true,trigger:"change",message: "请选择状态码！"}]
      },
      headers: ['Accept',
         'Accept-Charset', 
         'Accept-Encoding', 
         'Accept-Language', 
         'Accept-Ranges', 
         'Authorization', 
         'Cache-Control', 
         'Connection', 
         'Cookie', 
         'Content-Length', 
         'Content-Type', 
         'Content-MD5', 
         'Date', 
         'Expect', 
         'From', 
         'Host', 
         'If-Match', 
         'If-Modified-Since', 
         'If-None-Match', 
         'If-Range', 
         'If-Unmodified-Since', 
         'Max-Forwards', 
         'Origin', 
         'Pragma', 
         'Proxy-Authorization', 
         'Range', 
         'Referer', 
         'TE', 
         'Upgrade', 
         'User-Agent', 
         'Via'
      ],
      status_codes: ['200','201','202','203','204','301','302','400','401','403','404','405','406','407','408','500','502']
    }
  },
  components: {},
  mounted(){
    if(this.api){
      let headers = []
      let data = []
      if(this.api.headers){
        headers = JSON.parse(this.api.headers)
      }
      if(this.api.data){
        data = JSON.parse(this.api.data)
      }
      let form = {
        id: this.api.id,
        name: this.api.name,
        host: this.api.host,
        http_method: this.api.http_method,
        path: this.api.path,
        headers: headers.length>0?headers:[{name:"",value:""}],
        data: data.length>0?data:[{name:"",value:""}],
        description: this.api.description,
        expect_code: this.api.expect_code,
        expect_content: this.api.expect_content
      }
      this.form = form
      console.log(this.form);
    }
  },
  methods: {
    onGotoApiList(){
      this.$emit("page-changed",apipage.API_LIST)
    },
    onSave(){
      this.$refs['form'].validate(valid => {
        if(!valid){
          return;
        }
        const params = JSON.parse(JSON.stringify(this.form))
        const headers = []
        const formdata = []
        for(let header of params.headers){
          if(header.name && header.value){
            headers.push(header)
          }
        }
        for(let data of params.data){
          if(data.name && data.value){
            formdata.push(data)
          }
        }
        params.headers = JSON.stringify(headers)
        params.data = JSON.stringify(formdata)
        params.project_id = this.project.id
        this.$loading.show()
        if(this.form.id){
          console.log('params');
          console.log(params);
          params.host_id = params.host.id
          this.$http.editApi(this.form.id,params).then(res => {
            this.$loading.hide()
            this.$message.success()
            const api_model = res.data
            for(let index=0;index<this.project.api_list.length;index++){
              let api = this.project.api_list[index]
              if(api.id === api_model.id){
                this.project.api_list[index] = api_model
              }
            }
            this.$emit("page-changed",apipage.API_LIST)
          })
        }else{
          params.host_id = params.host
          this.$http.addApi(params).then(res => {
            this.$loading.hide()
            const api = res.data
            this.project.api_list.push(api)
            this.$message.success()
            this.$emit("page-changed",apipage.API_LIST)
          })
        }
      })
    },
    onCancel(){},
    onDeleteHeader(index){
      this.form.headers.splice(index,1)
    },
    onAddHeader(){
      this.form.headers.push({name:"",value:""})
    },
    onDeleteBody(index){
      this.form.data.splice(index,1)
    },
    onAddBody(){
      this.form.data.push({name:"",value:""})
    }
  }
}
</script>

<style scoped lang='scss'>
.top-group{
  padding: 20px 0px;
  display: flex;
  justify-content: space-between;
}
</style>

<style scoped>
.collapse-group >>> .el-collapse-item{
  padding: 0 20px;
  background: #fff;
}
</style>