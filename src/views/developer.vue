<template>
    <div>
        <Card>
            <!-- 新增查询 -->
            <div class="titleClass">
                <div>
                    <Button type="info" @click="addContract">新增合同</Button>
                    <Button type="primary" @click="modal2 = true" class="button_class">收支入明细</Button>
                    <Button type="warning" class="button_class">导出</Button>
                </div>
                <Input v-model="inputText" size="small" placeholder="请输入" style="width:150px" suffix="ios-search"/>
            </div>
            <!-- 新增合同弹出框 -->
            <Modal :title=title v-model="modal1" class-name="vertical-center-modal" :scrollable="true" :mask-closable="false">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="合同名称" prop="Contract_name">
                        <Input v-model="formValidate.Contract_name" placeholder="请输入"></Input>
                    </FormItem>
                    <FormItem label="建设单位" prop="Construction_unit">
                        <Input v-model="formValidate.Construction_unit" placeholder="请输入"></Input>
                    </FormItem>
                    <FormItem label="合同价款" prop="Contract_amount">
                        <Input v-model="formValidate.Contract_amount" placeholder="请输入"></Input>
                    </FormItem>
                    <FormItem label="养护公司" prop="Uncollected_company">
                        <Select v-model="formValidate.Uncollected_company" style="width:100%">
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.title }}</Option>
                        </Select>                    
                    </FormItem>
                </Form>
                <div slot="footer" style="text-align:center">
                    <Button type="primary" size="large" @click="Click('formValidate')">提交</Button>
                    <Button size="large" @click="Cancel('formValidate')">取消</Button>
                </div>
            </Modal>
            <!-- 合同收入支出 -->
            <Detailed :isModal="modal2" @clildByvalue="clildByvalue"></Detailed>
            <!-- 表格 -->
            <Table border :loading="loading" :columns="columns7" :data="data6" highlight-row :height="tableHeight" ref="table">
                <template slot-scope="{ row }" slot="name">
                    <strong>{{ row.name }}</strong>
                </template>
                <template slot-scope="{index}" slot="action">
                    <Button type="info" size="small" style="margin-right: 5px" @click="edit(index)">编辑</Button>
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
import Detailed from './detailed.vue'
export default {
    data () {
        return {
            title: '',
            tableHeight: 0, //初始化table高度
            data6: [
                {
                    Contract_name: '西湖市政一体化综合养护',
                    Construction_unit: '杭州市西湖风景名胜区市政环卫管理中心',
                    Contract_amount: '18143240.86',
                    Received_money: '7871221.89',
                    Expenditure_money: '412321',
                    Uncollected_money: '23212.65',
                    Uncollected_company: '拱墅养护公司'
                },
                {
                    Contract_name: '下城环卫一体化',
                    Construction_unit: '下城区芳州苑道路清理',
                    Contract_amount: '99999.86',
                    Received_money: '777585.89',
                    Expenditure_money: '51461.23',
                    Uncollected_money: '2345452.66',
                    Uncollected_company: '西湖养护公司'
                }
            ],              //table表格数据
            columns7: [
                {
                    title: '合同名称',
                    key: 'Contract_name',
                    fixed: 'left',
                    align: 'center',
                    width: 240,
                },
                {
                    title: '建设单位',
                    key: 'Construction_unit',
                    width: 260,
                    align: 'center'
                },
                {
                    title: '合同价款',
                    key: 'Contract_amount',
                    align: 'center'
                },
                {
                    title: '合同收入价款',
                    key: 'Received_money',
                    align: 'center'
                },
                {
                    title: '合同支出价款',
                    key: 'Expenditure_money',
                    align: 'center'
                },
                {
                    title: '合同未收价款',
                    key: 'Uncollected_money',
                    align: 'center'
                },
                {
                    title: '养护公司',
                    key: 'Uncollected_company',
                    align: 'center'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center',
                    fixed: 'right'
                }
            ],              //table字段
            formValidate: {
                Contract_name: '',
                Construction_unit: '',
                Contract_amount: '',
                Uncollected_company: ''
            },              //新增编辑合同字段
            ruleValidate: {
                Contract_name: [
                    {required: true, message: '请输入合同名称', trigger: 'blur' }
                ],
                Construction_unit: [
                    {required: true, message: '请输入建设单位', trigger: 'blur' }
                ],
                Contract_amount: [
                    {required: true, message: '请输入合同价款', trigger: 'blur' }
                ],
                Uncollected_company: [
                    {required: true, message: '请输入养护公司', trigger: 'blur' }
                ]
            },              //新增编辑合同正则判断
            cityList: [
                {
                    title: '拱墅养护公司',
                    value: 1
                },
                {
                    title: '上城养护公司',
                    value: 2
                },
                {
                    title: '西湖养护公司',
                    value: 3
                },
                {
                    title: '副城区养护公司',
                    value: 4
                }
            ],              //养护公司下拉框
            inputText: '',  //模糊查询输入框
            modal1: false,  //合同新增编辑弹出框
            modal2: false,  //合同收入支出弹出框
            loading: false  //请求加载
        }
    },
    methods: {
        //新增合同
        addContract() {
            this.title = '新增合同',
            this.modal1 = true
        },
        //新增合同确定按钮
        Click() {

        },
        //新增合同取消按钮
        Cancel(name) {
            this.modal1 = false
            for(let key in this.formValidate){
                this.formValidate[key] = ''
            }
            this.$refs[name].resetFields()
        },
        //编辑按钮
        edit(index) {
            this.formValidate.Construction_unit = this.data6[index].Construction_unit
            this.formValidate.Contract_name = this.data6[index].Contract_name
            this.formValidate.Contract_amount = this.data6[index].Contract_amount
            if(this.data6[index].Uncollected_company == '拱墅养护公司'){
                this.formValidate.Uncollected_company = 1
            }else if(this.data6[index].Uncollected_company == '上城养护公司'){
                this.formValidate.Uncollected_company = 2
            }else if(this.data6[index].Uncollected_company == '西湖养护公司'){
                this.formValidate.Uncollected_company = 3
            }else{
                this.formValidate.Uncollected_company = 4
            }
            this.title = '编辑合同',
            this.modal1 = true
        },
        //删除按钮
        remove(index) {

        },
        //子传父组件
        clildByvalue(value) {
            this.modal2 = value
        }
    },
    mounted () {
        //表格自适应
        this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 155
    },
    //收入支出子组件
    components: {
        Detailed
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
.button_class {
    margin-left: 5px;
}
</style>