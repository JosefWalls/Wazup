const initialState = {
    SearchInput: '',
    UsersFound: ['']
};


const UPDATE_STATE = 'UPDATE_STATE';

export const updateState = (e) => {
    return {
        type: UPDATE_STATE,
        payload: e
    }
};

export default function reducer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case  `UPDATE_STATE`:
            return {...state, ...payload}
        default:
            return state;
    }
}