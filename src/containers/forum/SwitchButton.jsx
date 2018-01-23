import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toJS } from '../../util';
import { followBoard, collectThread } from '../../actions/forum/switchButton';
import { showToast } from '../../actions/common/toast';

class SwitchButton extends React.Component {
    static propTypes = {
        children: PropTypes.func.isRequired,
        switchType: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        isFetching: PropTypes.bool,
        success: PropTypes.string,
        error: PropTypes.string,
        initialState: PropTypes.bool
    }

    constructor (props) {
        super(props);
        this.state = {
            active: props.initialState
        }

        this.handleClickButton = this.handleClickButton.bind(this);
        this.callRelatedAction = this.callRelatedAction.bind(this);
    }

    componentWillMount () {
        this.setState({
            active: this.props.initialState
        });
    }

    componentWillReceiveProps (nextProps) {
        const { error, isFetching, showToast } = nextProps;
        if (error && !isFetching && isFetching !== this.props.isFetching) {
            showToast(error);
            this.setState({
                active: !this.state.active
            });
        }
    }

    callRelatedAction () {
        const nextState = !this.state.active,
              id = this.props.id;

        switch (this.props.switchType) {
            case 'follow':
                this.props.onChangeFollowState(id, nextState);
                break;
            case 'collect':
                this.props.onChangeCollectState(id, nextState);
                break;
            default:
                break;
        }
    }

    handleClickButton () {
        this.setState({
            active: !this.state.active
        });
        this.callRelatedAction();
    }

    render () {
        return (
            this.props.children(this.state.active, this.handleClickButton)
        );
    }
}

const mapStateToProps = state => {
    const switchButtonState = state.get('switchButton');
    if (!switchButtonState) return {};

    return {
        isFetching: switchButtonState.get('isFetching'),
        success: switchButtonState.get('success'),
        error: switchButtonState.get('error')
    };
};
const mapDispatchToProps = dispatch => ({
    onChangeFollowState: (bid, nextFollowState) => dispatch(followBoard(bid, nextFollowState)),
    onChangeCollectState: (tid, nextColloectState) => dispatch(collectThread(tid, nextColloectState)),
    // onChangeLikeThreadState: (tid, nextLikeState) => dispatch(likeThread(tid, nextLikeState)),
    // onChangeLikePostState: (pid, nextLikeState) => dispatch(likePost(pid, nextLikeState)),
    showToast: message => dispatch(showToast(message))
})
SwitchButton = connect(mapStateToProps, mapDispatchToProps)(SwitchButton);
export default SwitchButton;