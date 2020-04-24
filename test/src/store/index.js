import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import reducer from '../reducer/index';

const enhancer = compose(applyMiddleware(thunk));

const store = createStore(reducer, enhancer);

export default store;
