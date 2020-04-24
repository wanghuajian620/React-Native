import {INCREMENT, DECREMENT} from './actionTypes';

export const handleAddAction = () => ({
  type: INCREMENT,
});

export const handleLessAction = () => ({
  type: DECREMENT,
});
