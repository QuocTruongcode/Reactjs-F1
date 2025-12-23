import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { languages } from '../../utils';
import { changeLanguageApp } from '../../store/actions';

class HomeHeader extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppReduct(language)
    }

    render() {
        // console.log("check props: ", this.props)
        let language = this.props.language
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
                                <div><b><FormattedMessage id="home-hearder.speciality" /></b></div>
                                <div className='content-child'><FormattedMessage id="home-hearder.searchdoctor" /></div>
                            </div>

                            <div className='center-child'>
                                <div><b><FormattedMessage id="home-hearder.health-facility" /></b></div>
                                <div className='content-child'><FormattedMessage id="home-hearder.select-room" /> </div>
                            </div>

                            <div className='center-child'>
                                <div><b><FormattedMessage id="home-hearder.doctor" /></b></div>
                                <div className='content-child'><FormattedMessage id="home-hearder.select-doctor" /></div>
                            </div>

                            <div className='center-child'>
                                <div><b><FormattedMessage id="home-hearder.fee" /></b></div>
                                <div className='content-child'><FormattedMessage id="home-hearder.check-health" /></div>
                            </div>

                        </div>
                        <div className='right-content'>
                            <div className='support'><i className="fas fa-question"></i><FormattedMessage id="home-hearder.support" /> </div>
                            <div className={language === languages.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(languages.VI)} >VN</span></div>
                            <div className={language === languages.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(languages.EN)}>EN</span></div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='title1'><FormattedMessage id="banner.title1" /></div>
                        <div className='title2'><FormattedMessage id="banner.title2" /></div>
                        <div className='search'>
                            <i className="fab fa-searchengin"></i>
                            <input type='text' placeholder='tím kiếm dịch vụ y tế' />
                        </div>
                        <div className='options'>
                            <div className='option-child'>
                                <i class="fas fa-hospital"></i>
                                <text> <FormattedMessage id="banner.child-1" /></text>
                            </div>
                            <div className='option-child'>
                                <i class="fas fa-phone"></i>
                                <text><FormattedMessage id="banner.child-2" /></text>
                            </div>
                            <div className='option-child'>
                                <i class="fas fa-bed"></i>
                                <text> <FormattedMessage id="banner.child-3" /></text>
                            </div>
                            <div className='option-child'>
                                <i class="fas fa-vial"></i>
                                <text><FormattedMessage id="banner.child-4" /></text>
                            </div>
                            <div className='option-child'>
                                <i class="fas fa-user"></i>
                                <text><FormattedMessage id="banner.child-5" /></text>
                            </div>
                            <div className='option-child'>
                                <i class="fas fa-stethoscope"></i>
                                <text><FormattedMessage id="banner.child-6" /></text>
                            </div>


                        </div>
                    </div>
                }

            </React.Fragment>
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
        changeLanguageAppReduct: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
