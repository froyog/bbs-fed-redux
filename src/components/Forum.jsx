import React from 'react';
import PropTypes from 'prop-types';


class Forum extends React.Component {
    constructor () {
        super();
        this.state = {
            exxpanded: false
        };
    }

    handleExpand () {
        const fid = this.props.basicInfo.id;

        this.setState({
            expanded: true
        });
        if (this.props.onGetDetail) {
            this.props.onGetDetail(fid);
        }
    }

    render () {
        const { basicInfo, detailedInfo, isFetching } = this.props;
        const { name, info, cBoard } = basicInfo;
        let renderDetailForum;

        if (detailedInfo) {
            renderDetailForum = (
                <ul>
                    detailedInfo.boards.map(board => {
                        const { cThread, id, info, name } = board;
                        return (
                            <li key={id}>
                                <p>Name: {name}</p>
                                <p>Info: {info}</p>
                                <p>Thread Count: {cThread}</p>
                            </li>
                        )
                    })
                </ul>
            )
        }


        return (
            <li>
                <p>Name: {name}</p>
                <p>Info: {info}</p>
                <p>Boards Number: {cBoard}</p>
                <button
                    onClick={this.handleExpand.bind(this)}
                >
                    Expand
                </button>
            </li>
        )
    }
}

export default Forum;
