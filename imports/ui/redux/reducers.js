/**
  * reducers allow you to 'slice' off a part of the single state object which
  * lets you think about the domain in a smaller picture. You could use one
  * reducer in a small app like this but in large apps this reducer could be
  * several hundred lines. See store.jsx to see how these reducers get 'combined'
  * into one single app state. We'll use two reducers, one for transient state
  * that the UI uses (selected id,name) and one for data (coming from Mongo)
  */

import { combineReducers } from 'redux';

Reducers = {};

let initialInterfaceState = {
    navigation: {
      expanded: false
    }
};

// helper to *copy* old state and merge new data with it
function merge(oldState, newState) {
    return _.extend({}, oldState, newState);
}

/**
  * these reducers *must* be pure to use time-travel dev-tools
  * never directly mutate the `state` param, use merge instead
  */
const userInterface = function userInterface(state = initialInterfaceState, action) {
    switch (action.type) {
        case 'TOGGLE_NAVIGATION_EXPANDED':
            const navigation = _.clone(state.navigation);
            navigation.expanded = !navigation.expanded;
            return merge(state, { navigation });
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    userInterface
});

export default rootReducer;
