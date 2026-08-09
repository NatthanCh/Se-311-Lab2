<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, RouterLink, RouterView } from 'vue-router'
import { type Event } from '@/types'
import EventService from '@/service/EventService'

const event = ref<Event | null>(null)
const router = useRouter()

const props = defineProps({
    id: {
        type: String,
        required: true
    }
})

onMounted(() => {
    EventService.getEvent(Number(props.id))
    .then((response)=>{
        event.value = response.data
    })
    .catch(() => {
        router.push({
            name: '404-resource-view',
            params: { resource: 'event'}
        })
    })
})
</script>

<template>
  <div v-if="event">
    <h2>Event: {{ event.title }}</h2>
    <nav>
      <RouterLink :to="{ name: 'event-detail-view', params: { id } }">Details</RouterLink> |
      <RouterLink :to="{ name: 'event-register-view', params: { id } }">Register</RouterLink> |
      <RouterLink :to="{ name: 'event-edit-view', params: { id } }">Edit</RouterLink>
    </nav>
    <RouterView :event="event" />
  </div>
</template>