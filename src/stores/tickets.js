import Vue from 'vue';
import Vuex from 'vuex';

import Router from '../router'
import Api from '@/services/api'

Vue.use(Vuex);

export default {
    state: {
        tickets: null,
        ticket_list: null,
    },
    getters: {
        TICKETS: (state) => {
            return state.tickets || [];
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
                    console.log('edited ticket' + ticket.pk)
                })
                .catch(error=>{
                    console.log(error.message + " edit error")
                })
            }else{
                await Api().post('/tickets/', ticket)
                .then(() => {
                    dispatch("GET_TICKETS");
                    // Router.push({name: 'trip-ticket'});
                })
                .catch(error=>{
                    console.log(error.message + " post error")
                })
            }
        },
        DELETE_TICKET: async ({dispatch}, ticket) => {
            if(ticket.id){
                await Api().delete('/tickets/' + ticket.id + '/')
                .then(() => {
                    dispatch("GET_TICKETS");
                    Router.push({name: 'trip-ticket'});
                    console.log('deleted ticket' + ticket.id)
                })
                .catch(error=>{
                    console.log(error.message + " delete error")
                })
            }
        },
    },
}