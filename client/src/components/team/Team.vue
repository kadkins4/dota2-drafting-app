<template>
  <div>
    <div class="teamNameContainer">{{ team }}</div>
    <div class="selectedHeroesContainer">
      <div
        v-for="hero in selections"
        :key="hero.id"
        :style="[ { background: 'url(' + hero.url_small_portrait + ') no-repeat center center' },
          heroStyle ]"
      ></div>
    </div>
  </div>
</template>

<script>
// import HeroList from '../../data/HeroList.json'
import { default as eventBus } from '../../main'
// import { randomNumber } from '../helper/support.js'

export default {
  props: ['team'],
  data () {
    return {
      teamName: this.team,
      selections: [],
      bans: []
    }
  },
  methods: {
    // testHeroMethod() {
    //   return Math.floor(Math.random() * HeroList.count)
    // }
  },
  computed: {
    heroStyle () {
      return {
        height: '120px',
        width: '105px',
        backgroundSize: 'cover',
        margin: '8px 18px',
        border: '2px solid black'
      }
    }
  },
  created() {
    eventBus.$on('selectedForTeam', (data) => {
      if ( this.teamName.toLowerCase() === data.selectedTeam.toLowerCase()) {
        if ( data.type === 'selection' ) return this.selections.push(data.hero)
        return this.bans.push(data.hero)
      }
    })
  }
}
</script>

<style scoped>
  .teamNameContainer {
    font-size: 26px;
    font-weight: 700;
    text-transform: uppercase;
  }

  .selectedHeroesContainer {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>
