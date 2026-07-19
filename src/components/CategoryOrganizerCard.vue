<script setup lang="ts">
import type { Event } from '../types'

defineProps<{
  event: Event
}>()
</script>

<template>
  <div class="event-class">
    <div class="category-organizer-card">
      <p class="text-detail">{{ event.category }}</p>
      <p class="text-detail">{{ event.organizer }}</p>
    </div>
  </div>
</template>

<style scoped>
.event-class {
  display: flex;
  justify-content: center;
}

.category-organizer-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
  text-align: right; 
}

.category-organizer-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.text-detail {
  font-size: 14px;
  margin: 4px 0;
}
</style>