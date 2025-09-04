import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, deleteUserSevice } from '../../services/userService';
import ModalUser from './ModalUser';
import { reject } from 'lodash';

class UserManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
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
                    this.getAllUserFromReact();
                } else {
                    alert("Delete User Failed");
                }
            } catch (e) {
                reject(e);
            }
        })

        // console.log("Delete", user);
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
                                        <button className='btn-edit'><i className="fas fa-wrench"></i></button>
                                        <button className='btn-delete' onClick={() => { this.handleDeleteUser(item) }}><i className="fas fa-trash"></i></button>
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
