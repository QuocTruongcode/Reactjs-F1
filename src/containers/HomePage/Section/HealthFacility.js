import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './Specialty.scss';
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import healthFacilityImg from "../../../assets/HealthFacility/cơ sở y tế.jpg"
class HealthFacility extends Component {

    render() {

        return (
            <div className='section-specialty section-facility'>
                <div className='specialty-container'>
                    <div className='specialty-header'>
                        <p> Cơ sở y tế nổi bật</p>
                        <button >Xem thêm</button>
                    </div>
                    <div className='specialty-body'>
                        <Slider {...this.props.settings}>
                            <div className='img-customize'>
                                <img src={healthFacilityImg} />
                                <div> Cơ xương khớp 1</div>
                            </div>
                            <div className='img-customize'>
                                <img src={healthFacilityImg} />
                                <div> Cơ xương khớp 2</div>
                            </div>
                            <div className='img-customize'>
                                <img src={healthFacilityImg} />
                                <div> Cơ xương khớp 3</div>
                            </div>
                            <div className='img-customize'>
                                <img src={healthFacilityImg} />
                                <div> Cơ xương khớp 4</div>
                            </div>
                            <div className='img-customize'>
                                <img src={healthFacilityImg} />
                                <div> Cơ xương khớp 5</div>
                            </div>
                            <div className='img-customize'>
                                <img src={healthFacilityImg} />
                                <div> Cơ xương khớp 6</div>
                            </div>
                            <div className='img-customize'>
                                <img src={healthFacilityImg} />
                                <div> Cơ xương khớp 7</div>
                            </div >
                            <div className='img-customize'>
                                <img src={healthFacilityImg} />
                                <div> Cơ xương khớp 8</div>
                            </div>
                            <div className='img-customize'>
                                <img src={healthFacilityImg} />
                                <div> Cơ xương khớp 9</div>
                            </div>
                        </Slider>
                    </div>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HealthFacility);
