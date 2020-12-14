/* eslint-disable no-shadow */
import { AUTH_SUCCESS, AUTH_LOGOUT } from '@/store/actions/auth';
import { USER_REQUEST, USER_ERROR, USER_SUCCESS } from '@/store/actions/user';
import { User, UserState } from '@/types/model';
import { UserStatus } from '@/types/enum';
import { USERS } from '@/store/routes';
import { Commit } from 'vuex';
import axios from 'axios';

const getToken = () => localStorage.getItem('user-token') || '';

const state: UserState = {
  status: UserStatus.UNKNOWN,
  profile: null,
  id: localStorage.getItem('user-id') || ''
};

const getters = {
  getProfile: (s: UserState) => s.profile,
  isProfileLoaded: (s: UserState) => !!s.profile?.username
};

const actions = {
  [USER_REQUEST]: ({ commit }: { commit: Commit }) => {
    commit(USER_REQUEST);
    console.log(`[Mutation User]: found user with id: ${state.id}`);
    axios({ url: `${USERS}${state.id}`, method: 'get', headers: { Authorization: getToken() } })
      .then((resp) => {
        commit(USER_SUCCESS, resp.data);
        console.log('[Mutation User]: 200: User info was loaded');
      })
      .catch(() => {
        commit(USER_ERROR);
        console.log('[Mutation User]: 404: User was not loaded');
      });
  }
};

const mutations = {
  [USER_REQUEST]: (state: UserState) => {
    state.status = UserStatus.LOADING;
  },
  [USER_SUCCESS]: (state: UserState, resp: User) => {
    state.status = UserStatus.SUCCESS;
    state.profile = resp;
  },
  [USER_ERROR]: (state: UserState) => {
    state.status = UserStatus.ERROR;
  },
  [AUTH_SUCCESS]: (state: UserState, resp: { data: User }) => {
    state.profile = resp.data;
  },
  [AUTH_LOGOUT]: (state: UserState) => {
    state.status = UserStatus.UNKNOWN;
    state.profile = null;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
