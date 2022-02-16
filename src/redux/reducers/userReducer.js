import * as actions from "../constants/action-type";

const initialState = [];
const userReducer = (state = initialState, action) => {

    switch (action.type) {

        case actions.SET_USERS:
            localStorage.clear();
            localStorage.setItem("users", JSON.stringify(action.payload));
            return [ ...state, ...action.payload ];

        case actions.DELETE_USER:
            // let values = [];
            state = state.filter((user) => user.id !== action.payload);
            localStorage.setItem("users", JSON.stringify(state));
            return state;

        case actions.UPDATE_USER:
            state.map((record) => {
                if (record.id == action.payload.id) {
                    record.first_name = action.payload.first_name;
                    record.last_name = action.payload.last_name;
                    record.email = action.payload.email;
                }
            });
            localStorage.setItem("users", JSON.stringify(state));
            return state;
        default:
            return state;
    }

};

export default userReducer;