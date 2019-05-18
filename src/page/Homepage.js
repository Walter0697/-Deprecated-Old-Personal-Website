import React from 'react';
import { Parallax, ParallaxLayer } from 'react-spring/addons';
import { isMobile } from 'react-device-detect';
import ReactTooltip from 'react-tooltip';

//importing css
import '../css/home.css';

//get all the images
import avator from '../sprite/homepage/avator.svg';
import bottomBackground from '../sprite/homepage/background.png';

import frontHouse from '../sprite/homepage/fronthouse.png';
import backHouse from '../sprite/homepage/backhouse.png';
import houseText from '../sprite/homepage/houseWord.png';
import resumePaper from '../sprite/homepage/resumePaper.png';

import cloud from '../sprite/homepage/cloud.png'; 

//static png for mobile site
import robot from '../sprite/homepage/robot.png';
import connect from '../sprite/homepage/connect.png';

//animation related
import mainScreen from '../sprite/homepage/robot_animation/s0.png';
import s1 from '../sprite/homepage/robot_animation/s1.png';
import s2 from '../sprite/homepage/robot_animation/s2.png';
import s3 from '../sprite/homepage/robot_animation/s3.png';
import s4 from '../sprite/homepage/robot_animation/s4.png';
import s5 from '../sprite/homepage/robot_animation/s5.png';
import s6 from '../sprite/homepage/robot_animation/s6.png';
import s7 from '../sprite/homepage/robot_animation/s7.png';

import c1 from '../sprite/homepage/robot_animation/c1.png';
import c2 from '../sprite/homepage/robot_animation/c2.png';
import c3 from '../sprite/homepage/robot_animation/c3.png';

const screens = [s1, s2, s3, s4, s5, s6, s7];
const coffee  = [c1, c2, c3];


