import Vue from 'vue';
import Vuex from 'vuex';

import Router from '../router'
import Api from '@/services/api'

Vue.use(Vuex);

export default {
    state: {
        roleObjectPermissions: null,
    },
    getters: {
        ROLEOBJECTPERMISSIONS: (state) => {
            return state.roleObjectPermissions || []
        },
    },
    mutations: {
        SET_ROLEOBJECTPERMISSION: (state, roleObjectPermission) => {
            state.roleObjectPermissions = roleObjectPermission;
        },
    },
    actions: {
        GET_ROLEOBJECTPERMISSIONS: async ({commit}) => {
            await Api().get('/assigned-permissions/')
            .then((response) => {
                let data = response.data.results;
                if(data.length > 0){
                    commit('SET_ROLEOBJECTPERMISSION', response.data.results);
                }
            })
            .catch(error=>{
                console.log(error.message + " get error");
            })
        },

        SAVE_ROLEOBJECTPERMISSIONS: async ({dispatch}, roleObjectPermission) => {
            if(roleObjectPermission.pk){
                await Api().patch('/assigned-permissions/' + roleObjectPermission.pk + '/', roleObjectPermission.data)
                .then(() => {
                    dispatch("GET_ROLEOBJECTPERMISSIONS");
                    Router.push({name: 'role-permissions'});
                })
                .catch(error=>{
                    console.log(error.message + " edit error")
                })
            }else{
                await Api().post('/assigned-permissions/', roleObjectPermission)
                .then(() => {
                    dispatch("GET_ROLEOBJECTPERMISSIONS");
                    Router.push({name: 'role-permissions'});
                })
                .catch(error=>{
                    console.log(error.message + " post error")
                })
            }
        },

        DELETE_ROLE: async ({dispatch}, roleObjectPermission) => {
            if(roleObjectPermission.id){
                await Api().delete('/assigned-permissions/' + roleObjectPermission.id + '/')
                .then(() => {
                    dispatch("GET_ROLEOBJECTPERMISSIONS");
                    Router.push({name: 'role-permissions'});
                    console.log('deleted role permission ' + roleObjectPermission.id)
                })
                .catch(error=>{
                    console.log(error.message + " delete error")
                })
            }
        },
    },
}
