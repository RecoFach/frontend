/* eslint-disable no-shadow */
import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT } from '@/store/actions/auth';
import { BACKEND } from '@/store/routes';
import { AuthStatus } from '@/types/enum';
import { Commit } from 'vuex';

import { User, AuthState } from '@/types/model';

import axios from 'axios';

const state: AuthState = {
  token: localStorage.getItem('user-token') || '',
  id: localStorage.getItem('user-id') || '',
  status: AuthStatus.UNKNOWN,
  hasLoadedOnce: false
};

const getters = {
  isAuthenticated: (s: AuthState) => !!s.token,
  authStatus: (s: AuthState) => s.status
};

const setUp = (userToken: string, userId: string) => {
  localStorage.setItem('user-token', userToken);
  localStorage.setItem('user-id', userId);
};

const cleanUp = () => {
  localStorage.removeItem('user-token');
  localStorage.removeItem('user-id');
};

const actions = {
  [AUTH_REQUEST]: ({ commit }: { commit: Commit }, user: User) => {
    return new Promise((resolve, reject) => {
      console.log('[Mutation Auth]: Auth request');
      commit(AUTH_REQUEST);
      axios
        .post(`${BACKEND}/login`, user)
        .then((resp) => {
          console.log('[Mutation Auth]: token - ', resp.headers.authorization);
          console.log('[Mutation Auth]: user  - ', resp.data);
          setUp(resp.headers.authorization, resp.data.id);
          // Here set the header of your ajax library to the token value.
          // example with axios
          // axios.defaults.headers.common['Authorization'] = resp.token
          commit(AUTH_SUCCESS, resp);
          resolve(resp);
        })
        .catch((err) => {
          commit(AUTH_ERROR, err);
          console.log('[Mutation Auth]: Error ', err);
          cleanUp();
          reject(err);
        });
    });
  },
  [AUTH_LOGOUT]: ({ commit }: { commit: Commit }) => {
    return new Promise((resolve) => {
      console.log('[Mutation Auth]: Logout request');
      commit(AUTH_LOGOUT);
      cleanUp();
      resolve('');
    });
  }
};

const mutations = {
  [AUTH_REQUEST]: (state: AuthState) => {
    state.status = AuthStatus.LOADING;
  },
  [AUTH_SUCCESS]: (state: AuthState, resp: { headers: { authorization: string } }) => {
    state.status = AuthStatus.SUCCESS;
    state.token = resp.headers.authorization;
    state.hasLoadedOnce = true;
  },
  [AUTH_ERROR]: (state: AuthState) => {
    state.status = AuthStatus.ERROR;
    state.hasLoadedOnce = true;
  },
  [AUTH_LOGOUT]: (state: AuthState) => {
    state.token = '';
    state.id = '';
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
