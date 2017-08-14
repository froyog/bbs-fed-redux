import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardImage } from './common/Card';
import { Col } from 'react-bootstrap';
import '../styles/forum/forum-page.less';


class Forum extends React.Component {
    static propTypes = {
        isFetching: PropTypes.bool,
        basicInfo: PropTypes.shape({
            name: PropTypes.string.isRequired,
            info: PropTypes.string.isRequired,
            cBoard: PropTypes.number.isRequired,
            id: PropTypes.number.isRequired
        }),
        detailedInfo: PropTypes.shape({
            boards: PropTypes.array,
            forum: PropTypes.object
        }),
        onGetDetail: PropTypes.func.isRequired
    }

    constructor () {
        super();
        this.state = {
            expanded: false
        };

        this.handleExpand = this.handleExpand.bind(this);
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
        const { name, info, cBoard, id } = basicInfo;
        const { expanded } = this.state;
        let renderDetailForum;

        if (detailedInfo && expanded) {
            renderDetailForum = isFetching
                ? <h5>Loading Boards</h5>
                : <ul>
                    {detailedInfo.boards.map(board => {
                        const { cThread, id, info, name } = board;
                        return (
                            <li key={id}>
                                <p>Name: {name}</p>
                                <p>Info: {info}</p>
                                <p>Thread Count: {cThread}</p>
                            </li>
                        );
                    })}
                </ul>;
        }
        console.log(this.state);
        return (
            <Col
                className={expanded ? 'forum-expand' : ''}
                md={6}
                onClick={this.handleExpand}
            >
                <CardImage
                    className="card-forum"
                    image={`http://bbs.tju.edu.cn:8080/api/forum/${id}/cover`}
                    alt="Forum Cover"
                    title={name}
                />
                {renderDetailForum}
            </Col>

        );
    }
}

export default Forum;
