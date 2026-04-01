import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DetailSpecialties.scss';
import HomeHeader from "../HomePage/HomeHeader";
import { getOneDetailSpecialties } from "../../services/userService";
import { Link } from "react-router-dom";

class DetailSpecialties extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            descriptionSpec: "",
            contern: "",
            image: "",
            nameSpec: ""
        }
    }

    async componentDidMount() {
        let id = this.props.match.params.id;
        await this.fetchDetail(id);

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.id != this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.fetchDetail(id);
        }
    }

    fetchDetail = async (id) => {
        let res = await getOneDetailSpecialties(id);
        let data = res.data.data;

        if (res && res.data.errCode == 0 && data) {
            this.setState({
                descriptionSpec: data.description,
                contern: data.contentHTML,
                image: data.image,
                nameSpec: data.name
            });
        }
    }

    toggle = () => {
        this.setState({
            show: !this.state.show
        });
    };

    render() {
        console.log("check state in detail specialties: ", this.state);
        let { descriptionSpec, contern, image, nameSpec } = this.state;
        return (
            <div className='specialties-container'>
                <HomeHeader isShowBanner={false} />
                <div className='specialties-content'

                >
                    <div className='specialties-home'><Link to="/home"> <i class="fas fa-home"></i> </Link>/ Khám chuyên khoa / {nameSpec} </div>
                    <div className='specialties-name'>{nameSpec}</div>
                    <div className='specialties-description'>{descriptionSpec}
                        <span className={this.state.show ? "hiden-btn" : "more-btn"} onClick={this.toggle}>
                            Xem thêm
                        </span>
                    </div>

                    <div className={this.state.show ? "more active" : "more"}>

                        <div dangerouslySetInnerHTML={{ __html: contern }}></div>
                        <span className="hiden-btn2" onClick={this.toggle}>
                            Thu gọn
                        </span>
                    </div>

                </div>

            </div>
        )

    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialties);
