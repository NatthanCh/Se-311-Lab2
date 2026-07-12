<script setup lang="ts">
import { ref, onMounted } from 'vue'
import StudentCard from '@/components/StudentCard.vue'
import StudentService from '@/service/StudentService'
import type { Student } from '@/types'

const students = ref<Student[] | null>(null)

onMounted(() => {
  StudentService.getStudents()
    .then((response) => {
      students.value = response.data
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
})
</script>

<template>
  <h1>Student List</h1>
  <div class="students">
    <StudentCard v-for="student in students" :key="student.id" :student="student" />
  </div>
</template>

<style scoped>
.students {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>