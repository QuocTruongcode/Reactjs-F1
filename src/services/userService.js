import axios from '../axios'
const handleLoginApi = (email, password) => {
    return axios.post('api/login', { email, password });
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-user?id=${inputId}`);
}

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data);
}

const deleteUserSevice = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId,
        }
    });
}

const editUserSevices = (dataUser) => {
    return axios.put('/api/edit-user', dataUser);
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);

}

const getTopDotorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctors = () => {
    return axios.get(`api/get-all-doctors`)
}

const saveDetailDoctor = (data) => {
    return axios.post('/api/save-infor-doctors', data);

}

const getDetailInforDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}

const saveBulkScheduleDoctor = (data) => {
    return axios.post('/api/bulk-create-schedule', data)
}

const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}

const getExtraInforDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`)
}

const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}

const postPatientBookAppointment = (data) => {
    return axios.post('/api/patient-book-appointment', data)
}

const postVerifyBookAppointment = (data) => {
    return axios.post('/api/verify-book-appointment', data)
}

const getCheckBookingAppoinment = (date, timeType) => {
    return axios.get(`/api/checking-book-appointment?timeType=${timeType}&date=${date}`)
}

const postDetailSpecialties = (data) => {
    return axios.post('/api/post-detail-specialties', data)
}

const getDetailSpecialties = () => {
    return axios.get('/api/get-detail-specialties')
}

const getOneDetailSpecialties = (id) => {
    return axios.get(`/api/get-one-detail-specialties?id=${id}`)
}

const getAllDoctorsIdBySpecialtiesId = (SpecialtiesId) => {
    return axios.get(`/api/get-all-doctorsID-by-specialtiesId?SpecialtiesId=${SpecialtiesId}`)
}
export {
    handleLoginApi, getAllUsers,
    createNewUserService, deleteUserSevice,
    editUserSevices, getAllCodeService,
    getTopDotorHomeService,
    getAllDoctors, saveDetailDoctor,
    getDetailInforDoctor,
    saveBulkScheduleDoctor, getScheduleDoctorByDate,
    getExtraInforDoctorById, getProfileDoctorById,
    postPatientBookAppointment, postVerifyBookAppointment,
    getCheckBookingAppoinment, postDetailSpecialties,
    getDetailSpecialties, getOneDetailSpecialties,
    getAllDoctorsIdBySpecialtiesId
};