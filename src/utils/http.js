import axios from "axios"
import auth from "./auth"

const BASE_URL = "http://127.0.0.1:8000"

// const BASE_URL = "http://118.24.0.251:8000"


class Http {
    constructor() {
        this.http = axios.create({
            baseURL: BASE_URL
        })

        // 设置拦截器，用来添加JWT Token的
        this.http.interceptors.request.use(config => {
            const token = auth.token;
            if (token && token != 'undefined') {
                config.headers.common.Authorization = "JWT " + token
            }
            return config
        })

        // 设置拦截器，如果返回403，跳转到登陆页面
        // 403是没有权限访问这个接口
        this.http.interceptors.response.use(null, err => {
            if (err && err.response && err.response.status == 403) {
                auth.clearUserToken()
            }
            return Promise.reject(err);
        })
    }

    login(params) {
        const url = "/auth/login"
        return this.http.post(url, params)
    }

    getUserList() {
        const url = '/auth/user'
        return this.http.get(url)
    }

    editUser(params) {
        const url = "/auth/user"
        return this.http.put(url, params)
    }

    addProject(params) {
        const url = "/api/project"
        return this.http.post(url, params)
    }

    getProjectList() {
        const url = "/api/project"
        return this.http.get(url)
    }

    editProject(project_id, params) {
        const url = "/api/project/" + project_id
        return this.http.put(url, params)
    }

    deleteProject(project_id) {
        const url = "/api/project/" + project_id
        return this.http.delete(url)
    }

    getProjectDetail(project_id) {
        const url = "/api/project/" + project_id
        return this.http.get(url)
    }

    addHost(params) {
        const url = "/api/host"
        return this.http.post(url, params)
    }

    deleteHost(host_id) {
        const url = "/api/host/" + host_id
        return this.http.delete(url)
    }

    editHost(host_id, params) {
        const url = "/api/host/" + host_id
        return this.http.put(url, params)
    }

    addApi(params) {
        const url = "/api/api"
        return this.http.post(url, params)
    }

    deleteApi(api_id) {
        const url = "/api/api/" + api_id
        return this.http.delete(url)
    }

    editApi(api_id, params) {
        const url = "/api/api/" + api_id
        return this.http.put(url, params)
    }

    runApi(id) {
        const url = "/api/run/api/" + id
        return this.http.post(url)
    }

    addCase(params) {
        const url = "/api/case"
        return this.http.post(url, params)
    }

    editCase(id, params) {
        const url = "/api/case/" + id
        return this.http.put(url, params)
    }

    runCase(id) {
        const url = "/api/run/case/" + id
        return this.http.post(url)
    }

    getApiRecords(project_id) {
        const url = "/api/records?project_id=" + project_id + "&type=api"
        return this.http.get(url)
    }

    getCaseRecords(project_id) {
        const url = "/api/records?project_id=" + project_id + "&type=case"
        return this.http.get(url)
    }

}

export default new Http()