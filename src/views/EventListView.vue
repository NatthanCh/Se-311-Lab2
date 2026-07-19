<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import CategoryOrganizerCard from '@/components/CategoryOrganizerCard.vue'
import type { Event } from '@/types'
import { ref, computed, watchEffect } from 'vue'
import EventService from '@/service/EventService'

const events = ref<Event[] | null>(null)
const totalEvents = ref(0)


const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  perPage: {
    type: Number,
    required: true
  }
})
const page = computed(() => props.page)
const perPage = computed(() => props.perPage) 

watchEffect(() => {
  events.value = null 
  
  EventService.getEvents(perPage.value, page.value)
    .then((response) => {
      events.value = response.data
      totalEvents.value = parseInt(response.headers['x-total-count'])
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
})

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / perPage.value)
  return page.value < totalPages
})
</script>

<template>
  <h1>Events For Good</h1>
  
  <div class="size-selector">
    <span>Events per page: </span>
    <RouterLink :to="{ name: 'event-list-view', query: { page: 1, perPage: 2 } }" :class="{ active: perPage === 2 }">2</RouterLink> | 
    <RouterLink :to="{ name: 'event-list-view', query: { page: 1, perPage: 4 } }" :class="{ active: perPage === 4 }">4</RouterLink> | 
    <RouterLink :to="{ name: 'event-list-view', query: { page: 1, perPage: 6 } }" :class="{ active: perPage === 6 }">6</RouterLink>
  </div>

  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <CategoryOrganizerCard v-for="event in events" :key="'cat-' + event.id" :event="event" />
    
    <div class="pagination">
  
      <RouterLink
        :to="{ name: 'event-list-view', query: { page: page - 1, perPage: perPage } }"
        rel="prev"
        v-if="page !== 1"
      >
        &#60; Prev Page
      </RouterLink>

      <RouterLink 
        :to="{ name: 'event-list-view', query: { page: page + 1, perPage: perPage } }"
        rel="next"
        v-if="hasNextPage"
      >
        Next Page &#62;
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
  margin-top: 20px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
  font-weight: bold;
}
.pagination a[rel="next"] {
  text-align: right;
}
.size-selector {
  margin-bottom: 15px;
  text-align: center;
}
.size-selector a {
  text-decoration: none;
  color: #2c3e50;
  font-weight: normal;
  padding: 0 5px;
}
.size-selector a.active {
  font-weight: bold;
  text-decoration: underline;
}
</style>