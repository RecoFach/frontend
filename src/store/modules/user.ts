/* eslint-disable no-shadow */
import { AUTH_LOGOUT, AUTH_SUCCESS } from '@/store/actions/auth';
import {
  USER_ERROR,
  USER_REQUEST,
  USER_SUCCESS,
  USER_UPDATE_INTEREST,
  USER_UPDATE_DETAILS,
  USER_UPDATE_PASSWORD
} from '@/store/actions/user';
import { User, UserState, Interests, Details } from '@/types/model';
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
  getInterests: (s: UserState) => s.profile?.interests,
  isProfileLoaded: (s: UserState) => !!s.profile?.username,
  isDetailsFull: (s: UserState) => !!s.profile?.name
};

const action = (
  context: { commit: Commit },
  url: string,
  method: 'get' | 'post' | 'delete' = 'get',
  data: unknown,
  info: string
) => {
  return new Promise((resolve, reject) => {
    context.commit(USER_REQUEST);
    console.log(`[Action User]: updating ${info} for: ${state.profile?.id} with ${data}`);
    axios({
      url,
      method,
      headers: { Authorization: getToken() },
      data
    })
      .then((resp) => {
        context.commit(USER_SUCCESS, resp.data);
        console.log(
          `[Action User]: 200: User interests were updated. Current state: ${state.profile}`
        );
        resolve(resp);
      })
      .catch((err) => {
        context.commit(USER_ERROR);
        console.log('[Action User]: 500: Something went wrong');
        reject(err);
      });
  });
};

const actions = {
  [USER_REQUEST]: ({ commit }: { commit: Commit }) => {
    return action({ commit }, `${USERS}${state.id}`, 'get', undefined, 'users information');
  },
  [USER_UPDATE_INTEREST]: ({ commit }: { commit: Commit }, interests: Interests) => {
    return action(
      { commit },
      `${USERS}${state.profile?.id}/interests`,
      'post',
      interests,
      'interests'
    );
  },
  [USER_UPDATE_DETAILS]: ({ commit }: { commit: Commit }, details: Details) => {
    return action(
      { commit },
      `${USERS}${state.profile?.id}/details`,
      'post',
      details,
      'users details'
    );
  },
  [USER_UPDATE_PASSWORD]: ({ commit }: { commit: Commit }, user: User) => {
    return action(
      { commit },
      `${USERS}${state.profile?.id}/password`,
      'post',
      user,
      'password details'
    );
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
