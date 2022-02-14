<template>
    <div>
        <Card style="width:100%;height:100%;min-height:100%;height:auto">
            <p slot="title">
                版权
            </p>
            <Table border :height="tableHeight" ref="table" :no-data-text="`<div style='font-size: 50px;'>系统软件版权由鲍世民所有</div>`"></Table>
        </Card>
    </div>
</template>

<script>
export default {
    data () {
        return {
            tableHeight: 0
        }
    },
    mounted () {
        this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140
    }
}
</script>

<style scoped>

</style>