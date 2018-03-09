import React from 'react';
import PropTypes from 'prop-types';
import { AtomicBlockUtils } from 'draft-js';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { connect } from 'react-redux';
import { toJS, compressImage, isMobile } from '../../../util';
import { uploadAttach } from '../../../actions/forum/attach';
import { LoadingSpinner } from '../../../components/common/Loading';
import { InputField } from '../../../components/common/Input';

const MAX_ACCEPT_SIZE = 2097152; // 2 MiB


class Attach extends React.Component {
    static propTypes = {
        uploadAttach: PropTypes.func.isRequired,
        isFetching: PropTypes.bool,
        imgId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        error: PropTypes.string
    };

    constructor () {
        super();
        this.state = {
            localError: '',
            imgUrl: ''
        };
        this.handleClickUpload = this.handleClickUpload.bind(this);
        this.handleUploadFile = this.handleUploadFile.bind(this);
        this._insertImage = this._insertImage.bind(this);
        this.handleUrlChange = this.handleUrlChange.bind(this);
        this.handleClickFromUrl = this.handleClickFromUrl.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { imgId } = nextProps;
        const { imgId: oldImgId } = this.props;
        if (oldImgId !== imgId && imgId !== 0) {
            let src;
            if (process.env.NODE_ENV === 'production') {
                src = `https://bbs.tju.edu.cn/api/img/${imgId}`;
            } else if (process.env.NODE_ENV === 'development') {
                src = `https://bbs.tju.edu.cn/testapi/img/${imgId}`;
            }
            this._insertImage(src);
        }
    }

    handleUrlChange (e) {
        const { id, value } = e.target;
        this.setState({
            [id]: value
        });
    }

    handleClickUpload () {
        this.file.click();
    }

    handleClickFromUrl () {
        this._insertImage(this.state.imgUrl);
    }

    handleUploadFile (e) {
        e.preventDefault();
        // only apply one file at a time
        let file = e.target.files[0];
        if (!file) return;
        // type checking
        if (!/image\/(png|jpg|jpeg|gif|bmp)/.test(file.type)) {
            this.setState({
                localError: '图片上传格式仅支持png/jpg/jpeg/gif/bmp'
            });
            return;
        }

        if (file.size > MAX_ACCEPT_SIZE) {
            if (/image\/(png|jpg|jpeg)/.test(file.type)) {
                // compressable
                compressImage(file, file => {
                    if (file.size > MAX_ACCEPT_SIZE) {
                        // still larger than max size after comporess
                        this.setState({ localError: '图片过大，请不要超过2MB' });
                    } else {
                        this._uploadFile(file);
                    }
                });
            } else {
                // larger than max size AND uncompressable
                this.setState({ localError: '图片过大，请不要超过2MB' });
            }
        } else {
            this._uploadFile(file);
        }
    }

    _uploadFile (file) {
        let data = new FormData();
        data.append('name', file.name);
        data.append('file', file);
        this.props.uploadAttach(data);
    }

    _insertImage (src) {
        const { editorState, onChange } = this.props;
        const entityData = { src };
        const entityKey = editorState
            .getCurrentContent()
            .createEntity('IMAGE', 'MUTABLE', entityData)
            .getLastCreatedEntityKey();
        const newEditorState = AtomicBlockUtils.insertAtomicBlock(
            editorState,
            entityKey,
            ' '
        );
        onChange(newEditorState);
    }

    render () {
        const { isFetching, error } = this.props;
        const { localError, imgUrl } = this.state;
        let displayError = localError ? localError : error;

        if (isFetching) return (
            <div className="pull-right">
                <LoadingSpinner />
            </div>
        );

        return (
            <div className="rdw-attach">
                <OverlayTrigger
                    trigger="click"
                    placement={isMobile() ? 'right' : 'left'}
                    overlay={
                        <Popover
                            title="插入图片"
                            className="attach-popover"
                            id="attach-popover"
                        >
                            <Button
                                bsStyle="link"
                                className="flat attach-insert"
                                disabled={isFetching}
                                onClick={this.handleClickUpload}
                            >
                                从本地上传
                            </Button>
                            或
                            <InputField 
                                placeholder="http://img.io/a.png"
                                text="输入图片URL"
                                style={imgUrl ? { width: '175px' } : null}
                                id="imgUrl"
                                onChange={this.handleUrlChange}
                            />
                            {
                                this.state.imgUrl
                                    ? (
                                        <Button 
                                            className="raised attach-insert-button" 
                                            bsStyle="primary"
                                            onClick={this.handleClickFromUrl}
                                        >
                                            确定
                                        </Button>)
                                    : null
                            }
                        </Popover>
                    }
                >
                    <Button
                        bsStyle="link"
                        className="flat"
                    >
                        插入图片
                    </Button>
                </OverlayTrigger>
                <input
                    accept=".png,.jpg,.jpeg,.gif,.bmp"
                    type="file"
                    ref={file => {this.file = file;}}
                    onChange={this.handleUploadFile}/>
                <span className="error-message">{displayError}</span>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const attach = state.get('attach');
    if (!attach) return {};

    return {
        isFetching: attach.get('isFetching'),
        imgId: attach.get('id'),
        error: attach.get('error')
    };
};
const mapDispatchToProps = dispatch => ({
    uploadAttach: fileData => dispatch(uploadAttach(fileData))
});
Attach = connect(mapStateToProps, mapDispatchToProps)(toJS(Attach));

export default Attach;
