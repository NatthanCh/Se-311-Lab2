<script setup lang="ts">
import { ref, onMounted } from 'vue'
import UserService from '@/service/UserService.ts'

const props = defineProps<{ user: any }>()
const posts = ref<any[] | null>(null)

onMounted(() => {
  UserService.getUserPosts(props.user.id)
    .then((response: { data: any[] | null; }) => {
      posts.value = response.data
    })
    .catch((error: any) => console.error(error))
})
</script>

<template>
  <div class="user-posts">
    <h3>Posts by {{ user.name }}</h3>
    <ul>
      <li v-for="post in posts" :key="post.id" class="post-item">
        <h4>{{ post.title }}</h4>
        <p>{{ post.body }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.post-item { margin-bottom: 15px; text-align: left; list-style-type: none; border-bottom: 1px solid #eee; padding-bottom: 10px; }
</style>