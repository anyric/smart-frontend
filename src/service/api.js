import axios from 'axios';

export default () =>{
    return axios.create({
        baseURL: 'http://localhost:8000/api/v1',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo2LCJ1c2VybmFtZSI6IisyNTY3MDAwMDA5OTkiLCJleHAiOjE1ODQwNDM1MzYsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsIm1vYmlsZSI6IisyNTY3MDAwMDA5OTkifQ.RMWeDR3H1rUrAHqzSS6Viyyd7GHGkJLyuVTdEiwauzM"
        }
    });
}