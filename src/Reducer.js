// import {LOG_IN, LOG_OUT} from "../actions";

const initialState = {user: null, isLoading: false};
let user = localStorage.getItem('marketvisit-user');
if(user) {
    initialState.user = user;
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type){
        case 'LOG_IN':
            return {...state, user: action.payload.user};
        case 'LOG_OUT':
            return {...state, user: null};
        case 'START_LOADER':
            return {...state, isLoading: true};
        case 'END_LOADER':
            return {...state, isLoading: false};
        default:
            return state;
    }
}
export default AuthReducer;