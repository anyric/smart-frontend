import Vue from 'vue';
import Vuex from 'vuex';

import Router from '../router'
import Api from '@/services/api'

Vue.use(Vuex);

export default {
    state: {
        permissions: null,
    },
    getters: {
        PERMISSIONS: (state) => {
            return state.permissions || []
        },
    },
    mutations: {
        SET_PERMISSION: (state, permission) => {
            state.permissions = permission;
        },
    },
    actions: {
        GET_PERMISSIONS: async ({commit}) => {
            await Api().get('/permissions/')
            .then((response) => {
                let data = response.data.results;
                if(data.length > 0){
                    commit('SET_PERMISSION', response.data.results);
                }
            })
            .catch(error=>{
                console.log(error.message + " get error");
            })
        },

        SAVE_PERMISSION: async ({dispatch}, permission) => {
            if(permission.pk){
                await Api().patch('/permissions/' + permission.pk + '/', permission.data)
                .then(() => {
                    dispatch("GET_PERMISSIONS");
                    Router.push({name: 'permissions'});
                })
                .catch(error=>{
                    console.log(error.message + " edit error")
                })
            }else{
                await Api().post('/permissions/', permission)
                .then(() => {
                    dispatch("GET_PERMISSIONS");
                    Router.push({name: 'permissions'});
                })
                .catch(error=>{
                    console.log(error.message + " post error")
                })
            }
        },

        DELETE_PERMISSION: async ({dispatch}, permission) => {
            if(permission.id){
                await Api().delete('/permissions/' + permission.id + '/')
                .then(() => {
                    dispatch("GET_PERMISSIONS");
                    Router.push({name: 'permissions'});
                    console.log('deleted permissions ' + permission.id)
                })
                .catch(error=>{
                    console.log(error.message + " delete error")
                })
            }
        },
    },
}
