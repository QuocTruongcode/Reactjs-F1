import actionTypes from './actionTypes';
import {
    getAllCodeService, createNewUserService,
    getAllUsers, deleteUserSevice, editUserSevices, getTopDotorHomeService
} from "../../services/userService";
import { toast } from "react-toastify"

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService("GENDER");
            // console.log("check gender: ", res);
            // console.log("check getState: ", getState())
            if (res && res.data.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data.data))
            } else {
                dispatch(fetchGenderFaided());

            }

        } catch (e) {
            dispatch(fetchGenderFaided());
            console.log(" fetchGenderStart error: ", e)
        }
    }
}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFaided = () => ({
    type: actionTypes.FETCH_GENDER_FAIDED
})

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFaided = () => ({
    type: actionTypes.FETCH_POSITION_FAIDED
})

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFaided = () => ({
    type: actionTypes.FETCH_ROLE_FAIDED
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllCodeService("POSITION");
            // console.log("check position: ", res);
            // console.log("check getState: ", getState())
            if (res && res.data.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data.data))
            } else {
                dispatch(fetchPositionFaided());
                console.log("position faild")
            }

        } catch (e) {
            dispatch(fetchPositionFaided());
            console.log(" fetchPositionStart error: ", e)
        }
    }
}

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE");
            if (res && res.data.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data.data))
            } else {
                dispatch(fetchRoleFaided());
            }

        } catch (e) {
            dispatch(fetchRoleFaided());
            console.log(" fetchPositionStart error: ", e)
        }
    }
}

// ACTION CREATE USER REDUX
export const createNewUser = (data) => {

    return async (dispatch, getState) => {
        try {

            let res = await createNewUserService(data);
            if (res && res.data.errCode === 0) {
                toast.success("Create a new user succeed! ");
                dispatch(createUserSuccess());
                dispatch(fetchAllUsersStart())
            } else {
                dispatch(createUserFailded());
            }

        } catch (e) {
            dispatch(createUserFailded());
            console.log(" fetchPositionStart error: ", e)
        }
    }
}

export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const createUserFailded = () => ({
    type: actionTypes.CREATE_USER_FAILDED
})
// Fetch ALL Users
export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllUsers("ALL");
            if (res && res.data.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.data.users.reverse()))
            } else {
                dispatch(fetchAllUsersFaided());
            }

        } catch (e) {
            dispatch(fetchRoleFaided());
            console.log(" fetchPositionStart error: ", e)
        }
    }
}

export const fetchAllUsersSuccess = (users) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: users,
})

export const fetchAllUsersFaided = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAIDED,

})


export const deleteUserStart = (userId) => {

    return async (dispatch, getState) => {
        try {

            let res = await deleteUserSevice(userId);
            if (res && res.data.errCode === 0) {
                toast.success("Delete a user succeed! ");
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart())
            } else {
                toast.error("Delete a user error! ");
                dispatch(deleteUserfailded());
            }

        } catch (e) {
            toast.error("Delete a user error! ");
            dispatch(deleteUserfailded());
            console.log(" fetchPositionStart error: ", e)
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserfailded = () => ({
    type: actionTypes.DELETE_USER_FAILDED
})

// Edit user redux
export const editUserStart = (user) => {

    return async (dispatch, getState) => {
        try {

            let res = await editUserSevices(user);
            if (res && res.data.errCode === 0) {
                toast.success("Edit a user succeed! ");
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart())
            } else {
                toast.error("edit a user error! ");
                dispatch(editUserfailded());
            }

        } catch (e) {
            toast.error("Edit a user error! ");
            dispatch(editUserfailded());
            console.log(" edit use error: ", e)
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserfailded = () => ({
    type: actionTypes.EDIT_USER_FAILDED
})

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDotorHomeService("");

            if (res && res.data.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctor: res.data.data,
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAIDED,

                })
            }

        } catch (e) {
            console.log('FETCH_TOP_DOCTORS_FAIDED: ', e)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAIDED,
            })
        }
    }
}