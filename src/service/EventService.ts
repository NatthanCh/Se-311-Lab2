import axios from 'axios'

const apiClient = axios.create ({
    baseURL:'https://my-json-server.typicode.com/NatthanCh/se311-mock-server',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'

        
    }
    
})

export default{
    getEvents(perpage: number,page: number) {
    return apiClient.get('/events?_limit='+ perpage +'&_page=' + page)
  },
    getEvent(id: number) {
    return apiClient.get('/events/' + id)
  }
}