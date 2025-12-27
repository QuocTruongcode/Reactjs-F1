import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, languages } from "../../../utils";
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctor: [],
            selectedDoctor: [],
            currentDate: '',
            rangeTime: []
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllScheduleTime();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctor !== this.props.allDoctor) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor)
            this.setState({
                listDoctor: dataSelect
            })
        }

        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            this.setState({
                rangeTime: this.props.allScheduleTime
            })
        }

    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;

        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;

                object.label = language === languages.VI ? labelVi : labelEn;
                object.value = item.id;

                result.push(object)
            })
        }
        return result;
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption })

    };

    handleChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }
        )
    }
    render() {
        console.log("check state: ", this.state)
        let { rangeTime } = this.state
        let { language } = this.props
        return (
            <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    <FormattedMessage id="manage-schedule.title"></FormattedMessage>
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <lable> <FormattedMessage id="manage-schedule.choose-doctor"></FormattedMessage></lable>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctor}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <lable> <FormattedMessage id="manage-schedule.choose-date"></FormattedMessage></lable>
                            <DatePicker
                                onChange={this.handleChangeDatePicker}
                                className="form-control"
                                value={this.state.currentDate}
                                minDate={new Date()}
                            />
                        </div>
                        <div className="col-12 pick-hour-container">
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button className='btn' key={index}>
                                            {language === languages.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })}
                        </div>
                        <div className='col-12'>
                            <button className="btn btn-primary">
                                <FormattedMessage id="manage-schedule.save-infor"></FormattedMessage>
                            </button>
                        </div>

                    </div>

                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctor: state.admin.allDoctor,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
