<script setup lang="ts">
import type {  Event} from '@/types'
defineProps<{
  event: Event
}>()

//const event= ref ({
 // id: 5928101,
  //category: 'animal welfare',
  //title: 'Cat Adoption Day',
  //description: 'Find your new feline at this event.',
  //location: 'Meow Town',
  //date: 'January 28, 2026',
  //time: '12:00',
  //petsAllowed: true,
  //organizer: 'Kat Laydee'
//})
</script>

<template>
  <RouterLink class="no-underline text-[#2c3e50]" :to="{ name: 'event-detail-view', params: { id: event.id } }">
    <div class="p-5 w-[250px] cursor-pointer border border-solid border-[#39495c] mb-[18px] hover:scale-101 hover:shadow-sp">
      <h2>{{ event.title }}</h2>
      <span>@{{ event.time }} on {{ event.date }}</span>
    </div>
  </RouterLink>
</template>

<style scoped></style>

