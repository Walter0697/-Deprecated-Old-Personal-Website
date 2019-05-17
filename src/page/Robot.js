import React from 'react';
import { isMobile } from 'react-device-detect';

import '../css/extra.css';

//get all the images
import main from '../sprite/robot/robot_main.png';
import O1 from '../sprite/robot/order_1.png';
import O2 from '../sprite/robot/order_2.png';
import O3 from '../sprite/robot/order_3.png';
import R1 from '../sprite/robot/random_1.png';
import R2 from '../sprite/robot/random_2.png';
import R3 from '../sprite/robot/random_3.png';
import R4 from '../sprite/robot/random_4.png';
import R5 from '../sprite/robot/random_5.png';

import eye from '../sprite/robot/robot_eye.png';

import C1 from '../sprite/robot/coffee_1.png';
import C2 from '../sprite/robot/coffee_2.png';
import C3 from '../sprite/robot/coffee_3.png';
import C4 from '../sprite/robot/coffee_4.png';

const orders = [O1, O2, O3];
const randoms = [R1, R2, R3, R4, R5];
const coffee = [C1, C2, C3, C4];

export default class Robot extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			width: window.innerWidth,
			height: window.innerHeight,
			mobileView : isMobile,
			
			mouse_x: 0,
			mouse_y: 0,
			mTop: '0%',
			mLeft: '0%',
			current_image: main,
			current_coffee: C1,
			
			testing: 0,
		};
	}
	
	componentWillMount() {
		window.addEventListener('resize', this.handleWindowSizeChange);
		
		this.stayImage();
		this.setCoffee();
	}
	
	componentWillUnmount() {
		window.removeEventListener('resize', this.handleWindowSizeChange);
	}
	
	handlingOrientation(event){
		this.setState({ testing: event });
	};
	
	handleWindowSizeChange = () => {
		this.setState({ width: window.innerWidth, height: window.innerHeight});
		this.setState({ mobileView : isMobile });
	};
	
	handleMouseMove = (event) => {
		this.setState({ mouse_x: event.clientX, mouse_y: event.clientY});
		
		var ratio = ((this.state.mouse_x - (this.state.width * 0.25)) / (this.state.width * 0.25));
		this.setState({ mLeft: ratio + '%'});

		ratio = (this.state.mouse_y - (this.state.height * 0.25)) / (this.state.height * 0.25);
		this.setState({ mTop: ratio + '%' });
	}
	
	setCoffee() {
		setTimeout(
			function() {
				this.setState({ current_coffee: this.getRandomCoffee() });
				this.setCoffee();
		}.bind(this), Math.random() * 500 + 500);
	}
	
	changeImage() {
		setTimeout(
			function() {
				this.setState({ current_image: this.getRandomImage() });
				this.stayImage();
		}.bind(this), Math.random() * 1500 + 500);
	}
	
	stayImage() {
		setTimeout(
			function() {
				this.setState({ current_image: main });
				this.changeImage();
		}.bind(this), Math.random() * 300 + 50);
	}
	
	getRandomImage() {
		var index = Math.floor((Math.random() * 100) + 1);
		if (index >= 70)
		{
			index = Math.floor((Math.random() * randoms.length));
			return randoms[index];
		}
		var output = orders.shift();
		orders.push(output);
		return output;
	}
	
	getRandomCoffee() {
		var index = Math.floor((Math.random() * coffee.length));
		return coffee[index];
	}
	
	render() {
		const {mobileView} = this.state;
		if (mobileView)
		{
			return (
				<div className="wholeScreen" 
					 onMouseMove={this.handleMouseMove.bind(this)}
					 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<img src={eye} className="robot" style={{ width: '60%' }} alt="" />
					<img src={this.state.current_coffee} className="robot" style={{ width: '60%'}} alt="" />
					<img src={this.state.current_image} className="robot" style={{ width: '60%' }} alt="" />
				</div>
			)
		}
		else
		{
			return (
				<div className="wholeScreen" 
					 onMouseMove={this.handleMouseMove.bind(this)}
					 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<img src={eye} className="robot"
						 style={{ marginLeft: this.state.mLeft,
								  marginTop: this.state.mTop, width: '60%' }} alt="" />
					<img src={this.state.current_coffee} className="robot" style={{ width: '60%'}} alt="" />
					<img src={this.state.current_image} className="robot" style={{ width: '60%' }} alt="" />
				</div>
			)
		}
	}
}