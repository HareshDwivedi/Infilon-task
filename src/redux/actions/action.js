import * as actions from "../constants/action-type";

export const setUsers = (users) => {
    return {
        type: actions.SET_USERS,
        payload: users
    };
};

export const deleteUser = (id) => {
    return {
        type: actions.DELETE_USER,
        payload: id,
    };
};

export const updateUser = (userDetails) => {
    return {
        type: actions.UPDATE_USER,
        payload: userDetails
    };
};