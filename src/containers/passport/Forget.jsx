import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toJS } from '../../util';
import { getForgetInfoWith, resetPasswordWith } from '../../actions/passport/forget';
import { ForgetAuth, ForgetReset } from '../../components/passport/Forget';


class ForgetAuthWrapper extends React.Component {
    static propTypes = {
        isFetching: PropTypes.bool,
        error: PropTypes.string,
        forgetInfo: PropTypes.shape({
            uid: PropTypes.number,
            username: PropTypes.string,
            token: PropTypes.string
        }),
        getForgetInfoWith: PropTypes.func.isRequired
    }

    constructor () {
        super();
        
        this.handleSubmitSelfInfo = this.handleSubmitSelfInfo.bind(this);
    }
    
    handleSubmitSelfInfo (selfInfo) {
        const { getForgetInfoWith } = this.props;
        getForgetInfoWith && getForgetInfoWith(selfInfo);
    }

    componentWillReceiveProps (nextProps) {
        const { history, isFetching, error, forgetInfo } = nextProps;
        if (!error && !isFetching && isFetching !== this.props.isFetching) {
            history.push('/passport/forget/reset', { forgetInfo: forgetInfo });
        }
    }

    render () {
        const { isFetching, error } = this.props;
        return (
            <ForgetAuth 
                isFetching={isFetching}
                error={error}
                onSubmitSelfInfo={this.handleSubmitSelfInfo}
            />
        );
    }
}


const mapAuthStateToProps = state => {
    const forgetAuthState = state.getIn(['bypassing', 'forgetAuth']);
    if (!forgetAuthState) return {};

    return {
        isFetching: forgetAuthState.get('isFetching'),
        forgetInfo: forgetAuthState.get('items'),
        error: forgetAuthState.get('error')
    };
};
const mapAuthDispatchToProps = dispatch => ({
    getForgetInfoWith: selfInfo => dispatch(getForgetInfoWith(selfInfo))
});
ForgetAuthWrapper = connect(mapAuthStateToProps, mapAuthDispatchToProps)(toJS(ForgetAuthWrapper));


class ForgetResetWrapper extends React.Component {
    static propTypes = {
        isFetching: PropTypes.bool,
        error: PropTypes.string,
        success: PropTypes.string,
        resetPasswordWith: PropTypes.func.isRequired
    }

    constructor () {
        super();

        this.handleSubmitNewPassword = this.handleSubmitNewPassword.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        const { isFetching, error, history } = nextProps;
        if (!error && !isFetching && isFetching !== this.props.isFetching) {
            setTimeout(() => {
                history.push('/passport/login');
            }, 2000);
        }
    }

    handleSubmitNewPassword (newPassword) {
        const { location: { state: locationState }, resetPasswordWith } = this.props;
        let resetInfo = locationState.forgetInfo;
        // api request for uid and token and username, 
        // which the fisrt two of them are provided through forgetInfo
        delete resetInfo.username;
        resetInfo.password = newPassword;
        resetPasswordWith && resetPasswordWith(resetInfo);
    }

    render () {
        const { isFetching, error, success, location: { state: locationState } } = this.props;
        if (!locationState || !locationState.forgetInfo || 
            !locationState.forgetInfo.token
        ) {
            return (
                <div className="token-not-found">
                    <h1>:( <small>出错了</small></h1>
                    <p>没有找到您的验证信息，您通过验证了吗？</p>
                    <p>如果没有，请前往<Link to="/passport/forget/auth">验证界面</Link>进行验证</p>
                </div>
            );
        }

        return (
            <ForgetReset 
                isFetching={isFetching}
                error={error}
                success={success}
                username={locationState.forgetInfo.username}
                onSubmitNewPassword={this.handleSubmitNewPassword}
            />
        );
    }
}

const mapResetStateToProps = state => {
    const forgetResetState = state.getIn(['bypassing', 'forgetReset']);
    if (!forgetResetState) return {};

    return {
        isFetching: forgetResetState.get('isFetching'),
        success: forgetResetState.get('items'),
        error: forgetResetState.get('error')
    };
};
const mapResetDispatchToProps = dispatch => ({
    resetPasswordWith: newPassword => dispatch(resetPasswordWith(newPassword))
});
ForgetResetWrapper = connect(mapResetStateToProps, mapResetDispatchToProps)(toJS(ForgetResetWrapper));

export { ForgetAuthWrapper, ForgetResetWrapper };