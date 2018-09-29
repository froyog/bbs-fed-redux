import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toJS } from '../../util';
import { oldLoginWith, oldRegisterWith } from '../../actions/passport/old';
import { OldLogin, OldRegister } from '../../components/passport/Old';

class OldLoginWrapper extends React.Component {
    static propTypes = {
        isFetching: PropTypes.bool,
        error: PropTypes.string,
        oldLoginResult: PropTypes.shape({
            token: PropTypes.string,
        }),
        oldLoginWith: PropTypes.func.isRequired,
    };

    constructor() {
        super();

        this.handleSubmitLoginInfo = this.handleSubmitLoginInfo.bind(this);
    }

    handleSubmitLoginInfo(loginInfo) {
        const { oldLoginWith } = this.props;
        oldLoginWith && oldLoginWith(loginInfo);
    }

    componentWillReceiveProps(nextProps) {
        const { history, isFetching, error, oldLoginResult } = nextProps;
        if (!error && !isFetching && isFetching !== this.props.isFetching) {
            history.push('/passport/old/register', { token: oldLoginResult.token });
        }
    }

    render() {
        const { isFetching, error } = this.props;
        return (
            <OldLogin
                isFetching={isFetching}
                error={error}
                onSubmitLoginInfo={this.handleSubmitLoginInfo}
            />
        );
    }
}

const mapLoginStateToProps = state => {
    const oldLoginState = state.getIn(['bypassing', 'oldLogin']);
    if (!oldLoginState) return {};

    return {
        isFetching: oldLoginState.get('isFetching'),
        oldLoginResult: oldLoginState.get('items'),
        error: oldLoginState.get('error'),
    };
};
const mapLoginDispatchToProps = dispatch => ({
    oldLoginWith: loginInfo => dispatch(oldLoginWith(loginInfo)),
});
OldLoginWrapper = connect(
    mapLoginStateToProps,
    mapLoginDispatchToProps
)(toJS(OldLoginWrapper));

class OldRegisterWrapper extends React.Component {
    static propTypes = {
        isFetching: PropTypes.bool,
        error: PropTypes.string,
        success: PropTypes.string,
        oldRegisterInfo: PropTypes.func.isRequired,
    };

    constructor() {
        super();

        this.handleSubmitRegisterInfo = this.handleSubmitRegisterInfo.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { isFetching, error, history } = nextProps;
        if (!error && !isFetching && isFetching !== this.props.isFetching) {
            setTimeout(() => {
                history.push('/passport/login');
            }, 2000);
        }
    }

    handleSubmitRegisterInfo(registerInfo) {
        const {
            location: { state: locationState },
            oldRegisterWith,
        } = this.props;
        // add token got from OlfLogin
        registerInfo.token = locationState.token;
        oldRegisterWith && oldRegisterWith(registerInfo);
    }

    render() {
        const {
            isFetching,
            error,
            success,
            location: { state: locationState },
        } = this.props;

        if (!locationState || !locationState.token) {
            return (
                <div className="token-not-found">
                    <h1>
                        :( <small>出错了</small>
                    </h1>
                    <p>没有获取到您的登录信息，您登录老用户帐号了吗？</p>
                    <p>
                        如果没有，请前往
                        <Link to="/passport/old/login">老用户登录界面</Link>
                        进行验证
                    </p>
                </div>
            );
        }

        return (
            <OldRegister
                isFetching={isFetching}
                error={error}
                success={success}
                onSubmitRegisterInfo={this.handleSubmitRegisterInfo}
            />
        );
    }
}

const mapRegisterStateToProps = state => {
    const oldRegisterState = state.getIn(['bypassing', 'oldRegister']);
    if (!oldRegisterState) return {};

    return {
        isFetching: oldRegisterState.get('isFetching'),
        success: oldRegisterState.get('items'),
        error: oldRegisterState.get('error'),
    };
};
const mapRegisterDispatchToProps = dispatch => ({
    oldRegisterWith: registerInfo => dispatch(oldRegisterWith(registerInfo)),
});
OldRegisterWrapper = connect(
    mapRegisterStateToProps,
    mapRegisterDispatchToProps
)(toJS(OldRegisterWrapper));

export { OldLoginWrapper, OldRegisterWrapper };
