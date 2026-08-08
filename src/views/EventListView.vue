<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import type { Event } from '@/types'
import { ref, computed, watch } from 'vue'
import EventService from '@/service/EventService'
import { useRouter } from 'vue-router'

const events = ref<Event[] | null>(null)
const totalEvents = ref(0)
const router = useRouter()

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

watch(
  [page, perPage],
  ([newPage, newPerPage]) => {
    EventService.getEvents(newPerPage, newPage)
      .then((response) => {
        events.value = response.data
        totalEvents.value = parseInt(response.headers['x-total-count'])
      })
      .catch(() => {
        router.push({ name: 'network-error-view' })
      })
  },
  { immediate: true }
)

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / perPage.value)
  return page.value < totalPages
})
</script>

<template>
  <h1>Events For Good</h1>
  
  <div class="mb-4 text-center">
    <span>Events per page: </span>
    <RouterLink 
      :to="{ name: 'event-list-view', query: { page: 1, perPage: 2 } }" 
      class="px-1 text-[#2c3e50] no-underline"
      :class="{ 'font-bold underline': perPage === 2 }"
    >2</RouterLink> | 
    <RouterLink 
      :to="{ name: 'event-list-view', query: { page: 1, perPage: 4 } }" 
      class="px-1 text-[#2c3e50] no-underline"
      :class="{ 'font-bold underline': perPage === 4 }"
    >4</RouterLink> | 
    <RouterLink 
      :to="{ name: 'event-list-view', query: { page: 1, perPage: 6 } }" 
      class="px-1 text-[#2c3e50] no-underline"
      :class="{ 'font-bold underline': perPage === 6 }"
    >6</RouterLink>
  </div>

  <div class="flex flex-col items-center">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    
    <div class="flex w-[290px] mt-5">
      <RouterLink
        :to="{ name: 'event-list-view', query: { page: page - 1, perPage: perPage } }"
        rel="prev"
        v-if="page !== 1"
        class="flex-1 text-left no-underline text-[#2c3e50] font-bold"
      >
        &#60; Prev Page
      </RouterLink>

      <RouterLink 
        :to="{ name: 'event-list-view', query: { page: page + 1, perPage: perPage } }"
        rel="next"
        v-if="hasNextPage"
        class="flex-1 text-right no-underline text-[#2c3e50] font-bold"
      >
        Next Page &#62;
      </RouterLink>
    </div>
  </div>
</template>

