<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import CategoryOrganizerCard from '@/components/CategoryOrganizerCard.vue'
import type {Event} from '@/types'
import {ref, onMounted} from 'vue'
import axios from 'axios'

const events =ref<Event[] | null>(null)

onMounted(() => {
  axios
    .get('https://my-json-server.typicode.com/NatthanCh/se311-mock-server/events')
    .then((response) => {
      console.log(response.data)
      events.value = response.data
    })
    .catch((error) =>{
      console.error('There was an error!', error)
    })
})
</script>

<template>
  <h1>Events For Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event"/>
    <CategoryOrganizerCard v-for="event in events" :key="'cat-' + event.id" :event="event" />
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}</style>