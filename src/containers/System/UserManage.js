import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, deleteUserSevice, editUserSevices } from '../../services/userService';
import ModalUser from './ModalUser';
import { reject } from 'lodash';
import { emitter } from '../../utils/emitter';
import ModalEditUser from './ModalEditUser';
import ModalDeleteUser from './ModalDeleteUser';
import { use } from 'react';

class UserManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            isOpenModalDeleteUser: false,
            userDisplay: {},
        }
    }

    async componentDidMount() {
        await this.getAllUserFromReact();
    }

    getAllUserFromReact = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.data.errCode === 0) {
            this.setState({
                arrUsers: response.data.users,
            })
            // console.log('data all user: ', this.state.arrUsers);
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }

    toggleFromUserManage = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    toggleFromEditUserManage = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }

    createNewUser = async (data) => {
        try {
            let res = await createNewUserService(data);
            // console.log('creaNewUser', res);
            if (res.data.errCode !== 0) {
                alert(res.data.message);
            } else {
                alert("account created successfully");
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModalUser: false,
                })

                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            }
        } catch (e) {
            console.log("Error", e);
        }
    }

    handleDeleteUser = async (user) => {
        return new Promise(async (resolve, reject) => {
            try {

                let res = await deleteUserSevice(user.id);
                // console.log("Delete: ", res);
                if (res && res.data.errCode === 0) {
                    alert("Delete successfully");
                    this.toggleFromDeleteUserManage();
                    this.getAllUserFromReact();
                }
            } catch (e) {
                reject(e);
            }
        })

        // console.log("Delete", user);
    }

    handleEditUser = (user) => {
        // console.log("check User: ", user);
        this.setState({
            isOpenModalEditUser: true,
            userDisplay: user,
        })
    }

    doEditUser = async (user) => {
        let res = await editUserSevices(user);
        if (res.data.errCode !== 0) {
            alert(res.data.message);
        } else {
            alert(res.data.message);
            this.toggleFromEditUserManage();
            this.getAllUserFromReact();
        }
    }

    displayModalDeleteUser = (user) => {
        this.setState({
            isOpenModalDeleteUser: true,
            userDisplay: user,
        })
    }

    toggleFromDeleteUserManage = () => {
        this.setState({
            isOpenModalDeleteUser: false,

        })
    }



    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromUserManage={this.toggleFromUserManage}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFromUserManage={this.toggleFromEditUserManage}
                        currentUser={this.state.userDisplay}
                        eidtUser={this.doEditUser}
                    />
                }

                {this.state.isOpenModalDeleteUser &&
                    <ModalDeleteUser
                        isOpen={this.state.isOpenModalDeleteUser}
                        toggleFromDeleteUserManage={this.toggleFromDeleteUserManage}
                        currentUser={this.state.userDisplay}
                        handleDeleteUser={this.handleDeleteUser}
                    />
                }


                <div className="title text-center">Manager user</div>
                <div className='mx-1'>
                    <button className="btn btn-primary px-3" onClick={() => { this.handleAddNewUser() }}><i className="fas fa-plus"> </i>Add new user </button>
                </div>
                <div className="users-table mt-3 mx-1">
                    <table>
                        <tr>
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th className='address'>Address</th>
                            <th className='action'>Action</th>
                        </tr>
                        {arrUsers && arrUsers.map((item, index) => {
                            return (
                                <tr>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td className='btn'>
                                        <button className='btn-edit' onClick={() => { this.handleEditUser(item) }}><i className="fas fa-wrench"></i></button>
                                        <button className='btn-delete' onClick={() => { this.displayModalDeleteUser(item) }}><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            )
                        })
                        }

                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
