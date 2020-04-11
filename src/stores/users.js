import Vue from 'vue';
import Vuex from 'vuex';

import Router from '../router'
import Api from '@/service/api'

Vue.use(Vuex);

export default {
    state: {
        users: null,
        defaultUsers: [
            {
                id: 1,
                mobile: "+256700000000",
                username: "anyric",
                email: 'anyric@smart.com',
                firstName: 'Ric',
                lastName: 'Any',
                is_staff: false,
                is_active: true,
                is_admin: false
            },
            {
                id: 2,
                mobile: "+256701111111",
                username: "smart",
                email: 'info@smart.com',
                firstName: 'smart',
                lastName: 'info',
                is_staff: true,
                is_active: true,
                is_admin: false
            }
        ],
    },
    getters: {
        USERS: (state) => {
            return state.users || state.defaultUsers;
        },
    },
    mutations: {
        SET_USERS: (state, payload) => {
            state.users = payload;
        },
    },
    actions: {
        GET_USERS: async ({commit}) => {
            await Api().get('/users/')
            .then((response) => {
                let data = response.data.results;
                if(data.length > 0){
                    commit('SET_USERS', response.data.results);
                }
            })
            .catch(error=>{
                console.log(error.message + " get error");
            })
        },
        SAVE_USER: async ({dispatch}, user) => {
            if(user.pk){
                await Api().patch('/users/'+ user.pk +'/', user.data)
                .then(() => {
                    // console.log(response.data);
                    dispatch("GET_USERS");
                    Router.push({name: 'users'});
                })
                .catch(error=>{
                    console.log(error.message + " edit error")
                })
            }else{
                await Api().post('/users/', user)
                .then(() => {
                    // console.log(response.data)
                    dispatch("GET_USERS");
                    Router.push({name: 'users'});
                })
                .catch(error=>{
                    console.log(error.message + " post error")
                })
            }
        },
    },
}