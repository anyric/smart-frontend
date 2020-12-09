import Vue from 'vue';
import Vuex from 'vuex';

import Router from '../router'
import Api from '@/services/api'

Vue.use(Vuex);

export default {
    state: {
        users: null,
    },
    getters: {
        USERS: (state) => {
            return state.users || []
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
            .catch(error =>{
                console.log(error.message + " get error");
            })
        },
        SAVE_USER: async ({dispatch}, user) => {
            if(user.pk){
                await Api().patch('/users/'+ user.pk +'/', user.data)
                .then(() => {
                    dispatch("GET_USERS");
                    Router.push({name: 'users'});
                })
                .catch(error =>{
                    console.log(error.message + " edit error")
                })
            }else{
                await Api().post('/users/', user)
                .then(() => {
                    dispatch("GET_USERS");
                    Router.push({name: 'users'});
                })
                .catch(error =>{
                    console.log(error.message + " post error")
                })
            }
        },

        REGISTER_PASSENGER: async ({dispatch}, passenger) => {
            await Api().post('/users/', passenger)
                .then(() => {
                    dispatch("GET_USERS");
                })
                .catch(error =>{
                    console.log(error.message + " post error")
                })
        },

        DELETE_USER: async ({dispatch}, user) => {
            if(user.id){
                await Api().delete('/users/' + user.id + '/')
                .then(() => {
                    dispatch("GET_USERS");
                    Router.push({name: 'users'});
                    console.log('deleted user' + user.id)
                })
                .catch(error=>{
                    console.log(error.message + " delete error")
                })
            }
        },
    },
}