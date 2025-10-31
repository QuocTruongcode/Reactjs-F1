import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import HealthFacility from './Section/HealthFacility';
import Doctor from './Section/Doctor';
import HandBook from './Section/HandBook';
import About from './Section/About';
import Footer from './Footer';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../HomePage/Section/Specialty.scss";
class HomePage extends Component {


    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,

        };
        return (
            <div>
                <HomeHeader />
                <Specialty settings={settings} />
                <HealthFacility settings={settings} />
                <Doctor settings={settings} />
                <HandBook settings={settings} />
                <About />
                <Footer />
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
