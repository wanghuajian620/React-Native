import {INCREMENT, DECREMENT} from '../action/actionTypes';

const defaultState = {
  count: 26,
};

export default (state = defaultState, action) => {
  if (action.type === INCREMENT) {
    let newState = JSON.parse(JSON.stringify(state));
    newState.count++;
    return newState;
  }
  if (action.type === DECREMENT) {
    let newState = JSON.parse(JSON.stringify(state));
    newState.count--;
    return newState;
  }
  return state;
};
