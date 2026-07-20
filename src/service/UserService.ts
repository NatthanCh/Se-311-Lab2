import axios from 'axios'

// สร้าง Instance ของ Axios ชี้ไปยัง Base URL ของ JSONPlaceholder API
const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  // 6.2 ดึงรายชื่อผู้ใช้ทั้งหมด (ใช้ในหน้า HomeView)
  getUsers() {
    return apiClient.get('/users')
  },

  // 6.3 ดึงรายละเอียดของผู้ใช้คนนั้นๆ ตาม id (ใช้ในหน้า User LayoutView)
  getUser(id: number) {
    return apiClient.get(`/users/${id}`)
  },

  // 6.4 ดึงข้อมูลโพสต์ทั้งหมดของผู้ใช้ตาม userId (ใช้ในหน้า User PostsView)
  getUserPosts(userId: number) {
    return apiClient.get(`/posts?userId=${userId}`)
  }
}
