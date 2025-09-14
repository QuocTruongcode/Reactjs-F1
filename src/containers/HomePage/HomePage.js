import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import HealthFacility from './Section/HealthFacility';
import Doctor from './Section/Doctor';
import HandBook from './Section/HandBook';
import About from './Section/About';
import Footer from './Footer';
class HomePage extends Component {

    render() {
        return (
            <div>
                <HomeHeader />
                <Specialty />
                <HealthFacility />
                <Doctor />
                <HandBook />
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
