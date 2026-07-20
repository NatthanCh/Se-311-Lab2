<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import UserService from '@/service/UserService'

const props = defineProps<{ id: string }>()
const user = ref<any | null>(null)
const router = useRouter()

onMounted(() => {
  // ข้อ 6.3: ดึงรายละเอียดผู้ใช้จาก ID
  UserService.getUser(Number(props.id))
    .then((response) => {
      // ดักจับกรณี API คืนค่าเป็น Object ว่าง (ไม่มีข้อมูลผู้ใช้)
      if (!response.data || Object.keys(response.data).length === 0) {
        throw new Error('404')
      }
      user.value = response.data
    })
    .catch((error) => {
      // ข้อ 6.6: ถ้าเจอ 404 ให้ส่งไปหน้า Resource-not-found พร้อมระบุประเภทเป็น 'user'
      if (error.response && error.response.status === 404 || error.message === '404') {
        router.push({
          name: '404-resource-view',
          params: { resource: 'user' }
        })
      } else {
        router.push({ name: 'network-error-view' })
      }
    })
})
</script>

<template>
  <div v-if="user">
    <h2>User: {{ user.name }}</h2>
    <nav>
      <RouterLink :to="{ name: 'user-profile' }">Profile</RouterLink> |
      <RouterLink :to="{ name: 'user-posts' }">Posts</RouterLink>
    </nav>
    <RouterView :user="user" />
  </div>
</template>