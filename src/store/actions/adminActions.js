import actionTypes from './actionTypes';
import { getAllCodeService } from "../../services/userService";


// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("GENDER");
            // console.log("check gender: ", res);
            console.log("check getState: ", getState())
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
