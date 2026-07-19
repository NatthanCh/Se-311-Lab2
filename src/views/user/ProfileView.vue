<script setup lang="ts">
defineProps<{ user: any }>()
</script>

<template>
  <div class="profile-details">
    <h3>User Profile</h3>
    <p><strong>Phone:</strong> {{ user.phone }}</p>
    <p><strong>Address:</strong> {{ user.address.suite }}, {{ user.address.street }}, {{ user.address.city }}</p>
  </div>
</template>