import Vue from 'vue';
import Vuex from 'vuex';

import Router from '../router'
import Api from '@/services/api'

Vue.use(Vuex);

export default {
    state: {
        agents: null,
    },
    getters: {
        AGENTS: (state) => {
            return state.agents || []
        },
    },
    mutations: {
        SET_AGENTS: (state, agents) => {
            state.agents = agents;
        },
    },
    actions: {
        GET_AGENTS: async ({commit}) => {
            await Api().get('/agents/')
            .then((response) => {
                let data = response.data.results;
                if(data.length > 0){
                    commit('SET_AGENTS', data);
                }
            })
            .catch(error=>{
                console.log(error.message + " get error");
            })
        },
        SAVE_AGENT: async ({dispatch}, agent) => {
            if(agent.pk){
                await Api().patch('/agents/' + agent.pk + '/', agent.data)
                .then((response) => {
                    dispatch("GET_AGENTS", response.data);
                    Router.push({name: 'agents'});
                })
                .catch(error=>{
                    console.log(error.message)
                })
            }else{
                await Api().post('/agents/', agent)
                .then(() => {
                    dispatch("GET_AGENTS");
                    Router.push({name: 'agents'});
                })
                .catch(error=>{
                    console.log(error.message)
                })
            }
        },

        DELETE_AGENT: async ({dispatch}, agent) => {
            if(agent.id){
                await Api().delete('/agents/' + agent.id + '/')
                .then(() => {
                    dispatch("GET_AGENTS");
                    Router.push({name: 'agents'});
                    console.log('deleted agent ' + agent.id)
                })
                .catch(error=>{
                    console.log(error.message + " delete error")
                })
            }
        },
    },
}