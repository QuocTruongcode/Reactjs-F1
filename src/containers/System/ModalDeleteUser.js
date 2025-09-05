import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _ from 'lodash';
import { use } from 'react';
class ModalDeleteUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address: "",
        }
    }

    componentDidMount() {
        // console.log("Did mount edit user: ", this.props.currentUser);
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: "123456",
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
            })
        }
    }

    toggle = () => {
        this.props.toggleFromDeleteUserManage();
    }

    // handleOnChangeInput = (event, id) => {
    //     this.setState({
    //         [id]: event.target.value
    //     })
    // }

    checkValideInput = () => {
        let isValid = true;
        let arrValue = ["email", "password", "firstName", "lastName", "address"];
        for (let i = 0; i < arrValue.length; i++) {
            if (!this.state[arrValue[i]]) {
                isValid = false;
                alert('You missing ' + arrValue[i]);
                break;
            }
        }
        return isValid;
    }


    // handleAddNewUser = () => {
    //     let isValid = this.checkValideInput();
    //     if (isValid === true) {
    //         //call API create new User from sever
    //         this.props.createNewUser(this.state);

    //     }
    // }

    // handleEditUser = () => {
    //     let isValid = this.checkValideInput();
    //     if (isValid === true) {
    //         //call API edit user from sever
    //         this.props.eidtUser(this.state);
    //     }
    // }

    deleteUser = () => {
        let isValid = this.checkValideInput();
        if (isValid === true) {
            //call API edit user from sever
            this.props.handleDeleteUser(this.state);
        }
    }



    render() {
        console.log('check props', this.props.currentUser);

        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size='lg'>
                <ModalHeader toggle={() => { this.toggle() }}>Are you sure you want to delete this user?</ModalHeader>
                <ModalBody>
                    <div className='body-content'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type='email'
                                // onChange={(event) => { this.handleOnChangeInput(event, "email") }}
                                value={this.state.email}
                                disabled
                            ></input>
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input type='password'
                                // onChange={(event) => { this.handleOnChangeInput(event, "password") }}
                                value={this.state.password}
                                disabled
                            ></input>
                        </div>
                        <div className='input-container'>
                            <label>Firts Name </label>
                            <input type='text'
                                // onChange={(event) => { this.handleOnChangeInput(event, "firstName") }}
                                value={this.state.firstName}
                                disabled
                            ></input>
                        </div>
                        <div className='input-container'>
                            <label>Last Name</label>
                            <input type='text'
                                // onChange={(event) => { this.handleOnChangeInput(event, "lastName") }}
                                value={this.state.lastName}
                                disabled
                            ></input>
                        </div>
                        <div className='input-container max-w'>
                            <label>Address</label>
                            <input type='text'
                                // onChange={(event) => { this.handleOnChangeInput(event, "address") }}
                                value={this.state.address}
                                disabled
                            ></input>
                        </div>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={() => { this.deleteUser() }}>Delete</Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>Cancel</Button>
                </ModalFooter>
            </Modal>

        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalDeleteUser);
