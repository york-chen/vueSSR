<template>
    <span>home页面</span>
</template>
<script>
export default {
    asyncData({store,route}){
        return store.dispatch('fetchItem', route.params.id)
    }
}
</script>
<style lang="scss" scoped>

</style>