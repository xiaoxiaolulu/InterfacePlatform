<template>
    <div class="">
        <el-container class="frame-container">
            <el-header class="header">
                <a href="/" class='brand'><strong>API</strong>测试平台</a>
                <div class="header-content">
                    <ul class="menu-list">
                        <li :class="activeIndex===0?'active':''">
                            <router-link to="/">首页</router-link>
                        </li>
                        <li :class="activeIndex===1?'active':''">
                            <router-link to="/project">项目管理</router-link>
                        </li>
                        <li :class="activeIndex===2?'active':''">
                            <router-link to="/users">成员管理</router-link>
                        </li>
                    </ul>
                    <div class="signout">
                        <el-dropdown>
            <span class="el-dropdown-link">
              <img class="avatar-img" :src="$auth.user.avatar || 'http://127.0.0.1:8000/static/image/default.jpg'"
                   alt=""/>
              {{$auth.user.username}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>
                                    <router-link to="/settings">设置</router-link>
                                </el-dropdown-item>
                                <el-dropdown-item @click.native="onLogout">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
            </el-header>
            <el-container>
                <el-main class="main">
                    <router-view></router-view>
                </el-main>
                <el-footer class="footer">这是Footer</el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "Frame",
        data() {
            return {
                activeIndex: -1
            }
        },
        components: {},
        methods: {
            onLogout() {
                this.$auth.clearUserToken()
                this.$router.replace("/login")
            }
        },
        watch: {
            "$route": function (to, from) {
                console.log(from)
                if (to.name == 'index') {
                    this.activeIndex = 0
                } else if (to.path.indexOf("project") > 0) {
                    this.activeIndex = 1
                } else if (to.path.indexOf("users") > 0) {
                    this.activeIndex = 2
                } else {
                    this.activeIndex = -1
                }
            }
        }
    }
</script>

<style scoped lang='scss'>
    .frame-container {
        height: 100vh;
        $header-height: 60px;

        .header {
            height: $header-height;
            background: #00a65a;
            display: flex;

            .brand {
                width: 200px;
                margin-left: -20px;
                background-color: #008d4c;
                font-size: 20px;
                color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .header-content {
                flex: 1;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-left: 20px;
                color: #fff;

                .menu-list {
                    display: flex;
                    justify-content: flex-start;
                    list-style: none;
                    height: $header-height;
                    line-height: $header-height;

                    li {
                        padding: 0 20px;
                        color: #eee;
                        cursor: pointer;

                        a {
                            color: #fff;
                        }
                    }

                    .active {
                        // background-color: #008d4c;
                        border-bottom: 4px solid #fff;
                        color: #fff;
                    }
                }

                .signout {
                    cursor: pointer;
                }
            }
        }

        .aside {
            background-color: #545c64;

            .el-menu {
                .is-active {
                    background-color: #434a50 !important;
                }

                .iconfont {
                    margin-right: 5px;
                }
            }
        }

        .main {
            padding: 20px 40px;
        }

        .footer {
            background: gray;
        }

        .el-dropdown-link {
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .avatar-img {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                margin-right: 10px;
            }

            a {
                color: #fff;
            }
        }
    }
</style>

<style scoped>
    .aside >>> .el-menu {
        border-right: none;
    }

    .el-menu >>> .el-submenu__title i {
        color: #fff;
    }

    .el-menu >>> .el-submenu__title {
        font-size: 16px;
    }

    .el-menu >>> .el-menu-item {
        font-size: 16px;
        color: #fff;
    }

    .el-menu >>> .el-menu-item i {
        font-size: 16px;
        color: #fff;
    }
</style>