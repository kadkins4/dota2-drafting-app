<template>
  <div>
    <input
      v-model="searchFor"
      class="search"
      type="text"
      v-on:keyup="findHeroFromSearch"/>
  </div>
</template>

<script>
import { default as eventBus } from '../../main'

export default {
  data () {
    return {
      searchFor: ''
    }
  },
  methods: {
    findHeroFromSearch () {
      eventBus.$emit('valueFromSearchBar', this.searchFor)
    }
  }
}
</script>

<style scoped>
  .search {
    padding: 5px 20px;
    font-size: 15px;
  }
</style>
