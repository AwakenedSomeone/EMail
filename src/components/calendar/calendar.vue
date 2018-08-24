<template>
  <div>
    <v-calendar
      is-double-paned :attributes='attrs' style="width: 100%">
    </v-calendar>
  <!--   <v-date-picker
      mode='single'
      v-model='selectedValue'>
    </v-date-picker> -->
  </div>
</template>

<script>
import Vue from 'vue'
import { setupCalendar, Calendar } from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'
setupCalendar({
  firstDayOfWeek: 2 // Monday,
})
Vue.component('v-calendar', Calendar)
export default {
  data () {
    return {
      selectedValue: new Date(),
      attrs: [
        {
          key: 'today',
          highlight: {
            backgroundColor: '#ff8080'
          },
          // Just use a normal style
          contentStyle: {
            color: '#fafafa'
          },
          dates: new Date(),
          popover: {
            label: 'Today is your birthday'
          },
          showLinkedButtons: true
        }
      ]
    }
  }
}
</script>

<style rel="stylesheet">
</style>
