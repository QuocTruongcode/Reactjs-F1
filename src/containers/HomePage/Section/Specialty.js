import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './Specialty.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import specialtyImg from "../../../assets/Specialty/cơ xương khớp.jpg";
import { getDetailSpecialties } from "../../../services/userService";
import { withRouter } from 'react-router';

class Specialty extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrSpecialties: [],
        }
    }

    async componentDidMount() {
        let res = await getDetailSpecialties();
        console.log("check res get all specialties from section: ", res.data.data);
        if (res.data.errCode == 0 && res.data.data) {
            this.setState({
                arrSpecialties: res.data.data,
            })
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {

    }


    handleOnclickAnSpecial = (id) => {
        console.log("check id item: ", id);
        this.props.history.push(`/detail-specialties/${id}`)

    }

    render() {
        let { arrSpecialties } = this.state;
        console.log("check state section specialty: ", arrSpecialties);

        return (
            <div className='section-specialty'>
                <div className='specialty-container'>
                    <div className='specialty-header'>
                        <p> Chuyên khoa phổ biến</p>
                        <button >Xem thêm</button>
                    </div>
                    <div className='specialty-body'>
                        <Slider {...this.props.settings}>
                            {arrSpecialties && arrSpecialties.length > 0
                                && arrSpecialties.map((item, index) => {
                                    return (
                                        <div className='specialty-item' onClick={() => this.handleOnclickAnSpecial(item.id)}>
                                            <img src={item.image} alt="" style={{ height: 160, width: 270 }} />
                                            <p className='h5 font-weight-bold'>{item.name}</p>

                                        </div>
                                    )
                                })}

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
