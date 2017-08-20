import React from 'react';
import PropTypes from 'prop-types';
import { CardImage } from './common/Card';
import FetchingOverlay from './common/FetchingOverlay';
import ErrorControl from './common/ErrorControl';
import { Col, ListGroup, ListGroupItem,
         Media, Button } from 'react-bootstrap';
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
        onGetDetail: PropTypes.func.isRequired,
        error: PropTypes.string
    }

    constructor () {
        super();
        this.state = {
            expanded: false
        };

        this.handleExpand = this.handleExpand.bind(this);
        this.handleCollapse = this.handleCollapse.bind(this);
    }

    handleExpand () {
        if (this.state.expanded) {
            // already expanded
            return;
        }

        const { basicInfo, onGetDetail } = this.props;
        const fid = basicInfo.id;

        this.setState({ expanded: true });
        if (onGetDetail) {
            onGetDetail(fid);
        }
    }

    handleCollapse () {
        this.setState({ expanded: false });
    }

    render () {
        const { basicInfo, detailedInfo, isFetching, error } = this.props;
        const { name, info, cBoard, id } = basicInfo;
        const { expanded } = this.state;
        const isExpand = detailedInfo && expanded && !error && !isFetching;
        let renderForumDetail;

        if (isExpand) {
            const { moderator } = detailedInfo.forum;
            const renderModerators = moderator.length
                ? moderator.map(admin => <a href={`${admin.uid}`}>{admin.name} </a>)
                : '暂无';
            renderForumDetail =
            <div>
                <Media className="forum-detail">
                    <Media.Left>
                        <img width={200} height={200} src={`http://bbs.tju.edu.cn:8080/api/forum/${id}/cover`} alt="Forum Cover" />
                    </Media.Left>
                    <Media.Body>
                        <Media.Heading>{name}</Media.Heading>
                        <p>板块：{cBoard}</p>
                        <p>区长：{renderModerators}</p>
                        <p>{info}</p>
                        <Button
                            className="raised"
                            bsStyle="primary"
                            onClick={this.handleCollapse}
                        >
                            收起
                        </Button>
                    </Media.Body>
                </Media>
                <ListGroup>
                    {detailedInfo.boards.map(board => {
                        const { id, info, name } = board;
                        return (
                            <ListGroupItem
                                key={id}
                                header={name}
                                href={`forums/board/${id}`}
                                >
                                {info}
                            </ListGroupItem>
                        );
                    })}
                </ListGroup>
            </div>;
        }

        return (
            <Col
                className={isExpand ? 'card-forum active' : 'card-forum'}
                sm={6}
                onClick={this.handleExpand}
            >
                {error && <ErrorControl />}
                {isFetching ? <FetchingOverlay /> : null}
                <CardImage
                    image={`http://bbs.tju.edu.cn:8080/api/forum/${id}/cover`}
                    alt="Forum Cover"
                    title={name}
                >
                    {renderForumDetail}
                </CardImage>
            </Col>

        );
    }
}

export default Forum;
