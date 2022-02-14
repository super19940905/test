<template>
    <div class="layout">
        <Layout>
            <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                <div class="title_left">
                    道桥管理系统
                </div>
                <Menu :active-name="active" theme="dark" width="auto" :class="menuitemClasses">
                    <MenuItem :name="item.name" :to="item.to" v-for="item in leftList" :key="item.id" @click.native="leftClick(item.id,item.name)">
                        <Icon :type="item.iso"></Icon>
                        <span>{{item.title}}</span>
                    </MenuItem>
                </Menu>
            </Sider>
            <Layout>
                <Header :style="{padding: 0}" class="layout-header-bar">
                    <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
                </Header>
                <div class="exitLogin">
                    <a href="#" v-on:click="loginClick">退出登陆</a>
                </div>
                <!-- 导航拦 -->
                <Content :style="{padding: '0 16px 16px'}">
                    <Breadcrumb :style="{margin: '5px 0'}">
                        <Tag type="dot" checked checkable closable :color="item.color" v-for="item in list" :key="item.id" @on-close="remove_title(item.id)" @on-change="handleClick(item.id,item.name)">{{item.title}}</Tag>
                    </Breadcrumb>
                    <!--  表格 -->
                    <router-view></router-view>   
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script>
export default {
    data () {
        return {
            isCollapsed: false,
            leftList: [
                {
                    id: '1',
                    title: '人员',
                    color: 'primary',
                    name: '/personnelForm',
                    to: '/personnelForm',
                    iso: 'md-person'
                },
                {
                    id: '2',
                    title: '合同',
                    color: 'default',
                    name: '/developer',
                    to: '/developer',
                    iso: 'ios-list-box-outline'
                },
                {
                    id: '3',
                    title: '开发者',
                    color: 'default',
                    name: '/copyright',
                    to: '/copyright',
                    iso: 'md-nuclear'
                }
            ],
            list: [
                {
                    id: '1',
                    title: '人员',
                    color: 'primary',
                    name: '1-1'
                }
            ],
            active: this.$route.path
        }
    },
    methods: {
        //下载文档
        handleClick(index) {

        },
        //删除文档
        remove_title(index) {

        },
        leftClick() {
            
        },
        //退出登陆
        loginClick() {
            this.$router.push('/login')
        },
        collapsedSider () {
            this.$refs.side1.toggleCollapse();
        }
    },
    computed: {
        //改变左边导航拦图标
        rotateIcon () {
            return [
                'menu-icon',
                this.isCollapsed ? 'rotate-icon' : ''
                
            ];
        },
        //改变左边导航拦图标
        menuitemClasses () {
            return [
                'menu-item',
                this.isCollapsed ? 'collapsed-menu' : ''
            ]
        },
    },
    watch: {
        '$toute' () {
            this.active = this.this.$route.path
        }
    }
}
</script>

<style scoped>
.title_left{
    height: 63px;
    color: #000000;
    text-align: center;
    line-height: 63px;
    font-size: 30px;
    background-color: rgb(81,90,110)
}
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden
}
.layout-header-bar{
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1)
}
.layout-logo-left{
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto
}
.menu-icon{
    transition: all .3s;
}
.rotate-icon{
    transform: rotate(-90deg);
}
.menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s
}
.menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px
}
.collapsed-menu span{
    width: 0px;
    transition: width .2s ease
}
.collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px
}
.exitLogin{
    position: absolute;
    right: 35px;
    font-size: 15px;
    top: 20px;
}
</style>