<script setup lang="ts">
import { type Event } from '@/types'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'

const props = defineProps<{
    event: Event
}>()
const store = useMessageStore()
const { message } = storeToRefs(store)

</script>
<template>

    <div class="event-detail">
    <div id="flashMessage" v-if="message">
      <h4>{{ message }}</h4>
    </div>
   
        <p>{{  event.time }} on {{ event.date }} @ {{  event.location }}</p>
        <p>{{ event.description  }}</p>
</div>
        </template>

        