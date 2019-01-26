<template>
  <div id="app">
    <!-- <h1>Drafter</h1> -->
    <Heroes :heroObject="heroes" />
    <div class="draftView">
      <div class="teamBox teamBoxRad">
        <Team team="Radiant" />
      </div>
      <div class="midwayContainer">
      <!-- TODO TIMELINE GOES HERE -->
        <!-- <Timeline /> -->
        <SearchBar />
        <Timer :draftObject="draft" :roundCounter="round"/>
      </div>
      <div class="teamBox teamBoxDire">
        <Team team="Dire" />
      </div>
    </div>
    {{ users }}
  </div>
</template>

<script>
  import { draft } from './draft/draftDetails.js'
  import Heroes from './draft/Heroes.vue'
  import HeroList from '../data/HeroList.json'
  import Team from './team/Team.vue'
  import Timer from './draft/Timer.vue'
  import SearchBar from './helper/SearchBar.vue'
  // import { APIService } from './APIService.js'
  // import { port } from '../server.js'

  // const API_URL = `http://localhost:${port}`

  // const apiService = new APIService()

  const alphabetizeHeroes = () => {
    let heroes = HeroList.heroes

    heroes.sort((a, b) => {
      let heroA = a.localized_name.toLowerCase()
      let heroB = b.localized_name.toLowerCase()
      if (heroA < heroB) //sort string ascending
          return -1
      if (heroA > heroB)
          return 1
      return 0
    })

    return heroes
  }

  export default {
    name: 'app',
    components: {
      Team,
      Timer,
      SearchBar,
      Heroes
    },
    data () {
      return {
        heroes: alphabetizeHeroes(),
        draft: draft,
        round: 0,
        users: []
      }
    },
    methods: {
      // getUsers () {
        // console.log('attempting')
        // apiService.getUsers()
          // .then((data) => {
            // this.user = data.data
          // })
      // }
    },
    mounted() {
      // this.getUsers()
    },
    created() {

    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .draftView {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
  }

  .midwayContainer {
    margin: -100px 0 0 0;
  }

  .teamBox {
    /* border: 1px solid black; */
    width: 40%;
    height: 400px;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

</style>
