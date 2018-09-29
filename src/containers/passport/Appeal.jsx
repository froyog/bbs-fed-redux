import React from 'react';
import PropTypes from 'prop-types';
import Appeal from '../../components/passport/Appeal';
import { connect } from 'react-redux';
import { toJS } from '../../util';
import { sendAppeal } from '../../actions/passport/appeal';

let AppealWrapper = ({ isFetching, error, item, onSubmitAppeal }) => {
    const handleSubmitAppeal = appealInfo => {
        onSubmitAppeal && onSubmitAppeal(appealInfo);
    };
    return (
        <Appeal
            success={item}
            isFetching={isFetching}
            error={error}
            onSubmitAppeal={handleSubmitAppeal}
        />
    );
};

AppealWrapper.propTypes = {
    onSubmitAppeal: PropTypes.func.isRequired,
    isFetching: PropTypes.bool,
    error: PropTypes.string,
};

const mapStateToProps = state => {
    const appealState = state.getIn(['bypassing', 'appeal']);

    return {
        isFetching: appealState.get('isFetching'),
        item: appealState.get('items'),
        error: appealState.get('error'),
    };
};
const mapDispatchToProps = dispatch => ({
    onSubmitAppeal: appealInfo => dispatch(sendAppeal(appealInfo)),
});
AppealWrapper = connect(
    mapStateToProps,
    mapDispatchToProps
)(toJS(AppealWrapper));
export default AppealWrapper;
