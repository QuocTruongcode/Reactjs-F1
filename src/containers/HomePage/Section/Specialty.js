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
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4
        };

        return (
            <div className='section-specialty'>
                <div className='specialty-container'>
                    <div className='specialty-header'>
                        <p> Chuyên khoa phổ biến</p>
                        <button >Xem thêm</button>
                    </div>
                    <div className='specialty-body'>
                        <Slider {...settings}>
                            <div className='img-customize'>
                                <img src={specialtyImg} />
                                <div> Cơ xương khớp 1</div>
                            </div>
                            <div className='img-customize'>
                                <img src={specialtyImg} />
                                <div> Cơ xương khớp 2</div>
                            </div>
                            <div className='img-customize'>
                                <img src={specialtyImg} />
                                <div> Cơ xương khớp 3</div>
                            </div>
                            <div className='img-customize'>
                                <img src={specialtyImg} />
                                <div> Cơ xương khớp 4</div>
                            </div>
                            <div className='img-customize'>
                                <img src={specialtyImg} />
                                <div> Cơ xương khớp 5</div>
                            </div>
                            <div className='img-customize'>
                                <img src={specialtyImg} />
                                <div> Cơ xương khớp 6</div>
                            </div>
                            <div className='img-customize'>
                                <img src={specialtyImg} />
                                <div> Cơ xương khớp 7</div>
                            </div >
                            <div className='img-customize'>
                                <img src={specialtyImg} />
                                <div> Cơ xương khớp 8</div>
                            </div>
                            <div className='img-customize'>
                                <img src={specialtyImg} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
