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

export {
    handleLoginApi, getAllUsers,
    createNewUserService, deleteUserSevice,
    editUserSevices, getAllCodeService,
    getTopDotorHomeService,
    getAllDoctors, saveDetailDoctor,
    getDetailInforDoctor,
    saveBulkScheduleDoctor
};