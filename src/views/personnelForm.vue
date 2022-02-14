<template>
    <div>
        <Card>
            <!-- 新增查询 -->
            <div class="titleClass">
                <Button type="primary" @click="modal1 = true">新增</Button>
                <Input v-model="inputText" size="small" placeholder="请输入" style="width:150px" suffix="ios-search"/>
            </div>
            <!-- 新增弹框 -->
            <Modal title="新增" v-model="modal1" class-name="vertical-center-modal" :scrollable="true" :mask-closable="false">
                <div class="ivu-modalBody">
                    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                        <FormItem label="姓名" prop="name">
                            <Input v-model="formValidate.name" placeholder="请输入"></Input>
                        </FormItem>
                        <FormItem label="身份证" prop="id">
                            <Input v-model="formValidate.id" placeholder="请输入"></Input>
                        </FormItem>
                        <FormItem label="证书名称" prop="account_title">
                            <Input v-model="formValidate.account_title" placeholder="请输入"></Input>
                        </FormItem>
                        <FormItem label="等级" prop="grade">
                            <Input v-model="formValidate.grade" placeholder="请输入"></Input>
                        </FormItem>
                        <FormItem label="证书编号" prop="number">
                            <Input v-model="formValidate.number" placeholder="请输入"></Input>
                        </FormItem>
                        <FormItem label="起始时间" prop="startTime">
                            <Input v-model="formValidate.startTime" placeholder="请输入"></Input>
                        </FormItem>
                        <FormItem label="有效期" prop="effectiveTime">
                            <Input v-model="formValidate.effectiveTime" placeholder="请输入"></Input>
                        </FormItem>
                        <FormItem label="备注" prop="remarks">
                            <Input v-model="formValidate.remarks" placeholder="请输入"></Input>
                        </FormItem>
                        <FormItem label="图片" prop="imgs">
                            <div class="demo-upload-list" v-for="item in defaultList" :key="item.id">
                                <template>
                                    <img :src="item.url">
                                    <div class="demo-upload-list-cover">
                                        <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                                        <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                                    </div>
                                </template>
                            </div>
                            <Upload ref="upload" v-model="formValidate.imgs" action="" :show-upload-list="false" :format="['jpg','jpeg','png','gif']" :before-upload="handleBeforeUpload" multiple type="drag" style="display: inline-block;width:58px;">
                                <div style="width: 58px;height:58px;line-height: 58px;">
                                    <Icon type="ios-camera" size="20"></Icon>
                                </div>
                            </Upload>
                            <Modal title="查看图片" v-model="visible" footer-hide class-name="vertical-center-modal">
                                <img :src="Img" style="width: 100%">
                            </Modal>
                        </FormItem>
                    </Form>
                </div>
                <div slot="footer" style="text-align:center">
                    <Button type="primary" size="large" @click="Submit('formValidate')">提交</Button>
                    <Button size="large" @click="cancel('formValidate')">取消</Button>
                </div>
            </Modal>
            <!-- 表格 -->
            <Table border :loading="loading" :columns="columns7" :data="data6" highlight-row :height="tableHeight" ref="table">
                <template slot-scope="{ row }" slot="name">
                    <strong>{{ row.name }}</strong>
                </template>
                <template slot-scope="{index}" slot="action">
                    <Button type="info" size="small" style="margin-right: 5px" @click="edit(index)">编辑</Button>
                    <Button type="primary" size="small" style="margin-right: 5px" @click="download(index)">下载</Button>
                    <Button type="error" size="small" @click="remove(index)">删除</Button>
                </template>
            </Table>
            <div class="page">
                <Page :total="40" show-elevator show-total/>
            </div>
        </Card>
    </div>
</template>

