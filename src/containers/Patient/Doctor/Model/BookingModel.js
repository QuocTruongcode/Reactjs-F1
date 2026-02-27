import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './BookingModel.scss';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions'
import { languages } from "../../../../utils";
import Select from 'react-select';
import { postPatientBookAppointment } from "../../../../services/userService"
import { toast } from "react-toastify"


class BookingModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            doctorId: '',
            timeType: '',

            genders: '',
        }
    }

    async componentDidMount() {
        this.props.getGenders();
    }

    builDataGender = (data) => {
        let result = [];
        let language = this.props.language;
        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = language === languages.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            })
        }
        return result;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genders !== this.props.genders) {

            this.setState({
                genders: this.builDataGender(this.props.genders),
            })
        }

        if (prevProps.language !== this.props.language) {

        }

        if (prevProps.dataTime !== this.props.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId;
                let timeType = this.props.dataTime.timeType;
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }


        }


    }

    handleOnchangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })
    }

    handleChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handleChangeSelect = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption
        })
    }

    handleConfirmBooking = async () => {
        let date = new Date(this.state.birthday).getTime();
        let res = await postPatientBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: date,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
        })
        if (res && res.data.errCode === 0) {
            toast.success("Save appointment success!!!");

        } else {
            toast.error("Save appointment eror!!!");
        }
    }

    render() {
        let { isOpenModel, closeBookingClose, dataTime, genders } = this.props;
        let doctorId = '';
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId;
        }
        console.log("check data time: ", dataTime);
        return (
            <Modal isOpen={isOpenModel}
                className={"booking-modal-container"}
                size='lg'
                centered
            >
                <div className='booking-modal-content'>
                    <div className='booking-modal-headel'>
                        <span className='left'> <FormattedMessage id="patient.booking-modal.title"></FormattedMessage></span>
                        <span className='right'
                            onClick={closeBookingClose}
                        > <i className="fas fa-times"></i></span>

                    </div>
                    <div className='booking-modal-body'>
                        <ProfileDoctor
                            doctorId={doctorId}
                            isShowDescriptionDoctor={false}
                            dataTime={dataTime}
                        />
                        <div className='doctor-infor'>

                        </div>

                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id="patient.booking-modal.name"></FormattedMessage>
                                </label>
                                <input className='form-control'
                                    value={this.state.fullName}
                                    onChange={(event) => this.handleOnchangeInput(event, 'fullName')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id="patient.booking-modal.phone-numble"></FormattedMessage>
                                </label>
                                <input className='form-control'
                                    value={this.state.phoneNumber}
                                    onChange={(event) => this.handleOnchangeInput(event, 'phoneNumber')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id="patient.booking-modal.email"></FormattedMessage>
                                </label>
                                <input className='form-control'
                                    value={this.state.email}
                                    onChange={(event) => this.handleOnchangeInput(event, 'email')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id="patient.booking-modal.address"></FormattedMessage>

                                </label>
                                <input className='form-control'
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnchangeInput(event, 'address')}
                                />
                            </div>
                            <div className='col-12 form-group'>
                                <label>
                                    <FormattedMessage id="patient.booking-modal.reason"></FormattedMessage>

                                </label>
                                <input className='form-control'
                                    value={this.state.reason}
                                    onChange={(event) => this.handleOnchangeInput(event, 'reason')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id="patient.booking-modal.birtday"></FormattedMessage>

                                </label>
                                <DatePicker
                                    onChange={this.handleChangeDatePicker}
                                    className="form-control"
                                    value={this.state.birthday}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id="patient.booking-modal.gender"></FormattedMessage>
                                </label>
                                <Select
                                    value={this.state.selectedGender}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.genders}

                                />
                            </div>
                        </div>
                    </div>
                    <div className='booking-modal-footer'>
                        <button className='btn-booking-confirm' onClick={() => this.handleConfirmBooking()}>
                            <FormattedMessage id="patient.booking-modal.confirm"></FormattedMessage>

                        </button>
                        <button className='btn-booking-cancel' onClick={closeBookingClose}>
                            <FormattedMessage id="patient.booking-modal.cancel"></FormattedMessage>

                        </button>
                    </div>
                </div>

            </Modal>
        )

    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModel);
