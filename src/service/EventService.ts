import axios from 'axios'

const apiClient = axios.create ({
    baseURL:'https://my-json-server.typicode.com/NatthanCh/se311-mock-server/events',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'

        
    }
    
})

export default{
    getEvents(){
        return apiClient.get('')
    },
    getEvent(id: number){
        return apiClient.get('/events'+id)
    }
    
    
}
