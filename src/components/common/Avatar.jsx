import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import defaultAvatar from '../../assests/avatar-default.png';
import anonymousAvatar from '../../assests/anonymous.png';

const COLOR_ARRAY = ['#2196f3', '#3f51b5', '#9c27b0', '#ff5722', '#f44336', '#009688'];

class ImageFeed extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        name: PropTypes.string,
        type: PropTypes.string,
        anonymous: PropTypes.bool
    };

    static defaultProps = {
        type: 'user',
        anonymous: false
    };

    constructor (props) {
        super(props);
        const { type, id } = props;
        this.state = {
            src: `https://bbs.tju.edu.cn/api/${type}/${id}/avatar`,
            generateAvatar: false
        };

        this.handleError = this.handleError.bind(this);
    }

    handleError () {
        const { type, name, id, anonymous } = this.props;
        if (type === 'user') {
            if (!name) {
                this.setState({ src: defaultAvatar });
            } else if (anonymous) {
                this.setState({ src: anonymousAvatar });
            } else {
                this.setState({ generateAvatar: true });
            }
        }
    }

    render () {
        const { src, generateAvatar } = this.state;
        const { name, id, anonymous, type, ...restProps } = this.props;

        if (generateAvatar) {
            const randomColor = COLOR_ARRAY[Math.floor(Math.random() * COLOR_ARRAY.length)];
            return (
                <Link to={`/user/${id}`}>
                    <span
                        style={{ backgroundColor: randomColor, color: '#fff',
                            display: 'inline-block', fontWeight: 'bold', textAlign: 'center' }}
                        {...restProps}
                        >
                        {name.substring(0, 1).toUpperCase()}
                    </span>
                </Link>
            );
        }
        return (
            <Link to={`/user/${id}`}>
                <Image
                    src={src}
                    alt=""
                    circle
                    onError={this.handleError}
                    {...restProps} />
            </Link>
        );
    }
}

export default ImageFeed;
