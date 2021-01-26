import Vue from 'vue';
import Vuex from 'vuex';

import Router from '../router'
import Api from '@/services/api'

Vue.use(Vuex);

export default {
    state: {
        roles: null,
    },
    getters: {
        ROLES: (state) => {
            return state.roles || []
        },
    },
    mutations: {
        SET_ROLES: (state, role) => {
            state.roles = role;
        },
    },
    actions: {
        GET_ROLES: async ({commit}) => {
            await Api().get('/roles/')
            .then((response) => {
                let data = response.data.results;
                if(data.length > 0){
                    commit('SET_ROLES', response.data.results);
                }
            })
            .catch(error=>{
                console.log(error.message + " get error");
            })
        },

        SAVE_ROLE: async ({dispatch}, role) => {
            if(role.pk){
                await Api().patch('/roles/' + role.pk + '/', role.data)
                .then(() => {
                    dispatch("GET_ROLES");
                    Router.push({name: 'roles'});
                })
                .catch(error=>{
                    console.log(error.message + " edit error")
                })
            }else{
                await Api().post('/roles/', role)
                .then(() => {
                    dispatch("GET_ROLES");
                    Router.push({name: 'roles'});
                })
                .catch(error=>{
                    console.log(error.message + " post error")
                })
            }
        },

        DELETE_ROLE: async ({dispatch}, role) => {
            if(role.id){
                await Api().delete('/roles/' + role.id + '/')
                .then(() => {
                    dispatch("GET_ROLES");
                    Router.push({name: 'roles'});
                    console.log('deleted role ' + role.id)
                })
                .catch(error=>{
                    console.log(error.message + " delete error")
                })
            }
        },
    },
}
