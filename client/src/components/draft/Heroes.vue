<template>
  <div class="heroPool">
    <div v-for="hero in heroObject" :key="hero.id">
      <appHero :hero="hero" />
    </div>
  </div>
</template>

<script>
  import Hero from './Hero.vue'

  export default {
    components: {
      appHero: Hero
    },
    props: [ 'heroObject' ],
    data () {
      return {
      }
    }
  }
</script>

<style scoped>
  .heroPool {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>
