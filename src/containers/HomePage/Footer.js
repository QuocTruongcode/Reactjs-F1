import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Footer.scss';

class Footer extends Component {

    render() {
        return (
            <div className='home-footer'>
                <p>&copy; 2025  Đâu thể khác <a target='blank' href='https://www.youtube.com/watch?v=147SkAVXEqM'>Click here</a></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
