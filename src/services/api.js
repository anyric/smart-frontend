import axios from 'axios';
import VueCookie from 'vue-cookie';

export default () =>{
    let currentUser = VueCookie.get('currentUser');
    if(currentUser){
        currentUser = JSON.parse(currentUser);
    }
    
    return axios.create({
        baseURL: 'http://localhost:8000/api/v1',
        withCredentials: false,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': (currentUser) ? currentUser.token : ''
        }
    });
}