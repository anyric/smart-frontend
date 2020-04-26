import Vue from 'vue';
import Vuex from 'vuex';
import VueCookie from 'vue-cookie';

import Router from '../router'
import Api from '@/services/api'

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
                commit('SET_LOGGED_IN_USER', user);
                VueCookie.set('currentUser', JSON.stringify(user), 1);
                Router.push({name: 'dashboard'});
                location.reload(true);
            })
            .catch(error=>{
                console.log(error.message, "login error")
            })
        },
        LOGOUT: async ({commit}) => {
            await Api().post('/auth/logout/')
            .then(() => {
                commit('SET_LOGGED_OUT_USER');
                Router.push({name: 'login'});
                location.reload(true);
                VueCookie.delete('currentUser');
            })
            .catch(error=>{
                console.log(error.message, "logout error")
            })
        },
        CHANGE_PASSWORD: async (password) => {
            await Api().post('/auth/password/change/', password)
            .then((response) => {
                console.log(response.data)
                location.reload(true);
            })
            .catch(error=>{
                console.log(error.message, "login error")
            })
        }
    },
}