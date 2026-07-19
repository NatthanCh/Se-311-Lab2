<script setup lang="ts">
withDefaults(
  defineProps<{ resource: string }>(),
  { resource: 'page' }
)
</script>

<template>
  <div class="not-found">
    <h1>Oops!</h1>
    <h3>The {{ resource }} you're looking for is not here.</h3>
    <RouterLink :to="{ name: 'home-view' }">Back to Home Page</RouterLink>
  </div>
</template>
