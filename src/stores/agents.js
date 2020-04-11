import Vue from 'vue';
import Vuex from 'vuex';

import Router from '../router'
import Api from '@/service/api'

Vue.use(Vuex);

export default {
    state: {
        agents: null,
        defaultAgents: [
            {
                id: 1,
                mobile: "+256700000000",
                username: "anyric",
                email: 'anyric@smart.com',
                first_name: 'Ric',
                last_name: 'Any',
                station:'Moyo',
                present_address: 'Elenderea',
                permanent_address: 'Lefori',
                is_staff: false,
                is_active: true,
            },
            {
                id: 2,
                mobile: "+256701111111",
                username: "smart",
                email: 'info@smart.com',
                first_name: 'info',
                last_name: 'smart',
                station:'Kampala',
                present_address: 'Bukoto',
                permanent_address: 'Wakiso',
                is_staff: true,
                is_active: true,
            }
        ],
    },
    getters: {
        AGENTS: (state) => {
            return state.agents || state.defaultAgents;
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
    },
}