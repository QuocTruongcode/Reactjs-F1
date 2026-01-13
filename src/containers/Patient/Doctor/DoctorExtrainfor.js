import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtrainfor.scss';
import { languages } from "../../../utils";
import { getExtraInforDoctorById } from "../../../services/userService"
import { FormattedMessage } from 'react-intl';
import { classNames } from 'react-select/dist/index-ea9e225d.cjs.prod';
import NumberFormat from 'react-number-format';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {}
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let res = await getExtraInforDoctorById(this.props.doctorIdFromParent);
            if (res && res.data.errCode === 0) {
                this.setState({
                    extraInfor: res.data.data
                })
            }
        }

    }

    isShowDetailInfor(action) {
        this.setState({
            isShowDetailInfor: action
        })
    }
    render() {
        let isShowDetailInfor = this.state.isShowDetailInfor;
        let extraInfor = this.state.extraInfor;
        let { language } = this.props
        console.log("check state at DoctorExtraInfor: ", extraInfor)
        return (
            <div className='doctor-extra-infor-container'>
                <div className='container-up'>
                    <div className='text-address'>
                        <FormattedMessage id="patient.extra-infor.text-address"></FormattedMessage>
                    </div>
                    <div className='name-clinic'>{extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ' '}</div>
                    <div className='detail-address'>{extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ' '}</div>
                </div>
                <div className='container-down'>
                    {isShowDetailInfor === false &&
                        <div className='price'><FormattedMessage id="patient.extra-infor.price"></FormattedMessage>
                            : <span className='more-infor'
                                onClick={() => this.isShowDetailInfor(true)
                                } ><FormattedMessage id="patient.extra-infor.see-more"></FormattedMessage></span></div>
                    }
                    {isShowDetailInfor === true &&
                        <>
                            <div className='cost-detail'><FormattedMessage id="patient.extra-infor.price"></FormattedMessage>:
                                {extraInfor && extraInfor.priceIdTypeData && language === languages.VI &&
                                    <NumberFormat
                                        value={extraInfor.priceIdTypeData.valueVi}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'VND'}
                                    />
                                }

                                {extraInfor && extraInfor.priceIdTypeData && language === languages.EN &&
                                    <NumberFormat
                                        value={extraInfor.priceIdTypeData.valueEn}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'USD'}
                                    />
                                }

                                {/* <span>
                                    {extraInfor && extraInfor.priceIdTypeData.valueVi ? extraInfor.priceIdTypeData.valueVi : ' '}
                                </span> */}
                            </div>
                            <div className='price-detail'>{extraInfor && extraInfor.note ? extraInfor.note : ''}</div>
                            <div className='payment-detail'><FormattedMessage id="patient.extra-infor.text-payment"></FormattedMessage>:
                                {extraInfor && language === languages.VI && extraInfor.paymentIdTypeData.valueVi ? extraInfor.paymentIdTypeData.valueVi : ''}
                                {extraInfor && language === languages.EN && extraInfor.paymentIdTypeData.valueEn ? extraInfor.paymentIdTypeData.valueEn : ''}


                            </div>

                            <div >
                                <span className='hide-info' onClick={() => this.isShowDetailInfor(false)}>
                                    <FormattedMessage id="patient.extra-infor.hide-see-more"></FormattedMessage>
                                </span>
                            </div>
                        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