export default class HomePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			width: window.innerWidth,
			height: window.innerHeight,
			mobileView : isMobile || window.innerHeight > window.innerWidth,
			mobileTextSize: Math.round(window.innerWidth / 40) + "px",
			
			buttonAlpha: 0.0,
			arrowAlpha: 1.0,
			scrolling: 0,
			
			resumeOffset: '3%',
			
			current_screen: mainScreen,
			current_coffee: c1,
		};
		this.handleScroll = this.handleScroll.bind(this);
	}
	
	componentWillMount() {
		window.addEventListener('resize', this.handleWindowSizeChange);
		window.addEventListener('scroll', this.handleScroll, true);
		this.setScreen();
		this.setCoffee();
	}
	
	componentWillUnmount() {
		window.removeEventListener('resize', this.handleWindowSizeChange);
		window.removeEventListener('scroll', this.handleScroll, true);
	}
	
	setScreen() {
		setTimeout(
			function() {
				this.setState({ current_screen: mainScreen });
				setTimeout (
					function() {
						this.setState({ current_screen: screens[Math.floor(Math.random() * screens.length)]});
						this.setScreen();
					}.bind(this), Math.random() * 1500 + 500 
				);
			}.bind(this), Math.random() * 500 + 200
		);
	}
	
	setCoffee() {
		setTimeout(
			function() {
				var output = coffee.shift();
				coffee.push(output);
				this.setState({ current_coffee: output });
				this.setCoffee();
			}.bind(this), Math.random() * 200 + 500
		);
	}
	
	handleWindowSizeChange = () => {
		this.setState({ width: window.innerWidth, height: window.innerHeight});
		this.setState({ mobileView : isMobile || this.state.height > this.state.width, mobileTextSize: Math.round(window.innerWidth / 40) + "px"});
	};
	
	scrollToRef = (target) => {
		this.parallax.scrollTo(target);
	}
	
	redirectOut = (link) => {
		window.location = link;
	}

	handleScroll(event){
		this.setState({ scrolling: event.target.scrollTop});
		//handling button alpha
		if (this.state.scrolling >= 130)
			this.setState({ buttonAlpha : 1 });
		else if (this.state.scrolling >= 30)
			this.setState({ buttonAlpha : (this.state.scrolling - 30) / 100.0 });
		else 
			this.setState({ buttonAlpha : 0 });
		
		//handling arrow alpha
		if (this.state.scrolling >= 90)
			this.setState({ arrowAlpha : 0 });
		else if (this.state.scrolling >= 30)
			this.setState({ arrowAlpha : (90 - this.state.scrolling) / 100.0 });
		else
			this.setState({ arrowAlpha : 1 });
	
		var offset = (this.state.scrolling / 50) % 12;
		if (offset > 6) offset = 12 - offset;
		offset = Math.round(offset * 10) / 10;
		this.setState({ resumeOffset: offset + '%' });
	}

	render() {
		const {mobileView} = this.state;
		if (mobileView) {
			//MOBILE VIEW
			return (
			<div style={{ backgroundColor: '#87CEEB' }}>
				<div className="titleMobileFont" style={{ fontSize: this.state.mobileTextSize, width: '100%', position: 'fixed', opacity: this.state.buttonAlpha }}>
					<div style={{ display: 'flex', flex: 1, justifyContent: 'space-around'}} >
								<div onClick={this.scrollToRef.bind(this, 0.0)}><u>WALTER CHENG</u></div>
								<div onClick={this.scrollToRef.bind(this, 1.0)}>PROJECTS</div> 
								<div onClick={this.scrollToRef.bind(this, 1.2)}>RESUME</div>
								<div onClick={this.scrollToRef.bind(this, 1.4)}>STATUS</div>
								<div><a data-tip="Walter Cheng" href="https://www.linkedin.com/in/wai-walter-cheng/"><i className="fab fa-linkedin"/><ReactTooltip /> </a>
									 <a data-tip="Walter0697" href="https://github.com/Walter0697"><i className="fab fa-github-square"/><ReactTooltip /> </a>
									 <a data-tip="walterpakwai@live.com" href="mailto:walterpakwai@live.com"><i className="fas fa-envelope-square"/><ReactTooltip /> </a>
									 <a data-tip="+1(343)777-8008" href="/#"><i className="fas fa-phone-square"/><ReactTooltip /> </a></div>
					</div>
				</div>
				<Parallax ref={ref => (this.parallax = ref)} pages={3}>
					<ParallaxLayer offset={0} speed={0} factor={3} className="cyan-background" />
							
					<ParallaxLayer
						note={"drawing icon"}
						offset={0}
						speed={0.3}
						style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
						<img id="icon" src={avator} style={{width: '15%'}} alt=""  />
					</ParallaxLayer>
					<ParallaxLayer
						offset={0.2}
						speed={0.3}
						style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: this.state.arrowAlpha}}>
						<div id="arrow"> <i className="fa fa-chevron-down fa-4x" aria-hidden="true"></i></div> 
					</ParallaxLayer>
					
					<ParallaxLayer
						note={"cloud5"}
						offset={0.9}
						speed={0.45}
						style={{display: 'flex', alignItems: 'center', justifyContent:'center', opacity:'0.3'}}>
							<img src={cloud} style={{width: '45%', marginRight: '50%'}} alt="" />
					</ParallaxLayer>
					<ParallaxLayer
						note={"cloud6"}
						offset={0.86}
						speed={0.88}
						style={{display: 'flex', alignItems: 'center', justifyContent:'center', opacity:'0.3'}}>
							<img src={cloud} style={{width: '30%', marginRight: '80%'}} alt="" />
					</ParallaxLayer>
					<ParallaxLayer
						note={"cloud7"}
						offset={0.81}
						speed={1.12}
						style={{display: 'flex', alignItems: 'center', justifyContent:'center', opacity:'0.3'}}>
							<img src={cloud} style={{width: '40%', marginLeft: '75%'}} alt="" />
					</ParallaxLayer>
					<ParallaxLayer
						note={"cloud8"}
						offset={0.95}
						speed={0.88}
						style={{display: 'flex', alignItems: 'center', justifyContent:'center', opacity:'0.3'}}>
							<img src={cloud} style={{width: '10%', marginRight: '80%'}} alt="" />
					</ParallaxLayer>
					<ParallaxLayer
						note={"cloud9"}
						offset={0.86}
						speed={0.78}
						style={{display: 'flex', alignItems: 'center', justifyContent:'center', opacity:'0.3'}}>
							<img src={cloud} style={{width: '15%', marginLeft: '90%'}} alt="" />
					</ParallaxLayer>
					
					<ParallaxLayer
						note={"not quite important"}
						offset={1.0}
						speed={0.2}
						style={{display: 'flex', alignItems: 'center', justifyContent:'center'}}>
							<img src={connect} style={{width: '160%'}} alt="" />
					</ParallaxLayer>
					<ParallaxLayer 
						note={"HOUSE UNDER HERE"}
						offset={1.0} 
						speed={0.2} 
						style={{display: 'flex', alignItems: 'center', justifyContent:'center'}}>
							<img src={backHouse} style={{width: '160%'}} alt="" />
					</ParallaxLayer>
					<ParallaxLayer
						note={"ROBOT UNDER HERE"}
						offset={1.0}
						speed={0.2}
						style={{display: 'flex', alignItems: 'center', justifyContent:'center'}}>
							<img src={robot} style={{width: '160%'}} alt="" />
					</ParallaxLayer>
					<ParallaxLayer
						note={"HOUSE ON FRONT"}
						offset={1.0}
						speed={0.2}
						style={{display: 'flex', alignItems: 'center', justifyContent:'center'}}>
							<img src={houseText} style={{width: '160%'}} alt="" />
					</ParallaxLayer>
					<ParallaxLayer 
						note={"front of the house"}
						offset={1.0} 
						speed={0.2} 
						style={{display: 'flex', alignItems: 'center', justifyContent:'center'}}>
							<img src={frontHouse} style={{width: '160%'}} alt="" />
					</ParallaxLayer>
					<ParallaxLayer 
						note={"resume"}
						offset={1.0} 
						speed={0.2} 
						style={{display: 'flex', alignItems: 'center', justifyContent:'center',  marginTop: this.state.resumeOffset }}>
							<img src={resumePaper} style={{width: '140%'}} alt="" />
					</ParallaxLayer>
					
					<ParallaxLayer
						note={"cloud"}
						offset={0.4}
						speed={0.15}
						style={{display: 'flex', alignItems: 'center', justifyContent:'center', opacity:'0.4'}}>
							<img src={cloud} style={{width: '45%', marginRight: '60%'}} alt="" />
					</ParallaxLayer>
					<ParallaxLayer
						note={"cloudword"}
						offset={0.4}
						speed={0.15}
						style={{display: 'flex', alignItems: 'center', justifyContent:'center'}}>
							<div src={cloud} className="cloudMobileWord" style={{width: '45%', marginRight: '60%'}}>
								I'm Walter...
							</div>
					</ParallaxLayer>
					<ParallaxLayer
						note={"cloud2"}
						offset={0.55}
						speed={0.3}
						style={{display: 'flex', alignItems: 'center', justifyContent:'center', opacity:'0.4'}}>
							<img src={cloud} style={{width: '40%', marginLeft: '50%'}} alt="" />
					</ParallaxLayer>
					<ParallaxLayer
						note={"cloudword2"}
						offset={0.55}
						speed={0.3}
						style={{display: 'flex', alignItems: 'center', justifyContent:'center'}}>
							<div src={cloud} className="cloudMobileWord" style={{width: '40%', marginLeft: '50%'}}>
								a programmer
							</div>
					</ParallaxLayer>
					<ParallaxLayer
						note={"cloud3"}
						offset={0.6}
						speed={0.2}
						style={{display: 'flex', alignItems: 'center', justifyContent:'center', opacity:'0.4'}}>
							<img src={cloud} style={{width: '30%', marginRight: '50%'}} alt="" />
					</ParallaxLayer>
					<ParallaxLayer
						note={"cloudword3"}
						offset={0.6}
						speed={0.2}
						style={{display: 'flex', alignItems: 'center', justifyContent:'center'}}>
							<div src={cloud} className="cloudMobileWord" style={{width: '30%', marginRight: '50%'}}>
								a developer
							</div>
					</ParallaxLayer>
					<ParallaxLayer
						note={"cloud4"}
						offset={0.66}
						speed={0.2}
						style={{display: 'flex', alignItems: 'center', justifyContent:'center', opacity:'0.4'}}>
							<img src={cloud} style={{width: '35%', marginLeft: '60%'}} alt="" />
					</ParallaxLayer>
					<ParallaxLayer
						note={"cloudword4"}
						offset={0.66}
						speed={0.2}
						style={{display: 'flex', alignItems: 'center', justifyContent:'center'}}>
							<div src={cloud} className="cloudMobileWord" style={{width: '35%', marginLeft: '60%'}}>
								a designer
							</div>
					</ParallaxLayer>
					
					<ParallaxLayer
						offset={0.9}
						speed={0.2}
						style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50%', marginLeft: '25%'}}
						onClick={this.redirectOut.bind(this, "/m_projects")}>
					</ParallaxLayer>
					<ParallaxLayer
						offset={1.2}
						speed={0.2}
						style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50%', marginLeft: '25%'}}
						onClick={this.redirectOut.bind(this, "www.waltercheng.com:3000/#resume")}
						data-tip="Currently in my old website!">
						<ReactTooltip />
					</ParallaxLayer>
					<ParallaxLayer
						offset={1.5}
						speed={0.2}
						style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50%', marginLeft: '25%'}}
						onClick={this.redirectOut.bind(this, "/numbers")}>
					</ParallaxLayer>
					<ParallaxLayer
						offset={1.2}
						speed={0.2}
						style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '23%', marginLeft: '8%' }}
						onClick={this.redirectOut.bind(this, '/static/waltercheng.pdf')}
						data-tip="Click to view!">
						<ReactTooltip />
					</ParallaxLayer>
					
					<ParallaxLayer
						note={"CONTACT ME"}
						offset={2.25}
						speed={0.0}
						style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
							<div className="bottomMobileText">CONTACT ME!</div>
					</ParallaxLayer>
					<ParallaxLayer
						note={"not every devices can see the topbar, so contact list here"}
						offset={2.0}
						speed={0.0}
						style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
							<div className="mobileIconSize">
								 <a data-tip="Walter Cheng" href="https://www.linkedin.com/in/wai-walter-cheng/"><i className="fab fa-linkedin"/><ReactTooltip /> </a>
								 <a data-tip="Walter0697" href="https://github.com/Walter0697"><i className="fab fa-github-square"/><ReactTooltip /> </a>
								 <a data-tip="walterpakwai@live.com" href="mailto:walterpakwai@live.com"><i className="fas fa-envelope-square"/><ReactTooltip /> </a>
								 <a data-tip="+1(343)777-8008" href="/#"><i className="fas fa-phone-square"/><ReactTooltip /> </a></div>
					</ParallaxLayer>
					
					<ParallaxLayer 
						note={"drawing the bottom footer"}
						offset={2.5} speed={-0.2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
						<img src={bottomBackground} style={{ width: '100%' }} alt="" />
					</ParallaxLayer>
				</Parallax>
			</div>
			)
		}
		else
		{
			//WEBSITE VIEW
			return (
			<Parallax ref={ref => (this.parallax = ref)} pages={4}>
				<ParallaxLayer offset={0} speed={0} factor={4} className="cyan-background" />
						
				<ParallaxLayer
					note={"drawing icon"}
					offset={0}
					speed={0.3}
					style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<img id="icon" src={avator} style={{width: '15%'}} alt="" />
				</ParallaxLayer>
				<ParallaxLayer
					offset={0.3}
					speed={0.3}
					style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: this.state.arrowAlpha}}>
					<div id="arrow"> <i className="fa fa-chevron-down fa-4x" aria-hidden="true"></i></div> 
				</ParallaxLayer>
				
				<ParallaxLayer
					note={"cloud5"}
					offset={1.6}
					speed={0.45}
					style={{display: 'flex', alignItems: 'center', justifyContent:'center', opacity:'0.3'}}>
						<img src={cloud} style={{width: '45%', marginRight: '50%'}} alt="" />
				</ParallaxLayer>
				<ParallaxLayer
					note={"cloud6"}
					offset={1.8}
					speed={0.88}
					style={{display: 'flex', alignItems: 'center', justifyContent:'center', opacity:'0.3'}}>
						<img src={cloud} style={{width: '30%', marginRight: '80%'}} alt="" />
				</ParallaxLayer>
				<ParallaxLayer
					note={"cloud7"}
					offset={1.9}
					speed={1.12}
					style={{display: 'flex', alignItems: 'center', justifyContent:'center', opacity:'0.3'}}>
						<img src={cloud} style={{width: '40%', marginLeft: '75%'}} alt="" />
				</ParallaxLayer>
				<ParallaxLayer
					note={"cloud8"}
					offset={0.7}
					speed={0.88}
					style={{display: 'flex', alignItems: 'center', justifyContent:'center', opacity:'0.3'}}>
						<img src={cloud} style={{width: '10%', marginRight: '80%'}} alt="" />
				</ParallaxLayer>
				<ParallaxLayer
					note={"cloud9"}
					offset={0.8}
					speed={0.78}
					style={{display: 'flex', alignItems: 'center', justifyContent:'center', opacity:'0.3'}}>
						<img src={cloud} style={{width: '15%', marginLeft: '90%'}} alt="" />
				</ParallaxLayer>
				
				<ParallaxLayer 
					note={"HOUSE UNDER HERE"}
					offset={1.8} 
					speed={0.2} 
					style={{display: 'flex', alignItems: 'center', justifyContent:'center'}}>
						<img src={backHouse} style={{width: '110%'}} alt="" />
				</ParallaxLayer>
				<ParallaxLayer
					note={"SCREEN ANIMATION"}
					offset={1.8}
					speed={0.2}
					style={{display: 'flex', alignItems: 'center', justifyContent:'center'}}>
						<img src={this.state.current_screen} style={{width: '110%'}} alt="" />
				</ParallaxLayer>
				<ParallaxLayer
					note={"COFFEE HERE"}
					offset={1.8}
					speed={0.2}
					style={{display: 'flex', alignItems: 'center', justifyContent:'center'}}>
						<img src={this.state.current_coffee} style={{width: '110%'}} alt="" />
				</ParallaxLayer>
				<ParallaxLayer
					note={"HOUSE ON FRONT"}
					offset={1.8}
					speed={0.2}
					style={{display: 'flex', alignItems: 'center', justifyContent:'center'}}>
						<img src={houseText} style={{width: '110%'}} alt="" />
				</ParallaxLayer>
				<ParallaxLayer 
					note={"front of the house"}
					offset={1.8} 
					speed={0.2} 
					style={{display: 'flex', alignItems: 'center', justifyContent:'center'}}>
						<img src={frontHouse} style={{width: '110%'}} alt="" />
				</ParallaxLayer>
				<ParallaxLayer 
					note={"resume"}
					offset={1.8} 
					speed={0.2} 
					style={{display: 'flex', alignItems: 'center', justifyContent:'center',  marginTop: this.state.resumeOffset }}>
						<img src={resumePaper} style={{width: '110%'}} alt="" />
				</ParallaxLayer>
				
				<ParallaxLayer
					note={"cloud"}
					offset={0.75}
					speed={0.15}
					style={{display: 'flex', alignItems: 'center', justifyContent:'center', opacity:'0.4'}}>
						<img src={cloud} style={{width: '45%', marginRight: '60%'}} alt="" />
				</ParallaxLayer>
				<ParallaxLayer
					note={"cloudword"}
					offset={0.75}
					speed={0.15}
					style={{display: 'flex', alignItems: 'center', justifyContent:'center'}}>
						<div src={cloud} className="cloudWord" style={{width: '45%', marginRight: '60%'}}>
							I'm Walter...
						</div>
				</ParallaxLayer>
				<ParallaxLayer
					note={"cloud2"}
					offset={0.98}
					speed={0.3}
					style={{display: 'flex', alignItems: 'center', justifyContent:'center', opacity:'0.4'}}>
						<img src={cloud} style={{width: '40%', marginLeft: '50%'}} alt="" />
				</ParallaxLayer>
				<ParallaxLayer
					note={"cloudword2"}
					offset={0.98}
					speed={0.3}
					style={{display: 'flex', alignItems: 'center', justifyContent:'center'}}>
						<div src={cloud} className="cloudWord" style={{width: '40%', marginLeft: '50%'}}>
							a programmer
						</div>
				</ParallaxLayer>
				<ParallaxLayer
					note={"cloud3"}
					offset={1.0}
					speed={0.2}
					style={{display: 'flex', alignItems: 'center', justifyContent:'center', opacity:'0.4'}}>
						<img src={cloud} style={{width: '30%', marginRight: '50%'}} alt="" />
				</ParallaxLayer>
				<ParallaxLayer
					note={"cloudword3"}
					offset={1.0}
					speed={0.2}
					style={{display: 'flex', alignItems: 'center', justifyContent:'center'}}>
						<div src={cloud} className="cloudWord" style={{width: '30%', marginRight: '50%'}}>
							a developer
						</div>
				</ParallaxLayer>
				<ParallaxLayer
					note={"cloud4"}
					offset={1.1}
					speed={0.2}
					style={{display: 'flex', alignItems: 'center', justifyContent:'center', opacity:'0.4'}}>
						<img src={cloud} style={{width: '35%', marginLeft: '60%'}} alt="" />
				</ParallaxLayer>
				<ParallaxLayer
					note={"cloudword4"}
					offset={1.1}
					speed={0.2}
					style={{display: 'flex', alignItems: 'center', justifyContent:'center'}}>
						<div src={cloud} className="cloudWord" style={{width: '35%', marginLeft: '60%'}}>
							a designer
						</div>
				</ParallaxLayer>
				
				<ParallaxLayer
					note={"ProjectButton"}
					offset={0.0}
					speed={-1.0}
					className={"buttonFont"}
					style={{ display: 'block', alignItems: 'center', justifyContent: 'center', opacity: this.state.buttonAlpha}}>
					<div onClick={this.scrollToRef.bind(this, 0.0)}><u>WALTER CHENG</u></div>
					<div onClick={this.scrollToRef.bind(this, 1.1)}>PROJECTS</div>
					<div onClick={this.scrollToRef.bind(this, 1.6)}>RESUME</div>
					<div onClick={this.scrollToRef.bind(this, 2.1)}>STATUS</div>
					<div><a data-tip="Walter Cheng" href="https://www.linkedin.com/in/wai-walter-cheng/"><i className="fab fa-linkedin"/><ReactTooltip /> </a>
						 <a data-tip="Walter0697" href="https://github.com/Walter0697"><i className="fab fa-github-square"/><ReactTooltip /> </a>
						 <a data-tip="walterpakwai@live.com" href="mailto:walterpakwai@live.com"><i className="fas fa-envelope-square"/><ReactTooltip /> </a>
						 <a data-tip="+1(343)777-8008" href="/#"><i className="fas fa-phone-square"/><ReactTooltip /> </a></div>
				</ParallaxLayer>
				
				<ParallaxLayer
					offset={1.4}
					speed={0.2}
					style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50%', marginLeft: '25%'}}
					onClick={this.redirectOut.bind(this, "/projects")}>
				</ParallaxLayer>
				<ParallaxLayer
					offset={1.8}
					speed={0.2}
					style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40%', marginLeft: '45%'}}
					onClick={this.redirectOut.bind(this, "http://www.waltercheng.com:3000#resume")}
					data-tip="Currently in my old website!">
					<ReactTooltip />
				</ParallaxLayer>
				<ParallaxLayer
					offset={2.2}
					speed={0.2}
					style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50%', marginLeft: '25%'}}
					onClick={this.redirectOut.bind(this, "/numbers")}>
				</ParallaxLayer>
				<ParallaxLayer
					offset={1.8}
					speed={0.2}
					style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '23%', marginLeft: '8%' }}
					onClick={this.redirectOut.bind(this, '/static/waltercheng.pdf')}
					data-tip="Click to view!">
				</ParallaxLayer>
				
				<ParallaxLayer
					note={"CONTACT ME"}
					offset={3.3}
					speed={0.0}
					style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
						<div className="bottomMobileText">CONTACT ME!</div>
				</ParallaxLayer>
				<ParallaxLayer
					note={"not every devices can see the topbar, so contact list here"}
					offset={3.0}
					speed={0.0}
					style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
						<div className="bottomMobileText">
							 <a data-tip="Walter Cheng" href="https://www.linkedin.com/in/wai-walter-cheng/"><i className="fab fa-linkedin"/><ReactTooltip /> </a>
							 <a data-tip="Walter0697" href="https://github.com/Walter0697"><i className="fab fa-github-square"/><ReactTooltip /> </a>
							 <a data-tip="walterpakwai@live.com" href="mailto:walterpakwai@live.com"><i className="fas fa-envelope-square"/><ReactTooltip /> </a>
							 <a data-tip="+1(343)777-8008" href="/#"><i className="fas fa-phone-square"/><ReactTooltip /> </a></div>
				</ParallaxLayer>
				
				<ParallaxLayer 
					note={"drawing the bottom footer"}
					offset={3.5} speed={-0.6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
					<img src={bottomBackground} style={{ width: '100%' }} alt="" />
				</ParallaxLayer>
			</Parallax>
			)
		}
	}
}
