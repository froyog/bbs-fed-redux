import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/common/error.less';

class NoMatch extends React.Component {
    componentDidMount() {
        const canvas = document.getElementById('snow');
        this._makeSnow(canvas);
    }

    _makeSnow(el) {
        var ctx = el.getContext('2d');
        var width = 0;
        var height = 0;
        var particles = [];

        var Particle = function() {
            this.x = this.y = this.dx = this.dy = 0;
            this.reset();
        };

        Particle.prototype.reset = function() {
            this.y = Math.random() * height;
            this.x = Math.random() * width;
            this.dx = Math.random() * 1 - 0.5;
            this.dy = Math.random() * 0.5 + 0.5;
        };

        const createParticles = count => {
            // eslint-disable-next-line
            if (count != particles.length) {
                particles = [];
                for (var i = 0; i < count; i++) {
                    particles.push(new Particle());
                }
            }
        };

        const onResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            el.width = width;
            el.height = height;

            createParticles((width * height) / 10000);
        };

        const updateParticles = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = '#f6f9fa';

            particles.forEach(particle => {
                particle.y += particle.dy;
                particle.x += particle.dx;

                if (particle.y > height) {
                    particle.y = 0;
                }

                if (particle.x > width) {
                    particle.reset();
                    particle.y = 0;
                }

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, 5, 0, Math.PI * 2, false);
                ctx.fill();
            });
            window.requestAnimationFrame(updateParticles);
        };

        onResize();
        updateParticles();

        window.addEventListener('resize', onResize);
    }

    render() {
        return (
            <div className="not-found-content">
                <canvas className="snow" id="snow" />
                <div className="main-text">
                    <h1>喔唷</h1>
                    <h3>页面不存在</h3>
                    <Link to="/" className="home-link">
                        回到主页
                    </Link>
                </div>
                <div className="ground">
                    <div className="mound">
                        <div className="mound_text">404</div>
                        <div className="mound_spade" />
                    </div>
                </div>
            </div>
        );
    }
}

export default NoMatch;
