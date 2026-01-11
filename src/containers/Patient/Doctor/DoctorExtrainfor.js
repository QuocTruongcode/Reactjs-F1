import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtrainfor.scss';
import { languages } from "../../../utils";
import { getScheduleDoctorByDate } from "../../../services/userService"
import { FormattedMessage } from 'react-intl';
import { classNames } from 'react-select/dist/index-ea9e225d.cjs.prod';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

    }

    isShowDetailInfor(action) {
        this.setState({
            isShowDetailInfor: action
        })
    }
    render() {
        let isShowDetailInfor = this.state.isShowDetailInfor;
        return (
            <div className='doctor-extra-infor-container'>
                <div className='container-up'>
                    <div className='text-address'>ĐỊA CHỈ PHÒNG KHÁM</div>
                    <div className='name-clinic'>Phòng khám chuyên khoa da liễu</div>
                    <div className='detail-address'>207 Cổ Nhuế, Hà Nội</div>
                </div>
                <div className='container-down'>
                    {isShowDetailInfor === false &&
                        <div className='price'>GIÁ KHÁM. <span className='more-infor'
                            onClick={() => this.isShowDetailInfor(true)
                            } > xem thêm</span></div>
                    }
                    {isShowDetailInfor === true &&
                        <>
                            <div className='cost-detail'>Gía khám <san>25000VND</san></div>
                            <div className='price-detail'>Được ưu tiên khám trước qua Bookingcare, giá khám cho người nước ngoài là 30USD</div>
                            <div className='payment-detail'>Người bệnh có thể thanh toán qua Tiền mặt, thẻ ATM</div>
                            <div >
                                <span className='hide-info' onClick={() => this.isShowDetailInfor(false)}>Ẩn xem thêm</span>
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