<script>
import {developerApi} from '../axios/api'
export default {
    data () {
        return {
            formValidate: {
                name: '',
                id: '',
                account_title: '',
                grade: '',
                number: '',
                startTime: '',
                effectiveTime: '',
                remarks: '',
                imgs: ''
            },
            ruleValidate: {
                name: [
                    {required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                id: [
                    {required: true, message: '请输入身份证', trigger: 'blur' }
                ],
                account_title: [
                    {required: true, message: '请输入证书名称', trigger: 'blur'}
                ],
                grade: [
                    {required: true, message: '请输入等级', trigger: 'blur'}
                ],
                number: [
                    {required: true, message: '请输入证书编号', trigger: 'blur'}
                ],
                startTime: [
                    {required: true, message: '请输入起始时间', trigger: 'blur'}
                ],
                effectiveTime: [
                    {required: true, message: '请输入有效期', trigger: 'blur'}
                ],
                imgs: [
                    {required: true, message: '请上传图片', trigger: 'blur'}
                ]
            },
            tableHeight: 0,
            data6: [
                {
                    name: '鲍世民',
                    id: '3323124341243242412',
                    sex: '男',
                    age: '18',
                    account_title: '543',
                    grade: '978',
                    number: '423',
                    startTime: '867',
                    effectiveTime: '645',
                    remarks: '333'
                }
            ],
            columns7: [
                {
                    title: '姓名',
                    key: 'name',
                    fixed: 'left',
                    align: 'center'
                },
                {
                    title: '身份证',
                    key: 'id',
                    width: 190,
                    align: 'center'
                },
                {
                    title: '性别',
                    key: 'sex',
                    align: 'center'
                },
                {
                    title: '年龄',
                    key: 'age',
                    align: 'center'
                },
                {
                    title: '证书名称',
                    key: 'account_title',
                    align: 'center'
                },
                {
                    title: '等级',
                    key: 'grade',
                    align: 'center'
                },
                {
                    title: '注册证书编号',
                    key: 'number',
                    align: 'center'
                },
                {
                    title: '起始时间',
                    key: 'startTime',
                    align: 'center'
                },
                {
                    title: '有效期',
                    key: 'effectiveTime',
                    align: 'center'
                },
                {
                    title: '备注',
                    key: 'remarks',
                    align: 'center'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 170,
                    align: 'center',
                    fixed: 'right'
                }
            ],
            inputText: '',
            modal1: false,
            visible: false,
            defaultList: [],
            Img: '',
            file: [],
            loading: false
        }
    },
    methods: {
        //新增按钮
        Submit(name) {
            let imgAttribute = this.file.map(o=>{return{certificateNumber:o.lastModified,imgBinary:o.lastModifiedDate,name:o.name,remark:o.size,type:o.type,url:o.webkitRelativePath}})
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let data = {
                        cname: this.formValidate.name,
                        idCard: this.formValidate.id,
                        certificateName: this.formValidate.account_title,
                        certificateLevel: this.formValidate.grade,
                        certificateNumber: this.formValidate.number,
                        certificateBeginTime: this.formValidate.startTime,
                        certificateEffectiveTime: this.formValidate.effectiveTime,
                        remark: this.formValidate.remarks,
                        certificateImgs: imgAttribute
                    }
                    developerApi(data).then(res => {
                        console.log(res)
                    }).catch(err => {
                        console.log(err)
                    })
                }else{
                
                }
            })
        },
        //取消按钮
        cancel(name) {
            this.modal1 = false
            for(let key in this.formValidate){
                this.formValidate[key] = ''
            }
            this.defaultList = []
            this.file = []
            this.$refs[name].resetFields()
        },
        //编辑按钮
        edit() {

        },
        //下载按钮
        download() {

        },
        //删除按钮
        remove() {

        },
        //图片上传前
        handleBeforeUpload(file) {
            let fileName = file.name.split(".")
            if(fileName[fileName.length - 1] == "png" || fileName[fileName.length - 1] == "JPG" || fileName[fileName.length - 1] == "gif" || fileName[fileName.length - 1] == "jpeg"){
                this.file.push(file)
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => {
                    const _base64 = reader.result
                    let person = new Object()
                    person.url = _base64
                    person.name = file.name
                    this.defaultList.push(person)
                    this.formValidate.imgs = '1'
                }
                console.log(this.defaultList)
                console.log(this.file)
            }else{
                this.$Message.info("图片格式不正确,请上传正确的图片格式")
            }
            return false
        },
        //查看图片
        handleView(url) {
            this.visible = true
            this.Img = url
        },
        //删除图片
        handleRemove(data) {
            for(let i=0;i<this.defaultList.length;i++){
                if(this.defaultList[i].name == data.name){
                    this.defaultList.splice(i,1)
                }
            }
            for(let i=0;i<this.file.length;i++){
                if(this.file[i].name == data.name){
                    this.file.splice(i,1)
                }
            }
            if(this.defaultList.length == 0) {
                console.log(this.defaultList.length)
                this.formValidate.imgs = ''
            }
        }
    },
    mounted () {
        //表格自适应
        this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 155
    }
}
</script>
<style>
.vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;
}
.ivu-modal {
    top: 0;
}
.titleClass {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}
.ivu-modalBody {
    height: 400px;
    overflow: scroll;
}
.demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
}
.demo-upload-list img{
    width: 100%;
    height: 100%;
}
.demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
}
.demo-upload-list:hover .demo-upload-list-cover{
    display: block;
}
.demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
}
.page {
    text-align: right;
    margin-top: 12px;
    color: black;
}
</style>