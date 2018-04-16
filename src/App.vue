<template>
    <div id="app">
    </div>
</template>

<script>
    export default {
        name: 'app',
        mounted() {
            const t = this.$t;
            console.log(t.getBaseURL());
        }
    }
</script>

<style>

</style>
