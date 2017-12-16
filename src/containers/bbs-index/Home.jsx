import React from 'react';
// import PropTypes from 'prop-types';
import TopTen from './TopTen';
import Latest from './Latest';
import { AnnounceWrapper, AppQRCode, WeiboFollowing, CarouselAdWrapper, IndexRankWrapper } from './IndexWidgets';
import { Card } from '../../components/common/Card';
import { Row, Col } from 'react-bootstrap';

const HomeWrapper = () =>
    <Row>
        <Col md={9}>
            <TopTen />
            <Latest />
        </Col>
        <Col md={3} smHidden xsHidden>
            <AnnounceWrapper />
            <IndexRankWrapper />
            <CarouselAdWrapper />
            <WeiboFollowing />
            <AppQRCode />
        </Col>
    </Row>;

export default HomeWrapper;
