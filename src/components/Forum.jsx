import React from 'react';
import PropTypes from 'prop-types';
import { CardImage } from './common/Card';
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
        onGetDetail: PropTypes.func.isRequired
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
        console.log(this.state);
        this.setState({ expanded: false });
    }

    render () {
        const { basicInfo, detailedInfo, isFetching } = this.props;
        const { name, info, cBoard, id } = basicInfo;
        const { expanded } = this.state;
        let renderBoardList = null, renderForumDetail = null;

        if (detailedInfo && expanded) {
            if (isFetching) {
                renderBoardList = <h5>Loading Boards</h5>;
            } else {
                const { moderator } = detailedInfo.forum;
                const renderModerators = moderator.length
                    ? moderator.map(admin => <a href={`${admin.uid}`}>{admin.name} </a>)
                    : '暂无';
                renderForumDetail =
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
                                bsStyle="primary"
                                onClick={this.handleCollapse}
                            >
                                收起
                            </Button>
                        </Media.Body>
                    </Media>;

                renderBoardList =
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
                    </ListGroup>;
            }
        }

        return (
            <Col
                className={expanded ? 'card-forum active' : 'card-forum'}
                md={6}
                onClick={this.handleExpand}
            >
                <CardImage
                    image={`http://bbs.tju.edu.cn:8080/api/forum/${id}/cover`}
                    alt="Forum Cover"
                    title={name}
                >
                    {renderForumDetail}
                    {renderBoardList}
                </CardImage>
            </Col>

        );
    }
}

export default Forum;
