import * as ActionTypes from './ActionTypes';

export const celebs = (state = { isLoading: true,
                                     errMess: null,
                                     celebs: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_CELEBS:
            return {...state, isLoading: false, errMess: null, celebs: action.payload};

        case ActionTypes.CELEBS_LOADING = 'CELEBS_LOADING':
            return {...state, isLoading: true, errMess: null, celebs: []}

        case ActionTypes.CELEBS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
      }
};