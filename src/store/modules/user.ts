/* eslint-disable no-shadow */
import { AUTH_LOGOUT, AUTH_SUCCESS } from '@/store/actions/auth';
import { USER_ERROR, USER_REQUEST, USER_SUCCESS, USER_UPDATE_INTEREST } from '@/store/actions/user';
import { User, UserState } from '@/types/model';
import { UserStatus } from '@/types/enum';
import { USERS } from '@/store/routes';
import { Commit } from 'vuex';
import axios from 'axios';
import { Interests } from '@/types/model/Interests';

const getToken = () => localStorage.getItem('user-token') || '';

const state: UserState = {
  status: UserStatus.UNKNOWN,
  profile: null
};

const getters = {
  getProfile: (s: UserState) => s.profile,
  getInterests: (s: UserState) => s.profile?.interests,
  isProfileLoaded: (s: UserState) => !!s.profile?.username
};

const actions = {
  [USER_REQUEST]: ({ commit }: { commit: Commit }) => {
    commit(USER_REQUEST);
    console.log(`[Mutation User]: found user with id: ${state.profile?.id}`);
    axios({
      url: `${USERS}${state.profile?.id}`,
      method: 'get',
      headers: { Authorization: getToken() }
    })
      .then((resp) => {
        commit(USER_SUCCESS, resp.data);
        console.log('[Mutation User]: 200: User info was loaded');
      })
      .catch(() => {
        commit(USER_ERROR);
        console.log('[Mutation User]: 404: User was not loaded');
      });
  },
  [USER_UPDATE_INTEREST]: ({ commit }: { commit: Commit }, interests: Interests) => {
    commit(USER_UPDATE_INTEREST);
    console.log(`[Mutation User]: updating interests for: ${state.profile?.id} with ${interests}`);
    axios({
      url: `${USERS}${state.profile?.id}/interests`,
      method: 'post',
      headers: { Authorization: getToken() },
      data: interests
    })
      .then((resp) => {
        commit(USER_SUCCESS, resp.data);
        console.log('resp', resp);
        console.log('user', state.profile);
        console.log('[Mutation User]: 200: User info was updated');
      })
      .catch(() => {
        commit(USER_ERROR);
        console.log('[Mutation User]: 500: Something went wrong');
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
  [USER_UPDATE_INTEREST]: (state: UserState) => {
    state.status = UserStatus.LOADING;
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
