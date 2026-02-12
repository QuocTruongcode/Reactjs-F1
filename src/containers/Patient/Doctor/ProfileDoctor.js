import React, { Component } from 'react';
import { connect } from "react-redux";
import { languages } from "../../../utils";
import { FormattedMessage } from 'react-intl';
import './ProfileDoctor.scss';
import { getProfileDoctorById } from "../../../services/userService";
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';
class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }

    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data,
        })
    }

    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.data.errCode === 0) {
                result = res.data.data;
            }
        }
        // console.log('check profile doctor: ', result);

        return result;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.language !== prevProps.language) {

        }
        if (this.props.dataProfile !== prevProps.dataProfile) {

        }

    }

    renderTimeBooking = (dataTime) => {
        let { language } = this.props;
        console.log("check data time: ", dataTime)
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === languages.VI ?
                dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn

            let date = language === languages.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - DD/MM/YYYY')

            return (
                <>
                    <div>{time} - {date}</div>
                    <div>Miễn phí đặt lịch</div>

                </>
            )
        }
        return <></>

    }

    render() {
        let { dataProfile } = this.state;
        console.log("check dataProfile: ", dataProfile);
        let { language, isShowDescriptionDoctor, dataTime } = this.props;
        // console.log("check data time: ", dataTime);

        let nameVi = " ", nameEn = " ";
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.firstName} ${dataProfile.lastName}`;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
        }
        console.log("check state dataProfile", this.state.dataProfile)
        // console.log("check positionData", dataProfile.positionData.valueEn)

        return (
            <div className='profile-doctor-container'>
                <div className='into-doctor'>
                    <div className='content-left'
                        style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ' '})` }}>

                    </div>
                    <div className='content-right'>
                        <div className='up'>
                            {language === languages.VI ? nameVi : nameEn}
                        </div>
                        <div className='down'>

                            {isShowDescriptionDoctor === true ?
                                <>
                                    {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description
                                        && <span>{dataProfile.Markdown.description}</span>
                                    }
                                </>
                                :
                                <>
                                    {this.renderTimeBooking(dataTime)}
                                </>
                            }


                        </div>
                    </div>
                </div>
                <div className='price'>
                    Giá khám:
                    {dataProfile && dataProfile.Doctor_Infor && language === languages.VI ?
                        <NumberFormat
                            value={dataProfile.Doctor_Infor.priceIdTypeData.valueVi}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'VND'}
                        />
                        : ''
                    }
                    {dataProfile && dataProfile.Doctor_Infor && language === languages.EN ?

                        <NumberFormat
                            value={dataProfile.Doctor_Infor.priceIdTypeData.valueEn}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'USD'}
                        /> : ''
                    }


                </div>
            </div>

        )

    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
