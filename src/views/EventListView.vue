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
  
  <div class="size-selector">
    <span>Events per page: </span>
    <RouterLink :to="{ name: 'event-list-view', query: { page: 1, perPage: 2 } }" :class="{ active: perPage === 2 }">2</RouterLink> | 
    <RouterLink :to="{ name: 'event-list-view', query: { page: 1, perPage: 4 } }" :class="{ active: perPage === 4 }">4</RouterLink> | 
    <RouterLink :to="{ name: 'event-list-view', query: { page: 1, perPage: 6 } }" :class="{ active: perPage === 6 }">6</RouterLink>
  </div>

  <div class="flex flex-col items-center">
    <!-- เหลือแค่ EventCard ตามโจทย์ข้อ 2.2 -->
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    
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