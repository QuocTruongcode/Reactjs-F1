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

export { handleLoginApi, getAllUsers, createNewUserService, deleteUserSevice, editUserSevices, getAllCodeService };