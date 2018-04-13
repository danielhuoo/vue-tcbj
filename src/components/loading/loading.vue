<template>
    <div class="loadingWrap" v-show="visible">
        <div class="loading-content">
            <img class="loading-img" src="./loading.gif" alt=""/>
            <p class="loading-text">{{loadingText}}</p>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default {
        data() {
            return {
                visible: false,
                loadingText: '加载中...',
            }
        }
    }
</script>
<style type="text/css" scoped>
    .loadingWrap {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 2.4rem;
        height: 2.4rem;
        background: rgba(17, 17, 17, 0.6);
        z-index: 9999;
        text-align: center;
        border-radius: 6px;
        .loading-content {
            width: 100%;
            height: 100%;
            .loading-img {
                width: 0.8rem;
                height: 0.8rem;
                margin: 0.4rem 0 0.2rem;
            }
            .loading-text {
                font-size: 0.38rem;
                margin-bottom: 0.3rem;
                color: #fff;
            }
        }

    }
</style>