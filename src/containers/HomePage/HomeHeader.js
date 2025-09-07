import React, { Component } from 'react';

import { connect } from 'react-redux';
import './HomeHeader.scss';
class HomeHeader extends Component {

    render() {
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <div className='hearder-logo'> </div>
                        </div>
                        <div className='center-content'>
                            <div className='center-child'>
                                <div><b>Chuyên khoa</b></div>
                                <div className='content-child'>tìm bác sĩ theo chuyên khoa</div>
                            </div>

                            <div className='center-child'>
                                <div><b>Cơ sở y tế</b></div>
                                <div className='content-child'>chọn bệnh viện phòng khám  </div>
                            </div>

                            <div className='center-child'>
                                <div><b>Chuyên khoa</b></div>
                                <div className='content-child'>Chọn bác sĩ giỏi</div>
                            </div>

                            <div className='center-child'>
                                <div><b>Chuyên khoa</b></div>
                                <div className='content-child'>Khám sức khỏe tổng quát</div>
                            </div>

                        </div>
                        <div className='right-content'>
                            <div className='support'><i className="fas fa-question"></i> Hỗ trợ</div>
                            <div className='flag'>VN</div>
                        </div>
                    </div>
                </div>

                <div className='home-header-banner'>
                    <div className='title1'>NỀN TẢNG Y TẾ</div>
                    <div className='title2'>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
                    <div className='search'>
                        <i className="fab fa-searchengin"></i>
                        <input type='text' placeholder='Tìm kiếm dịch vụ y tế'></input>
                    </div>
                    <div className='options'>
                        <div className='option-child'>
                            <i class="fas fa-hospital"></i>
                            <text> Khám chuyên khoa</text>
                        </div>
                        <div className='option-child'>
                            <i class="fas fa-phone"></i>
                            <text> Khám từ xa</text>
                        </div>
                        <div className='option-child'>
                            <i class="fas fa-bed"></i>
                            <text> Khám tổng quát</text>
                        </div>
                        <div className='option-child'>
                            <i class="fas fa-vial"></i>
                            <text> Xét nghiệm y học</text>
                        </div>
                        <div className='option-child'>
                            <i class="fas fa-user"></i>
                            <text> Sức khỏe tinh thần</text>
                        </div>
                        <div className='option-child'>
                            <i class="fas fa-stethoscope"></i>
                            <text> Khám nha khoa</text>
                        </div>


                    </div>
                </div>


            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
