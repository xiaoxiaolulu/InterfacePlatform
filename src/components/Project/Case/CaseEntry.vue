<template>
<div class="">
  <CaseList v-if="page==casepage.CASE_LIST" @page-changed="onPageChanged" :project="project"></CaseList>
  <AddCase v-if="page==casepage.ADD_CASE" @page-changed="onPageChanged" :project="project" :caseobj="caseobj"></AddCase>
</div>
</template>

<script type="text/ecmascript-6">
import AddCase from "./AddCase"
import CaseList from "./CaseList"
import casepage from "./casepage"
export default {
  name: "CaseEntry",
  props: ['project'],
  data() {
    return {
      caseobj: null,
      page: casepage.CASE_LIST,
      casepage
    }
  },
  components: {
    [AddCase.name]: AddCase,
    [CaseList.name]: CaseList
  },
  methods: {
    onPageChanged(page,caseobj){
      this.page = page
      this.caseobj = caseobj
    }
  }
}
</script>

<style scoped lang='scss'>
</style>