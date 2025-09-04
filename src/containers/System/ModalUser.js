import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address: "",
        }
    }
    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFromUserManage();
    }

    handleOnChangeInput = (event, id) => {
        // console.log("Phuong Anh: ", event.target.value, id);
        /**
         * bad code          * 
         * 
         */
        // this.state[id] = event.target.value;
        // this.setState({
        //     ...this.state
        // })

        this.setState({
            [id]: event.target.value
        })
    }

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


    handleAddNewUser = () => {
        let isValid = this.checkValideInput();
        if (isValid === true) {
            //call API create new User from sever
            this.props.createNewUser(this.state);
            // console.log('Thu Tra', this.state)
        }

    }


    render() {
        // console.log("check props: ", this.props);
        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size='lg'>
                <ModalHeader toggle={() => { this.toggle() }}>Modal title</ModalHeader>
                <ModalBody>
                    <div className='body-content'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, "email") }}
                                value={this.state.email}
                            ></input>
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input type='password'
                                onChange={(event) => { this.handleOnChangeInput(event, "password") }}
                                value={this.state.password}
                            ></input>
                        </div>
                        <div className='input-container'>
                            <label>Firts Name </label>
                            <input type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, "firstName") }}
                                value={this.state.firstName}
                            ></input>
                        </div>
                        <div className='input-container'>
                            <label>Last Name</label>
                            <input type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, "lastName") }}
                                value={this.state.lastName}
                            ></input>
                        </div>
                        <div className='input-container max-w'>
                            <label>Address</label>
                            <input type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, "address") }}
                                value={this.state.address}
                            ></input>
                        </div>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={() => { this.handleAddNewUser() }}>Create</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
