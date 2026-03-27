import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './CRUR_specialties.scss';
import Select from 'react-select';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import { CRUD_ACTIONS, CommonUtils } from "../../../src/utils";
import { languages } from "../../../src/utils/constant";
import Lightbox from 'react-image-lightbox';
import { postDetailSpecialties, getDetailSpecialties, getOneDetailSpecialties } from "../../services/userService"
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class Specialties extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            description: '',
            previewImg: '',
            avatar: '',
            isOpen: false,
            nameSepcialties: '',
            selectedSpec: '',
            listSpec: []
        }
    }

    async componentDidMount() {
        let res = await getDetailSpecialties();
        console.log("check res api get infor specialties: ", res);
        let data = res.data.data;
        let options = data.map(item => ({
            value: item.id,
            label: item.name
        }));


        if (res.data.errCode == 0) {
            this.setState({
                listSpec: options,
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }


    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            console.log("check base64: ", typeof base64)
            let objectURL = URL.createObjectURL(file);
            this.setState({
                previewImg: objectURL,
                avatar: base64
            });
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImg) return;
        this.setState({
            isOpen: true
        })
    }

    handleOnchangeSpecialties = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;

        this.setState({
            ...stateCopy
        })
    }

    handleSaveInforSpecialties = async () => {

        let data = {
            contentMarkdown: this.state.contentMarkdown,
            contentHTML: this.state.contentHTML,
            description: this.state.description,
            avatar: this.state.avatar,
            nameSepcialties: this.state.nameSepcialties,
            id: this.state.selectedSpec.value
        }
        console.log("Check data: ", data)

        let res = await postDetailSpecialties(data);
        console.log("Check res post infor specialty: ", res);
        if (res && res.data.errCode == 0) {
            toast.success("Save infor specialties success!!!");
            this.setState({
                contentMarkdown: '',
                contentHTML: '',
                description: '',
                previewImg: '',
                avatar: '',
                isOpen: false,
                nameSepcialties: '',
            })
        } else {
            toast.error("Save infor specialties eror!!!");
        }

    }

    handleOnchangeSelectedSpec = async (selectedSpec) => {
        this.setState({
            selectedSpec: selectedSpec
        })

        let res = await getOneDetailSpecialties(selectedSpec.value);
        console.log("check res of api: ", res);
        if (res.data.errCode == 0 && res.data.data) {
            let infor = res.data.data;
            this.setState({
                avatar: infor.image,
                nameSepcialties: infor.name,
                description: infor.description,
                contentHTML: infor.contentHTML,
                contentMarkdown: infor.contentMarkdown,
                previewImg: infor.image
            })
        }
    }

    render() {

        console.log("Check state secialties: ", this.state);
        let { selectedSpec, listSpec, } = this.state;
        return (
            <div className='spec_container m-5'>
                <div className='spec_content row'>
                    <div className='content_left form-group col-md-4'>
                        <label>Nhập tên chuyên khoa</label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnchangeSpecialties(event, 'nameSepcialties')}
                            value={this.state.nameSepcialties}
                        ></input>

                        <label>
                            Chọn chuyên khoa đã có
                        </label>
                        <Select
                            value={selectedSpec}
                            onChange={this.handleOnchangeSelectedSpec}
                            options={listSpec}
                            placeholder={"Chọn một chuyên khoa"}
                        />

                    </div>
                    <div className='description form-group col-md-6'>
                        <label>Nhập giới thiệu chuyên khoa</label>
                        <textarea className='form-control' rows="4"
                            onChange={(event) => this.handleOnchangeSpecialties(event, 'description')}
                            value={this.state.description}>

                        </textarea>
                    </div>

                    <div className='image-speci col-md-2'>
                        <div className='preview-img-container'>
                            <label className='label-upload' htmlFor='previewImg'> Tải ảnh <i className="fas fa-upload"></i></label>
                            <input id='previewImg' type='file' accept="image/*" hidden
                                onChange={(event) => this.handleOnChangeImage(event)}
                            />

                            <div className='preview-image'
                                style={{ backgroundImage: `url(${this.state.previewImg})` }}
                                onClick={() => this.openPreviewImage()}
                            ></div>
                        </div>
                    </div>
                </div>

                <div className='deatail-infro-speci'>
                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown} />
                </div>

                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImg}
                        onCloseRequest={() => this.setState({ isOpen: false })}

                    />
                }

                <button className='btn-primary btn-lg'
                    onClick={() => this.handleSaveInforSpecialties()}
                >Lưu thông tin</button>


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

export default connect(mapStateToProps, mapDispatchToProps)(Specialties);
