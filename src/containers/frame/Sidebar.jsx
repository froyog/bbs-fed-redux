import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleSidebar } from '../../actions/frame/sidebar';
import Sidebar from '../../components/frame/Sidebar';
import { isMobile } from '../../utils/isMobile';

import '../../styles/frame/sidebar.less';


class SidebarWrapper extends React.Component {
    static propTypes = {
        isOpen: PropTypes.bool.isRequired,
        onToggleSidebar: PropTypes.func.isRequired,
        maxYoffset: PropTypes.number,
        minXOffset: PropTypes.number,
        minXDragDistance: PropTypes.number
    };

    static defaultProps = {
        maxYoffset: 150, // pixel
        minXOffset: 60,
        minXDragDistance: 40
    };

    constructor () {
        super();
        this.state = {
            startX: 0,
            lastX: 0,
            startY: 0,
            lastY: 0
        };

        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
    }

    componentWillMount() {
        const { onToggleSidebar } = this.props;
        onToggleSidebar(!isMobile());
    }

    handleTouchStart (e) {
        this.setState({
            startX: e.touches[0].clientX,
            startY: e.touches[0].clientY
        });
    }

    handleTouchMove (e) {
        this.setState({
            lastX: e.touches[0].clientX,
            lastY: e.touches[0].clientY
        });
    }

    handleTouchEnd () {
        const { startX, lastX, startY, lastY } = this.state;
        const { onToggleSidebar, maxYoffset, minXOffset, minXDragDistance } = this.props;

        this.setState({
            startX: 0,
            lastX: 0,
            startY: 0,
            lastY: 0
        });

        if (Math.abs(startY - lastY) > maxYoffset) return;

        if (lastX - startX > minXOffset && startX < minXDragDistance) {
            // slide right (open)
            // drag startX must be restricted
            onToggleSidebar(true);
        } else if (startX - lastX > minXOffset) {
            // slide left (close)
            onToggleSidebar(false);
        }

    }

    render () {
        const { isOpen, onToggleSidebar } = this.props;

        const overlayStyle = {
            'opacity': isOpen ? '0.5' : '0',
            'visibility': isOpen ? 'visible' : 'hidden'
        };

        return (
            <div>
                <Sidebar isOpen={isOpen} />
                <div
                    className="sidebar-overlay"
                    role="presentation"
                    onClick={() => onToggleSidebar(false)}
                    style={overlayStyle}>
                </div>
                <div
                    className="drag-control"
                    onTouchStart={this.handleTouchStart}
                    onTouchEnd={this.handleTouchEnd}
                    onTouchMove={this.handleTouchMove}>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    isOpen: state.get('sidebar')
});
const mapDispatchToProps = dispatch => ({
    onToggleSidebar: openStatus => dispatch(toggleSidebar(openStatus))
});
SidebarWrapper = connect(mapStateToProps, mapDispatchToProps)(SidebarWrapper);

export default SidebarWrapper;
