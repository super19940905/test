<template>
    <div>
        <div class="img_back">
            <img src="../assets/login.jpg" width="100%" height="100%"/>
        </div>
        <div class="login_border">
            <div class="title_name">
                <h3>欢迎登陆</h3>
            </div>
            <div class="from_input">
                <Form ref="formValidate" :model="formValidate" :label-width="15" :rules="ruleValidate">
                    <FormItem style="margin-right:13px" prop="account">
                        <Input v-model="formValidate.account" placeholder="请输入账号">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem style="margin-right:13px" prop="password" >
                        <Input v-model="formValidate.password" placeholder="请输入密码" type="password">
                            <Icon type="ios-lock-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <div style="text-align:center;margin-right:13px">
                        <FormItem>
                            <Button type="primary" long @click="handleSubmit('formValidate')" v-on:keyup.13="handleSubmit('formValidate')" :loading="loading">登陆</Button>
                        </FormItem>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
import {loginApi} from '../axios/api'
export default {
    data () {
        return {
            formValidate: {
                account: '',
                password: ''
            },
            ruleValidate: {
                account: [
                    {required: true, message: '账号不能为空', trigger: 'blur'},
                    {type: 'string', max: 5, message: '不能超过5个字符', trigger: 'blur'},
                    {type: 'string', pattern: /[a-zA-Z]/, message: '请输入英文字母', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '密码不能为空', trigger: 'blur'},
                    {type: 'string', max: 10,message: '不能超过10个字符', trigger: 'blur'},
                    {type: 'string', pattern: /^\d+$/, message: '请输入数字',trigger: 'blur'}
                ]
            },
            loading: false
        }
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let data = {
                        username: this.formValidate.account,
                        password: this.formValidate.password
                    }
                    loginApi(data).then(res => {
                        this.loading = true
                        if(res.data == true && res.status == 200) {
                            this.$Message.success('登陆成功')
                            //this.$router.push('/personnelForm')
                            this.$router.replace({path:'/personnelForm'})
                            this.loading = false
                        }else {
                            this.$Message.error('账号密码错误')
                            this.loading = false
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                }else {
                
                }
            })
        }
    }
}
</script>
<style scoped>
.img_back {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px
}
.login_border {
    border: 1px solid #a9a9a9;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    width: 300px;
}
.title_name {
    margin: 15px 15px 15px 15px;
    padding-bottom: 10px;
    color: #000000;
    font-size: 14px;
    border-bottom: 1px solid #a9a9a9
}
</style>