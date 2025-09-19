import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import { languages } from '../../utils';
import { FormattedMessage } from 'react-intl';

class Header extends Component {

    handleLanguage = (language) => {
        this.props.changeLanguageAppReduct(language)
    }

    render() {
        const { processLogout, language, userInfo } = this.props;
        console.log("Check user information: ", userInfo);
        return (

            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>

                <div className='languages'>
                    <span className='welcome'><FormattedMessage id="home-hearder.welcome" /> {userInfo && userInfo.firstName ? userInfo.lastName : ' '} </span>
                    <span className={language === languages.VI ? "language-vi active" : " language-vi"} title='Vietnamese' onClick={() => this.handleLanguage(languages.VI)}>VN</span>
                    <span className={language === languages.EN ? "language-en active" : " language-en"} title='English' onClick={() => this.handleLanguage(languages.EN)}>EN</span>

                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title='Log out'>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppReduct: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
