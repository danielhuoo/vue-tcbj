<template>
    <div class="confirm_dialog">
        <div class="weui-mask"></div>
        <div class="weui-dialog">
            <div class="weui-dialog__hd" v-if="title"><strong class="weui-dialog__title">{{title}}</strong></div>
            <div class="weui-dialog__bd" v-html="content"></div>
            <div class="weui-dialog__ft">
                <a @click="cancelBtn" class="weui-dialog__btn weui-dialog__btn_default">{{cancelBtnText}}</a>
                <a @click="confirmBtn" class="weui-dialog__btn weui-dialog__btn_primary">{{confirmBtnText}}</a>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default {
        data() {
            return {
                title: '提示',
                content: '是否要删除数据？',
                confirmBtnText: '确定',
                cancelBtnText: '取消',
            }
        },
        methods: {
            confirmBtn() {
            },
            cancelBtn() {
            }
        }
    }
</script>