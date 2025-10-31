import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './Specialty.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import specialtyImg from "../../../assets/Specialty/cơ xương khớp.jpg"
class Specialty extends Component {

    render() {


        return (
            <div className='section-specialty'>
                <div className='specialty-container'>
                    <div className='specialty-header'>
                        <p> Chuyên khoa phổ biến</p>
                        <button >Xem thêm</button>
                    </div>
                    <div className='specialty-body'>
                        <Slider {...this.props.settings}>
                            <div className='img-customize'>
                                <img src={specialtyImg} />
                                <div> Cơ sở y tế 1</div>
                            </div>
                            <div className='img-customize'>
                                <img src={specialtyImg} />
                                <div> Cơ sở y tế 2</div>
                            </div>
                            <div className='img-customize'>
                                <img src={specialtyImg} />
                                <div> Cơ sở y tế 3</div>
                            </div>
                            <div className='img-customize'>
                                <img src={specialtyImg} />
                                <div> Cơ sở y tế  4</div>
                            </div>
                            <div className='img-customize'>
                                <img src={specialtyImg} />
                                <div> Cơ sở y tế  5</div>
                            </div>
                            <div className='img-customize'>
                                <img src={specialtyImg} />
                                <div> Cơ sở y tế  6</div>
                            </div>
                            <div className='img-customize'>
                                <img src={specialtyImg} />
                                <div> Cơ sở y tế  7</div>
                            </div >
                            <div className='img-customize'>
                                <img src={specialtyImg} />
                                <div> Cơ sở y tế  8</div>
                            </div>
                            <div className='img-customize'>
                                <img src={specialtyImg} />
                                <div> Cơ sở y tế 9</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
