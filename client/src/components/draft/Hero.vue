<template>
  <div heroHover
    @mouseover="display = true"
    @mouseout="display = false"
    class="hero"
    :style="{ backgroundImage: 'url(' + hero.url_full_portrait + ')' }"
    :class="[{ isNotAvailable: !isAvailable, notSearched: isNotSearched }, ifSelectedClass, hero.type, team ]"
    @click="selectHero()"
  >
    <div
      v-if="display"
      class="heroName">{{ displayName }}</div>
  </div>

</template>
<script>
  import { default as eventBus } from '../../main.js'
  import { CLEANSE_INPUT, HERO_NAME_CLEANSE } from '../helper/support.js'

  export default {
    props: ['hero'],
    data () {
      return {
        currentData: {
          team: null,
          type: null
        },
        display: false,
        isLive: false,
        isNotSearched: false,
        isAvailable: true,
        ifSelectedClass: null,
        selectOrBan: null,
        displayName: this.hero.localized_name,
        team: null
      }
    },
    methods: {
      selectHero () {
        if (!this.readyCheck()) return false
        this.heroUpdate()
        this.heroSelectBan()
        eventBus.$emit('selectionMade')
        eventBus.$emit('selectedForTeam', { hero: this.hero, selectedTeam: this.team, type: this.selectOrBan })
        return true
      },
      heroUpdate() {
        this.isAvailable = false
        this.team = this.currentData.team
        this.selectOrBan = this.currentData.type
      },
      readyCheck () {
        if (!this.isLive) return false
        if (!this.isAvailable) return false
        return true
      },
      heroSelectBan () {
        let type = this.currentData.type
        if (type === 'ban') this.displayName = 'BANNED'
        if (type === 'selection') this.displayName = this.team.toUpperCase()
        return this.ifSelectedClass = type === 'ban' ? 'isBanned' : 'isPicked'
      }
    },
    created () {
      eventBus.$on('draftingObject', (data) => {
        this.isLive = true
        // @wilo TODO on team selection if 'select' show radiant color vs dire color
        this.currentData.team = data.team
        this.currentData.type = data.type
      })

      eventBus.$on('valueFromSearchBar', (searchInput) => {
        let cleanSearchInput = CLEANSE_INPUT(searchInput.toLowerCase())
        let localName = CLEANSE_INPUT(this.hero.localized_name.toLowerCase())
        let altName = HERO_NAME_CLEANSE(this.hero.name.toLowerCase())
        if ( !cleanSearchInput ) return this.isNotSearched = false
        if ( !localName.includes(cleanSearchInput) && !altName.includes(cleanSearchInput)) {
          return this.isNotSearched = true
        }
        return this.isNotSearched = false
      })
    },
    // @wilo : working on hover pop out
    directives: {
      heroHover: {
        inserted: function (el) {
          el.style.border = '1px solid red'
        }
      }
    }
  }
</script>

<style scoped>
  .hero {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 65px;
    width: 70px;
    padding: 0;
    margin: 0px;
    border: 1px solid white;
    box-sizing: border-box;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    cursor: pointer;
    position: relative;
    z-index: 0;
    overflow: hidden;
  }

  /* .hero:hover {
    overflow: visible;
    z-index: 100;
    position: absolute;
    background-size: contain;
    width: 120px;
    height: 120px;
    border: 1px solid red;
  } */

  .radiant {
    background-color: darkgreen;
  }

  .dire {
    background-color: darkred;
  }

  .heroName {
    color: white;
    font-size: 12px;
    font-weight: 700;
    align-self: center;
    overflow: auto;
    text-overflow: ellipsis;
    background-color: rgba(119, 136, 153, 0.25);
  }

  .agility {
    border: 1px solid green;
  }

  .intelligence {
    border: 1px solid turquoise;
  }

  .strength {
    border: 1px solid red;
  }

  .notSearched {
    -webkit-filter: sepia(100%); /* Safari 6.0 - 9.0 */
    filter: sepia(100%);
  }

  .isNotAvailable {
    -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
    filter: grayscale(100%);
  }
</style>
