import React from 'react';
// import PropTypes from 'prop-types';
import { Media, Image } from 'react-bootstrap';
import dice from '../../assests/dice.jpg';
import { Card } from './Card';
import { Link } from 'react-router-dom';


const FeelingLucky = () => {
    return (
        <Card className="card-feeling-lucky pull-left">
            <Media>
                <Media.Left>
                    <Image src={dice} className="dice-image" alt="dice" circle />
                </Media.Left>
                <Media.Body>
                    <Media.Heading>
                        选择恐惧症&nbsp;
                        <small>Decidophobia</small>
                    </Media.Heading>
                    <p>对于做出决策感到恐惧？缺乏自立意识，害怕失败？</p>
                    <p>没关系，<Link to="/forum/board/193/page/1">点击进入随机生成的板块</Link></p>
                </Media.Body>
            </Media>
        </Card>
    );
};

export default FeelingLucky;
