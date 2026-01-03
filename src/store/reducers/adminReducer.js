import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctor: [],
    allDoctor: [],
    allScheduleTime: [],
    getRequiredDoctorInfor: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.FETCH_GENDER_START:

            state.isLoadingGender = true;

            return {
                ...state,

            }


        case actionTypes.FETCH_GENDER_SUCCESS:

            state.genders = action.data;
            state.isLoadingGender = false;

            return {
                ...state,

            }

        case actionTypes.FETCH_GENDER_FAIDED:

            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state,
            }
        // Position
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state,
            }

        case actionTypes.FETCH_POSITION_FAIDED:
            state.positions = [];
            return {
                ...state,
            }

        // Role

        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state,
            }

        case actionTypes.FETCH_ROLE_FAIDED:
            state.roles = [];
            return {
                ...state,
            }
        // All user
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_USERS_FAIDED:
            state.users = [];
            return {
                ...state,
            }
        // get top doctor
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.topDoctor = action.dataDoctor;
            return {
                ...state,
            }

        case actionTypes.FETCH_TOP_DOCTORS_FAIDED:
            state.topDoctor = [];
            return {
                ...state,
            }
        // All doctor
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctor = action.dataDoctor;
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_DOCTORS_FAIDED:
            state.topDoctor = [];
            return {
                ...state,
            }
        // Get time
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.dataTime;
            return {
                ...state,
            }

        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIDED:
            state.allScheduleTime = [];
            return {
                ...state,
            }

        // get infor doctor

        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
            state.getRequiredDoctorInfor = action.data;
            return {
                ...state,
            }

        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAIDED:
            state.getRequiredDoctorInfor = [];
            return {
                ...state,
            }

        default:
            return state;
    }

}

export default adminReducer;