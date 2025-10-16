import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from "../../../services/userService";
import { languages, CRUD_ACTIONS } from "../../../utils";
import * as actions from "../../../store/actions";
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import TableManageUser from './TableManageUser';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImg: "",
            isOpen: false,

            userId: "",
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            address: "",
            gender: "",
            position: "",
            role: "",
            avatar: "",

            actions: "",
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositoinsStart();
        this.props.getRoleStart();


        // try {
        //     let res = await getAllCodeService('gender');
        //     if (res && res.data.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data.data,
        //         })

        //     }

        // } catch (e) {
        //     console.log(e)
        // }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : ''
            })
        }

        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPosition = this.props.positionRedux;
            this.setState({
                positionArr: arrPosition,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].key : ''
            })
        }

        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux;
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : ''
            })
        }

        if (prevProps.listUsers !== this.props.listUsers) {
            let arrGenders = this.props.genderRedux;
            let arrPosition = this.props.positionRedux;
            let arrRoles = this.props.roleRedux;
            this.setState({

                email: "",
                password: "",
                firstName: "",
                lastName: "",
                phoneNumber: "",
                address: "",

                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : '',
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].key : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : '',

                actions: CRUD_ACTIONS.CREATE
            })
        }
    }

    handleOnChangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objectURL = URL.createObjectURL(file);
            this.setState({
                previewImg: objectURL,
                avatar: file
            });

        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImg) return;
        this.setState({
            isOpen: true
        })
    }
    checkValideInput = () => {
        let isValid = true;
        let arrValue = ["email", "password", "firstName", "lastName", "phoneNumber", "address"];
        for (let i = 0; i < arrValue.length; i++) {
            if (!this.state[arrValue[i]]) {
                isValid = false;
                alert('You missing ' + arrValue[i]);
                break;
            }
        }
        return isValid;
    }
    handleSaveUser = () => {
        let isValid = this.checkValideInput();
        if (isValid === false) return;

        let { actions } = this.state;
        // Create new user
        if (actions === CRUD_ACTIONS.CREATE) {
            this.props.createNewUser({
                userId: this.state.id,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleid: this.state.role,
                positionId: this.state.position,
            })
        }
        //Edit a user
        if (actions === CRUD_ACTIONS.EDIT) {
            this.props.editUserStart({
                id: this.state.userId,
                email: this.state.email,

                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleid: this.state.role,
                positionId: this.state.position,
            })

        }

    }

    onChangeInput = (event, id) => {
        console.log("check onchange input: ", event.target.value)
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        },
        )


    }

    handleEditUserFromParent = (user) => {
        console.log("check handle edit user from UserRedux: ", user)
        this.setState({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            password: "HARDPASSWORD",
            phoneNumber: user.phonenumber,
            address: user.address,

            gender: user.gender,
            position: user.positiontId,
            role: user.roleid,
            userId: user.id,

            actions: CRUD_ACTIONS.EDIT
        })
    }

    render() {

        // let genders = this.state.genderArr;
        let language = this.props.language;
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;

        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar } = this.state

        return (
            <div className='user-redux-container'>
                <div className="title" >User Redux Nguyen Quoc Truong</div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'><FormattedMessage id="manage-user.add" /></div>
                            <div className='col-3'>
                                <label> <FormattedMessage id="manage-user.email" /></label>
                                <input className='form-control' type='email' value={email}
                                    onChange={(event) => { this.onChangeInput(event, 'email') }}
                                    disabled={this.state.actions === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>

                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.passWord" /> </label>
                                <input className='form-control' type='password' value={password}
                                    onChange={(event) => { this.onChangeInput(event, 'password') }}
                                    disabled={this.state.actions === CRUD_ACTIONS.EDIT ? true : false} />
                            </div>

                            <div className='col-3'>
                                <label> <FormattedMessage id="manage-user.firstName" /></label>
                                <input className='form-control' type='text' value={firstName}
                                    onChange={(event) => { this.onChangeInput(event, 'firstName') }} />
                            </div>

                            <div className='col-3'>
                                <label> <FormattedMessage id="manage-user.lastName" /></label>
                                <input className='form-control' type='text' value={lastName}
                                    onChange={(event) => { this.onChangeInput(event, 'lastName') }} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.phoneNumble" /></label>
                                <input className='form-control' type='text' value={phoneNumber}
                                    onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }} />
                            </div>

                            <div className='col-9'>
                                <label> <FormattedMessage id="manage-user.address" /></label>
                                <input className='form-control' type='text' value={address}
                                    onChange={(event) => { this.onChangeInput(event, 'address') }} />
                            </div>

                            <div className='col-3'>
                                <label> <FormattedMessage id="manage-user.gender"
                                /></label>
                                <select className="form-control" value={gender} onChange={(event) => { this.onChangeInput(event, 'gender') }} >
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>{language === languages.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div className='col-3'>
                                <label> <FormattedMessage id="manage-user.position" /></label>
                                <select className="form-control" value={position} onChange={(event) => { this.onChangeInput(event, 'position') }} >
                                    {positions && positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>{language === languages.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div className='col-3'>
                                <label> <FormattedMessage id="manage-user.roleID" /></label>
                                <select className="form-control" value={role} onChange={(event) => { this.onChangeInput(event, 'role') }}>
                                    {roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>{language === languages.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div className='col-3'>
                                <label> <FormattedMessage id="manage-user.image" /></label>
                                <div className='preview-img-container'>
                                    <label className='label-upload' htmlFor='previewImg'> Tải ảnh <i className="fas fa-upload"></i></label>
                                    <input id='previewImg' type='file' hidden
                                        onChange={(event) => this.handleOnChangeImage(event)}

                                    />

                                    <div className='preview-image'
                                        style={{ backgroundImage: `url(${this.state.previewImg})` }}
                                        onClick={() => this.openPreviewImage()}
                                    ></div>
                                </div>

                            </div>
                        </div>
                        <div className='col-12 my-3'>
                            <button
                                className={this.state.actions === CRUD_ACTIONS.EDIT ? "btn-warning" : 'btn btn-primary'}
                                onClick={() => this.handleSaveUser()}

                            >{this.state.actions === CRUD_ACTIONS.EDIT ? <FormattedMessage id="manage-user.edit" />
                                : <FormattedMessage id="manage-user.save" />}</button>
                        </div>
                        <div className='col-12 my-3 mb-5'>< TableManageUser
                            handleEditUserFromParentKey={this.handleEditUserFromParent}
                        // action={this.state.actions}
                        /></div>

                    </div>

                </div>

                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImg}
                        onCloseRequest={() => this.setState({ isOpen: false })}

                    />
                }
            </div>

        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        listUsers: state.admin.users,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositoinsStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        editUserStart: (user) => dispatch(actions.editUserStart(user)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
