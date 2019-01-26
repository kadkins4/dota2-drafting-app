<template>
  <div class="draftClockArea">
    <div class="draftTime">
      {{ currentTime }}
    </div>
    <div class="reserveTitle">Reserve Time</div>
    <div class="reserveTime">
      <div class="radiantReserveTime">
        <div class="teamSideName">Radiant</div>
        <div class="reserveTime">{{ radRes }}</div>
      </div>
      <div class="direReserveTime">
        <div class="teamSideName">Dire</div>
        <div class="reserveTime">{{ direRes }}</div>
      </div>
    </div>
    <button
      :style="startBtnStyle"
      :class="{ hide: onClock }"
      @click="initiate"
    >Start Draft</button>
  </div>
</template>

<script>
/* eslint-disable */
import { radiantResTime, direResTime } from '../helper/support.js'
import { teamOne, teamTwo } from './draftDetails.js'
import { default as eventBus } from '../../main'

export default {
  props: [
    'draftObject',
    'roundCounter'
  ],
  data () {
    return {
      isRadiantPick: false,
      isDirePick: false,
      currentTime: 0,
      onClock: false,
      radRes: radiantResTime,
      direRes: direResTime,
      interval: '',
      draftTeam: null,
      draftType: null,
      roundNumber: this.roundCounter
    }
  },
  computed: {
    startBtnStyle () {
      return {
        padding: '10px',
        backgroundColor: 'darkred',
        color: 'white',
        border: '1px solid brown'
      }
    }
  },
  methods: {
    resetCurrentTime () {
      this.currentTime = 35
    },
    timeStart () {
      this.resetCurrentTime()
      this.decrementTime()
    },
    decrementTime () {
      let vm = this
      this.interval = setInterval(() => {
        let isRadiantPick = this.isRadiantPick
        let isDirePick = this.isDirePick
        if ( this.currentTime && this.onClock ) {
          this.currentTime = this.currentTime - 1
        } else if (!this.currentTime && this.roundNumber <= 22 && this.onClock) {
          if ( isRadiantPick ) return vm.decRadiantTime()
          if ( isDirePick ) return vm.decDireTime()
        } else {
          window.clearInterval(this.interval)
        }
      }, 1000)
      // TODO need to set condition that will random when time hits 0
    },
    decRadiantTime () {
      if ( this.radRes ) return this.radRes -= 1
      this.initiate()
    },
    decDireTime () {
      if (this.direRes ) return this.direRes -= 1
      this.initiate()
    },
    draftingTeam () {
      this.draftTeam = this.draftObject[this.roundNumber].team
      this.draftType = this.draftObject[this.roundNumber].type
      console.log('Round', this.roundNumber, this.draftTeam, 'is going to', this.draftType)
    },
    switchTeam () {
      this.isRadiantPick = !this.isRadiantPick
      this.isDirePick = !this.isDirePick
      // if ( this.isRadiantPick ) {
      //   this.isRadiantPick = false
      //   this.isDirePick = true
      // } else {
      //   this.isRadiantPick = true
      //   this.isDirePick = false
      // }

      // if broken this IF ELSE was in the initiate method
    },
    initiate () {
      this.roundNumber += 1
      this.draftingTeam()
      eventBus.$emit('draftingObject', { type: this.draftType , team: this.draftTeam } )
      if ( !this.onClock ) return this.onClock = true
      this.resetCurrentTime()
      // this.switchTeam() // does this need to be here?
    }
  },
  watch: {
    onClock () {
      if ( this.onClock ) return this.timeStart()
    },
    radRes () {
      if (this.radRes <= 0) {
        this.initiate()
        if ( this.draft[this.roundNumber].type === 'ban' ) {
          console.log('skipped')
          return
        }
        console.log('randomed')
        // return random hero
      }
    },
    direRes () {
      if (this.direRes <= 0) {
        this.initiate()
        if ( this.draft[this.roundNumber].type === 'ban' ) {
          console.log('skipped')
          return
        }
        console.log('randomed')
        // return random hero
      }
    }
  },
  mounted () {
    this.isRadiantPick = false
    this.isDirePick = false
    this.draftTeam = this.teamOne
    if (teamOne === 'radiant') return this.isRadiantPick = true
    return this.isDirePick = true
  },
  created() {
    eventBus.$on('selectionMade', () => {
      this.initiate()
    })
  }
}
</script>

<style scoped>
.hide {
  display: none;
}

.draftClockArea {
  display: flex;
  flex-direction: column;
  background-color: black;
  color: white;
  padding: 20px;
  margin: 20px 0;
  /* border: 1px solid red; */
}

.reserveTitle {
  padding: 10px;
  margin: 0;
  font-size: 18px;
}

.reserveTime {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
