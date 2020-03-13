import axios from 'axios';

export default () =>{
    let currentUser = localStorage.getItem('currentUser');
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