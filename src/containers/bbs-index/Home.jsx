import React from 'react';
// import PropTypes from 'prop-types';
import TopTen from './TopTen';
import Latest from './Latest';
import { Card } from '../../components/common/Card';
import { Row, Col } from 'react-bootstrap';

const HomeWrapper = () =>
    <Row>
        <Col md={9}>
            <TopTen />
            <Latest />
            <Card title="还没看过瘾？"></Card>
        </Col>
        <Col md={3}>

        </Col>
    </Row>;

export default HomeWrapper;
