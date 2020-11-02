import Vue from 'vue';
import Vuex from 'vuex';

import Router from '../router'
import Api from '@/services/api'

Vue.use(Vuex);

export default {
    state: {
        fleets: null,
    },
    getters: {
        FLEETS: (state) => {
            return state.fleets || []
        },
    },
    mutations: {
        SET_FLEETS: (state, fleets) => {
            state.fleets = fleets;
        },
    },
    actions: {
        GET_FLEETS: async ({commit}) => {
            await Api().get('/fleets/')
            .then((response) => {
                let data = response.data.results;
                if(data.length > 0){
                    commit('SET_FLEETS', data);
                }
            })
            .catch(error=>{
                console.log(error.message + " get error");
            })
        },
        SAVE_FLEET: async ({dispatch}, fleet) => {
            if(fleet.pk){
                await Api().patch('/fleets/' + fleet.pk + '/', fleet.data)
                .then(() => {
                    dispatch("GET_FLEETS");
                    Router.push({name: 'fleet-register'});
                })
                .catch(error=>{
                    console.log(error.message + " edit error")
                })
            }else{
                await Api().post('/fleets/', fleet)
                .then(() => {
                    dispatch("GET_FLEETS");
                    Router.push({name: 'fleet-register'});
                })
                .catch(error=>{
                    console.log(error.message + " post error")
                })
            }
        },
        DELETE_FLEET: async ({dispatch}, fleet) => {
            if(fleet.id){
                await Api().delete('/fleets/' + fleet.id + '/')
                .then(() => {
                    dispatch("GET_FLEETS");
                    Router.push({name: 'fleet-register'});
                    console.log('deleted fleet ' + fleet.id)
                })
                .catch(error=>{
                    console.log(error.message + " delete error")
                })
            }
        },
    },
}