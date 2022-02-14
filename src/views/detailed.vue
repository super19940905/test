<template>
    <div>
        <!-- 新增合同弹出框 -->
        <Modal title="收支入明细" v-model="modal2" fullscreen>
            <div>
                <div>
                    <Button type="primary" class="addClass" @click="modal1=true">收入新增</Button>
                    <Table :columns="columns1" :data="data1" highlight-row border :height="table_height" ref="Table">
                        <template slot-scope="{ row }" slot="name">
                            <strong>{{ row.name }}</strong>
                        </template>
                        <template slot-scope="{index}" slot="action">
                            <Button type="error" size="small" @click="income_remove(index)">删除</Button>
                        </template>
                    </Table>
                </div>
                <div style="margin-top:13px">
                    <Button type="primary" class="addClass" @click="modal3=true">支出新增</Button>
                    <Table :columns="columns2" :data="data2" highlight-row border :height="tableheight"  ref="table">
                        <template slot-scope="{ row }" slot="name">
                            <strong>{{ row.name }}</strong>
                        </template>
                        <template slot-scope="{index}" slot="action">
                            <Button type="error" size="small" @click="expenditure_remove(index)">删除</Button>
                        </template>
                    </Table>
                </div>
            </div>
            <div slot="footer" style="text-align:center">
                <Button type="primary" size="large" @click="revenueExpenditure('formValidate')">提交</Button>
                <Button size="large" @click="revenueExpenditure_Cancel('formValidate')">取消</Button>
            </div>
        </Modal>
        <!-- 新增收入弹出框 -->
        <Modal title="收入弹出框" v-model="modal1" class-name="vertical-center-modal" :scrollable="true" :mask-closable="false">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="收款日期" prop="Collection_time">
                    <DatePicker type="date" placeholder="请输入" style="width: 100%" v-model="formValidate.Collection_time"></DatePicker>
                </FormItem>
                <FormItem label="收款金额" prop="Collection_money">
                    <Input v-model="formValidate.Collection_money" placeholder="请输入"></Input>
                </FormItem>
            </Form>
            <div slot="footer" style="text-align:center">
                <Button type="primary" size="large" @click="Collection_Click('formValidate')">提交</Button>
                <Button size="large" @click="Collection_Cancel('formValidate')">取消</Button>
            </div>
        </Modal>
        <!-- 新增支出弹出框 -->
        <Modal title="支出弹出框" v-model="modal3" class-name="vertical-center-modal" :scrollable="true" :mask-closable="false">
            <Form ref="FormValidate" :model="FormValidate" :rules="RuleValidate" :label-width="80">
                <FormItem label="支出日期" prop="expenditure_time">
                    <DatePicker type="date" placeholder="请输入" style="width: 100%" v-model="FormValidate.expenditure_time"></DatePicker>
                </FormItem>
                <FormItem label="支出金额" prop="expenditure_money">
                    <Input v-model="FormValidate.expenditure_money" placeholder="请输入"></Input>
                </FormItem>
            </Form>
            <div slot="footer" style="text-align:center">
                <Button type="primary" size="large" @click="expenditure_Click('FormValidate')">提交</Button>
                <Button size="large" @click="expenditure_Cancel('FormValidate')">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    data () {
        return {
            modal1: false,
            formValidate: {
                Collection_time: '',
                Collection_money: ''
            },             
            ruleValidate: {
                Collection_time: [
                    {required: true, message: '请输入收款日期', trigger: 'blur',type: 'date', }
                ],
                Collection_money: [
                    {required: true, message: '请输入收款金额', trigger: 'blur' }
                ]
            },   
            modal3: false,  
            FormValidate: {
                expenditure_time: '',
                expenditure_money: ''
            },
            RuleValidate: {
                expenditure_time: [
                    {required: true, message: '请输入支出日期', trigger: 'blur',type: 'date', }
                ],
                expenditure_money: [
                    {required: true, message: '请输入支出金额', trigger: 'blur' }
                ]
            },
            table_height: 0,
            tableheight: 0,
            modal2: false,
            columns1: [
                {
                    title: '收款日期',
                    key: 'title',
                    align: 'center'
                },
                {
                    title: '收款金额',
                    key: 'money',
                    align: 'center'
                },
                {
                    title: '操作',
                    slot: 'action',
                    align: 'center'
                }
            ],
            data1: [
                {
                    title: '2022-1-1',
                    money: '138671'
                }
            ],
            columns2: [
                {
                    title: '支出日期',
                    key: 'title',
                    align: 'center'
                },
                {
                    title: '支出金额',
                    key: 'money',
                    align: 'center'
                },
                {
                    title: '操作',
                    slot: 'action',
                    align: 'center'
                }
            ],
            data2: [
                {
                    title: '2022-2-2',
                    money: '999999'
                }
            ],
        }
    },
    methods: {
        //收入支出明细确定按钮
        revenueExpenditure() {

        },
        //收入支出明细取消按钮
        revenueExpenditure_Cancel() {
            this.modal2 = false
            this.$emit("clildByvalue",this.modal2)
        },
        //收入明细删除按钮
        income_remove() {

        },
        //支出明细删除按钮
        expenditure_remove() {

        },
        Collection_Click() {

        },
        Collection_Cancel() {

        },
        expenditure_Click() {
            
        },
        expenditure_Cancel() {
            
        }
    },
    props: {
        isModal: {
            type: Boolean,
            default: false
        }

    },
    watch: {
        isModal(value) {
            this.modal2 = value
        }
    },
    mounted (){
        this.table_height = window.innerHeight - this.$refs.Table.$el.offsetTop - 430   
        this.tableheight = window.innerHeight - this.$refs.table.$el.offsetTop - 430
    }
}
</script>

<style>
.vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;
}
.addClass {
    margin-bottom: 5px;
}
</style>