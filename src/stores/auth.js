import Vue from 'vue';
import Vuex from 'vuex';

import Router from '../router'
import Api from '@/service/api'

Vue.use(Vuex);

export default {
    state: {
        currentUser: null,
    },
    getters: {
        GET_LOGGED_IN_USER: (state) => {
            return state.currentUser;
        },
        IS_LOGGED_IN: (state) => {
            return state.currentUser && state.currentUser.token;
        },
    },
    mutations: {
        SET_LOGGED_IN_USER: (state, user) => {
            state.currentUser = user;
        },
        SET_LOGGED_OUT_USER: (state) => {
            state.currentUser = {};
            window.localStorage.currentUser = JSON.stringify({});
        },
        SET_IS_LOGGED_IN: (state, payload) => {
            state.isLogin = payload;
        },
    },
    actions: {
        SET_CURRENT_USER: ({commit}, payload) => {
            commit('SET_LOGGED_IN_USER', payload);
        },
        LOGIN: async ({commit}, user) => {
            await Api().post('/auth/login/', user)
            .then((response) => {
                let user = response.data;
                console.log(user)
                commit('SET_LOGGED_IN_USER', user);
                localStorage.setItem('currentUser',JSON.stringify(user));
                Router.push({name: 'dashboard'});
                location.reload(true);
            })
            .catch(error=>{
                console.log(error.message + " login error")
            })
        },
        LOGOUT: async ({commit}) => {
            await Api().post('/auth/logout/')
            .then(() => {
                commit('SET_LOGGED_OUT_USER');
                localStorage.removeItem('currentUser');
                location.reload(true);
            })
            .catch(error=>{
                console.log(error.message + " logout error")
            })
        },
    },
}