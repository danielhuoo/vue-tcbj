<template>
    <div class="alert_dialog">
        <div class="weui-mask"></div>
        <div class="weui-dialog">
            <div class="weui-dialog__bd" v-html="content"></div>
            <div class="weui-dialog__ft">
                <a @click="confirmBtn"
                   class="weui-dialog__btn weui-dialog__btn_primary">{{btnText}}</a>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default {
        data() {
            return {
                btnText: '确定',
                content: '你确定要删除数据吧？'
            }
        },
        methods: {
            confirmBtn() {
            }
        }
    }
</script>