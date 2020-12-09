import axios from 'axios';
import VueCookie from 'vue-cookie';

export default () =>{
    let currentUser = VueCookie.get('currentUser');
    if(currentUser){
        currentUser = JSON.parse(currentUser);
    }

    return axios.create({
        // baseURL: 'http://localhost:8000/api/v1',
        baseURL: 'http://192.168.43.32:8000/api/v1',
        xhrFields: {
            withCredentials: true
        },
        xsrfCookieName: 'csrftoken',
        xsrfHeaderName: 'X-CSRFToken',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': (currentUser) ? 'Bearer ' + currentUser.token : ''
        }
    });
}