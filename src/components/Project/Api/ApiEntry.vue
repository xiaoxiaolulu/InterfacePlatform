<template>
    <div class="">
        <ApiList :project="project" v-if="page==apipage.API_LIST" @page-changed="onPageChanged"></ApiList>
        <AddApi :project="project" :api="api" v-if="page==apipage.ADD_API" @page-changed="onPageChanged"></AddApi>
    </div>
</template>

<script type="text/ecmascript-6">
    import AddApi from "./AddApi"
    import ApiList from "./ApiList"
    import apipage from "./apipage"

    export default {
        name: "ApiEntry",
        props: ['project'],
        data() {
            return {
                api: null,
                page: apipage.API_LIST,
                apipage
            }
        },
        components: {
            [AddApi.name]: AddApi,
            [ApiList.name]: ApiList
        },
        methods: {
            onPageChanged(page, api) {
                this.page = page
                this.api = api
            }
        }
    }
</script>

<style scoped lang='scss'>
</style>