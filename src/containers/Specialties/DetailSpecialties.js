import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DetailSpecialties.scss';
import HomeHeader from "../HomePage/HomeHeader";
import { getOneDetailSpecialties, getAllDoctorsIdBySpecialtiesId } from "../../services/userService";
import { Link } from "react-router-dom";
import ProfileDoctor from '../Patient/Doctor/ProfileDoctor';
import DoctorExtrainfor from '../Patient/Doctor/DoctorExtrainfor';
import DoctorSchedule from '../Patient/Doctor/DoctorSchedule';
class DetailSpecialties extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            descriptionSpec: "",
            contern: "",
            image: "",
            nameSpec: "",
            listDocTorId: [],
        }
    }

    async componentDidMount() {
        let id = this.props.match.params.id;
        await this.fetchDetail(id);
        let res = await getAllDoctorsIdBySpecialtiesId(id);
        console.log("Check res of api get all doctorid: ",);
        if (res && res.data && res.data.data) {
            this.setState({
                listDocTorId: res.data.data

            })
        }

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
        let { descriptionSpec, contern, image, nameSpec, listDocTorId } = this.state;
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
                <div className='doctor-infor'>
                    {listDocTorId.map((item, index) => (
                        <>
                            <div className='doctor-extra-infor'>
                                <ProfileDoctor
                                    doctorId={item.doctorId}
                                />

                                <DoctorExtrainfor
                                    doctorIdFromParent={item.doctorId}
                                />
                            </div>

                            <div className='doctor-schedule'>
                                <DoctorSchedule
                                    doctorIdFromParent={item.doctorId}

                                />
                            </div>
                        </>
                    ))}
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
