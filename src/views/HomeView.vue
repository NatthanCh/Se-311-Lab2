<script setup lang="ts">
import { ref, onMounted } from 'vue'
import UserService from '@/service/UserService.ts' 

const users = ref<any[] | null>(null)

onMounted(() => {
  UserService.getUsers()
    .then((response) => {
      users.value = response.data
    })
    .catch((error) => console.error(error))
})
</script>

<template>
  <div class="home">
    <h1>Users List</h1>
    <div v-if="users" class="user-list">
      <RouterLink 
        v-for="user in users" 
        :key="user.id" 
        :to="{ name: 'user-profile', params: { id: user.id } }"
        class="user-card"
      >
        <h3>{{ user.name }}</h3>
        <p>Email: {{ user.email }}</p>
        <p>Company: {{ user.company?.name }}</p> 
      </RouterLink>
    </div>
    <div v-else>
      <p>Loading users...</p>
    </div>
  </div>
</template>

<style scoped>
.user-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}
.user-card {
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 8px;
  text-decoration: none;
  color: #2c3e50;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}
.user-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}
</style>