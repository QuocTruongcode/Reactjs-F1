import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManagerDoctor.scss';
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, languages } from "../../../utils";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { getDetailInforDoctor } from '../../../services/userService'


const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManagerDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            //save to mackdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctor: [],
            hasOldData: false,
            // save to doctor-infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: ''

        }
    }
    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchRequiredDoctorInforStart();
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;

        if (inputData && inputData.length > 0) {
            if (type === 'USER') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;

                    object.label = language === languages.VI ? labelVi : labelEn;
                    object.value = item.id;

                    result.push(object)
                })
            }
            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi} VND`;
                    let labelEn = `${item.valueEn} USD`;

                    object.label = language === languages.VI ? labelVi : labelEn;
                    object.value = item.keyMap;

                    result.push(object)
                })
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi} `;
                    let labelEn = `${item.valueEn} `;

                    object.label = language === languages.VI ? labelVi : labelEn;
                    object.value = item.keyMap;

                    result.push(object)
                })
            }

        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctor !== this.props.allDoctor) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor, 'USER')
            this.setState({
                listDoctor: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor, 'USER')
            let { resPayment, resPrice, resProvince } = this.props.getRequiredDoctorInfor

            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let dataSelectResPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectResProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')
            this.setState({
                listDoctor: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectResPayment,
                listProvince: dataSelectResProvince,
            })
        }

        if (prevProps.getRequiredDoctorInfor !== this.props.getRequiredDoctorInfor) {
            // console.log("check doctor_infor redux: ", this.props.getRequiredDoctorInfor)
            let { resPayment, resPrice, resProvince } = this.props.getRequiredDoctorInfor

            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let dataSelectResPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectResProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')

            // console.log("check dataSelectPrice, dataSelectResPayment, dataSelectResProvince: ", dataSelectPrice, dataSelectResPayment, dataSelectResProvince)

            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectResPayment,
                listProvince: dataSelectResProvince,
            })
        }

    }

    // Finish!
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveContentMarkdown() {
        let { hasOldData } = this.state;
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            actions: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note

        })
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption })
        let res = await getDetailInforDoctor(selectedOption.value)
        if (res && res.data.errCode === 0 && res.data.data && res.data.data.Markdown) {
            let markdown = res.data.data.Markdown
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true
            })
        } else {
            this.setState({
                contentHTML: ' ',
                contentMarkdown: ' ',
                description: ' ',
                hasOldData: false
            })
        }
    };

    handleChangeDoctorInforSelect = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption

        this.setState({
            ...stateCopy
        })
        console.log("check infor doctor onchange: ", selectedOption, stateName)
    }

    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;

        this.setState({
            ...stateCopy
        })
    }
    render() {

        let { hasOldData } = this.state
        console.log("check state manager doctor: ", this.state)
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    <FormattedMessage id="admin.manage-doctor.title"></FormattedMessage>
                </div>
                <div className='more-infor'>
                    <div className='content-left from-group'>

                        <label>
                            <FormattedMessage id="admin.manage-doctor.select-doctor"></FormattedMessage>
                        </label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctor}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor"></FormattedMessage>}
                        />
                    </div>

                    <div className='content-right from-group'>
                        <label><FormattedMessage id="admin.manage-doctor.intro"></FormattedMessage> </label>
                        <textarea className='form-control' rows="4"
                            onChange={(event) => this.handleOnChangeText(event, 'description')}
                            value={this.state.description}
                        >

                        </textarea>
                    </div>

                </div>
                <div className='more-infor-extra row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.price"></FormattedMessage></label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeDoctorInforSelect}
                            options={this.state.listPrice}
                            placeholder={<label><FormattedMessage id="admin.manage-doctor.price"></FormattedMessage></label>}
                            name="selectedPrice"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.payment"></FormattedMessage></label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeDoctorInforSelect}
                            options={this.state.listPayment}
                            placeholder={<label><FormattedMessage id="admin.manage-doctor.payment"></FormattedMessage></label>}
                            name="selectedPayment"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.province"></FormattedMessage></label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeDoctorInforSelect}
                            options={this.state.listProvince}
                            placeholder={<label><FormattedMessage id="admin.manage-doctor.province"></FormattedMessage></label>}
                            name="selectedProvince"
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.nameClinic"></FormattedMessage></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                            value={this.state.nameClinic}
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.adressClinic"></FormattedMessage></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
                            value={this.state.addressClinic}
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.note"></FormattedMessage></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'note')}
                            value={this.state.note}
                        />
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown} />

                </div>
                <button
                    className={hasOldData === true ? "save-content-doctor" : "create-content-doctor"}
                    onClick={() => this.handleSaveContentMarkdown()}>
                    {hasOldData === true ?
                        <span><FormattedMessage id="admin.manage-doctor.add"></FormattedMessage></span>
                        : <span> <FormattedMessage id="admin.manage-doctor.save"></FormattedMessage></span>
                    }
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctor: state.admin.allDoctor,
        getRequiredDoctorInfor: state.admin.getRequiredDoctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchRequiredDoctorInforStart: () => dispatch(actions.fetchRequiredDoctorInforStart()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctorStart(data)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerDoctor);
