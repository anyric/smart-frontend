import Vue from 'vue';
import Vuex from 'vuex';

import Router from '../router'
import Api from '@/services/api'

Vue.use(Vuex);

export default {
    state: {
        tickets: null,
        ticket_list: null,
        defaulttickets: [
            {
                id: 1,
                ticket_no: "90029201920292039875",
                passenger: 4,
                ticket_trip: 1,
                mobile: "+256783018864",
                status: "Pending",
            },
            {
                id: 2,
                ticket_no: "56702923451920292039",
                passenger: 2,
                ticket_trip: 1,
                mobile: "+256783018864",
                status: "Pending",
            },
            {
                id: 3,
                ticket_no: "56538922929834851211",
                passenger: 3,
                ticket_trip: 1,
                mobile: "+256783018864",
                status: "Pending",
            }
        ],
    },
    getters: {
        TICKETS: (state) => {
            return state.tickets || state.defaulttickets;
        },
        TICKET_LIST: (state) => {
            return state.ticket_list
        }
    },
    mutations: {
        SET_TICKETS: (state, tickets) => {
            state.tickets = tickets;
        },
        SET_TICKET_LIST: (state, ticket_list) => {
            state.ticket_list = ticket_list;
        },
    },
    actions: {
        GET_TICKETS: async ({commit}) => {
            await Api().get('/tickets/')
            .then((response) => {
                let data = response.data.results;
                if(data.length > 0){
                    commit('SET_TICKETS', data);
                }
            })
            .catch(error=>{
                console.log(error.message + " get error");
            })
        },
        GET_TICKET_LIST: async ({commit}) => {
            await Api().get('/ticket-list/')
            .then((response) => {
                let data = response.data.results;
                console.log("ticket list")
                console.log(data)
                if(data.length > 0){
                    commit('SET_TICKET_LIST', data);
                }
            })
            .catch(error=>{
                console.log(error.message + " get error");
            })
        },
        SAVE_TICKET: async ({dispatch}, ticket) => {
            if(ticket.pk){
                await Api().patch('/tickets/' + ticket.pk + '/', ticket.data)
                .then(() => {
                    dispatch("GET_TICKETS");
                    Router.push({name: 'trip-ticket'});
                })
                .catch(error=>{
                    console.log(error.message + " edit error")
                })
            }else{
                await Api().post('/tickets/', ticket)
                .then(() => {
                    dispatch("GET_TICKETS");
                    Router.push({name: 'trip-ticket'});
                })
                .catch(error=>{
                    console.log(error.message + " post error")
                })
            }
        },
    },
}