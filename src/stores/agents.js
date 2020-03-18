import Vue from 'vue';
import Vuex from 'vuex';

import Router from '../router'
import Api from '@/service/api'

Vue.use(Vuex);

export default {
    state: {
        agents: [
            {
                id: 1,
                mobile: "+256700000000",
                username: "anyric",
                email: 'anyric@smart.com',
                firstName: 'Ric',
                lastName: 'Any',
                station:'Moyo',
                presentAdress: 'Elenderea',
                permanentAdress: 'Lefori',
                staff: false,
                active: true,
            },
            {
                id: 2,
                mobile: "+256701111111",
                username: "smart",
                email: 'info@smart.com',
                firstName: 'info',
                lastName: 'smart',
                station:'Kampala',
                presentAdress: 'Bukoto',
                permanentAdress: 'Wakiso',
                staff: true,
                active: true,
            }
        ],
    },
    getters: {
        AGENTS: (state) => {
            return state.agents || [];
        },
    },
    mutations: {
        SET_AGENTS: (state, agents) => {
            state.agents = agents;
        },
    },
    actions: {
        GET_AGENTS: async ({commit}) => {
            await Api().get('/agents')
            .then((response) => {
                commit('SET_AGENTS', response.data.results);
            })
            .catch(error=>{
                console.log(error.message + " get error");
            })
        },
        SAVE_AGENT: async ({dispatch}, agent) => {
            if(agent.pk){
                await Api().put('/agents', agent)
                .then((response) => {
                    dispatch("GET_AGENTS", response.data);
                    Router.push({name: 'agents'});
                })
                .catch(error=>{
                    console.log(error.message + " edit error")
                })
            }else{
                await Api().post('/agents', agent)
                .then((response) => {
                    dispatch("GET_AGENTS", response.data);
                    Router.push({name: 'agents'});
                })
                .catch(error=>{
                    console.log(error.message + " post error")
                })
            }
        },
    },
}