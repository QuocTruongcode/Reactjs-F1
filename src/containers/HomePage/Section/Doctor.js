import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './Specialty.scss';
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import * as actions from '../../../store/actions';
import { languages } from "../../../utils";
class Doctor extends Component {


    constructor(props) {
        super(props)
        this.state = {
            arrDoctor: [],
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorRedux !== this.props.topDoctorRedux) {
            this.setState({
                arrDoctor: this.props.topDoctorRedux
            })
        }



    }

    componentDidMount() {
        this.props.loadTopDoctors();
    }

    render() {

        let { language } = this.props;
        let arrDoctor = this.state.arrDoctor;
        // arrDoctor = arrDoctor.concat(arrDoctor).concat(arrDoctor).concat(arrDoctor).concat(arrDoctor)
        console.log("check arrDoctor: ", arrDoctor);
        return (
            <div className='section-specialty '>
                <div className='specialty-container'>
                    <div className='specialty-header'>
                        <p><FormattedMessage id="home-page.outstranding-doctor" /></p>
                        <button ><FormattedMessage id="home-page.more-infor" /></button>
                    </div>
                    <div className='specialty-body'>
                        <Slider {...this.props.settings}>

                            {arrDoctor && arrDoctor.length > 0
                                && arrDoctor.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    let nameVi = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`;
                                    let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                                    return (
                                        <div className='img-customize' key={index}>
                                            <p>{this.props.topDoctorRedux.lastName}</p>
                                            <div className='bg-image' style={{ backgroundImage: `url(${imageBase64})` }}></div>
                                            <div> {language === languages.VI ? nameVi : nameEn}</div>
                                            <div> Cơ xương khớp 1</div>
                                        </div>
                                    )
                                })

                            }
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
        language: state.app.language,
        topDoctorRedux: state.admin.topDoctor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor())

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
