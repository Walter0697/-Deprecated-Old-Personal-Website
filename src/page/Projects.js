import React from 'react';

import '../css/project.css';

import { getData, getWeights } from '../component/projectsParser.js';
import { getProjectImage } from '../component/imageParser.js';
import ProjectBrowser from '../component/ProjectBrowser.js';

//import library for different components
import ProgressBar from 'react-bootstrap/ProgressBar';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

import { isMobile } from 'react-device-detect';
import $ from 'jquery';

require('bootstrap/dist/css/bootstrap.css');

export default class Projects extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			scrolling: 0,							//saving scrolling information
			max: document.documentElement.scrollHeight * 2,
			
			sort_by: "Sorted by time",			//getting sorting order
			sortButtonMargin: "80%",
			
			weights: getWeights("time"),		//getting data from the database
			data: getData("time"),
			currentData: null,
			
			canScroll: true,						//save position when open info
			lastScrollPos: 0,
			finalWindowY: -1,			
		};
		this.handleScroll = this.handleScroll.bind(this);
	}

	checkAutoLock() {
		if (this.state.autolock)
		{
			setTimeout(
				function() {
					if (this.state.autolock)
					{
						this.scrollNext(0);
					}
				}.bind(this), 200
			) 
		}
		setTimeout(
			function() {
				this.checkAutoLock();
			}.bind(this), 500	//check it every 30 ticks?
		);
		this.setState({autolock: true});
	}
	
	getProjectDiv() {
		let divs = [];
		var index = (this.state.lastScrollPos * (this.state.data.length - 1) / 100);
		var round = Math.round(index);
		
		var left, wid, opac;
		var diff, gap;
		for (var i = 0; i < this.state.data.length; i++)
		{
			if (round - 2 === i)
			{
				divs.push(<img style={{ marginLeft: '20%', position: 'fixed', width: '5%', opacity: '0.1'}} src={getProjectImage(this.state.data[i].image, this.state.data[i].variation)} onClick={()=>{ this.scrollNext(-2) }} key={i} alt=""/> );
			}
			else if (round - 1 === i)
			{
				left = 25; wid = 10; opac = 0.3;
				if (index > round)
				{
					diff = index - round;
					gap = 25 - 20;
					left -= diff * gap;
					gap = 10 - 5;
					wid -= diff * gap;
					gap = 0.3 - 0.1;
					opac -= diff * gap;
				}
				divs.push(<img style={{ marginLeft: left + "%", position: 'fixed', width: wid + "%", opacity: opac + ""}} src={getProjectImage(this.state.data[i].image, this.state.data[i].variation)} onClick={()=>{ this.scrollNext(-1) }} key={i} alt=""/> );
			}
			else if (round === i)
			{
				left = 35; wid = 30; opac = 1;
				if (index > round)
				{
					diff = index - round;
					gap = 35 - 25;
					left -= diff * gap;
					gap = 30 - 10;
					wid -= diff * gap;
					gap = 1 - 0.3;
					opac -= diff * gap;
				}
			
				divs.push(<img style={{ marginLeft: left + "%", position: 'fixed', width: wid + "%", opacity: opac + ""}} src={getProjectImage(this.state.data[i].image, this.state.data[i].variation)} key={i} alt=""/> );
			}
			else if (round + 1 === i)
			{
				left = 65; wid = 10; opac = 0.3;
				if (index > round)
				{
					diff = index - round;
					gap = 65 - 35;
					left -= diff * gap;
					gap = 10 - 30;
					wid -= diff * gap;
					gap = 0.3 - 1;
					opac -= diff * gap;
				}
				divs.push(<img style={{ marginLeft: left + "%", position: 'fixed', width: wid + "%", opacity: opac + ""}} src={getProjectImage(this.state.data[i].image, this.state.data[i].variation)} onClick={()=>{ this.scrollNext(1) }} key={i} alt=""/> );
			}
			else if (round + 2 === i)  
			{
				left = 75; wid = 6; opac = 0.1;
				if (index > round)
				{
					diff = index - round;
					gap = 75 - 65;
					left -= diff * gap;
					gap = 5 - 10;
					wid -= diff * gap;
					gap = 0.1 - 0.3;
					opac -= diff * gap;
				}
				divs.push(<img style={{ marginLeft: left + "%", position: 'fixed', width: wid + "%", opacity: opac + ""}} src={getProjectImage(this.state.data[i].image, this.state.data[i].variation)} onClick={()=>{ this.scrollNext(2) }} key={i} alt=""/> );
			}
		} 
		return divs;
	}
	
	getScrollPosition(index)
	{
		return index * this.state.max / (this.state.data.length - 1);
	}
	
	getCenterName() {
		var index = (this.state.lastScrollPos * (this.state.data.length - 1) / 100);
		if (index > this.state.data.length - 1) index = this.state.data.length - 1;
		return Math.round(index);
	}
	
	getSectionText() {
		let sectionText = [];
		for (var i = 0; i < this.state.weights.length; i++)
		{
			sectionText.push(<div key={i} style={{ display: 'inline-block', width: this.state.weights[i].weight - 1 + "%", color: this.state.weights[i].color }}>
								{this.state.weights[i].name}
							</div>)
		}
		return sectionText;
	}
	
	getProgressBar() {
		let bars = [];
		var current = 0;
		var next = 0;
		for (var i = 0; i < this.state.weights.length; i++)
		{
			//scrolled should change to something percentage
			next = this.state.weights[i].weight + current;
			var this_now = 0;
			if (this.state.lastScrollPos > next) this_now = this.state.weights[i].weight;
			else if (this.state.lastScrollPos > current) this_now = this.state.lastScrollPos - current;
			
			bars.push(<ProgressBar animated striped style={{ background: this.state.weights[i].color }} now={this_now} key={i} />);
			current = next;
		}
		return bars;
	}
	
	componentWillMount() {
		if (isMobile) 
			this.setState({ sortButtonMargin: "70%" });
		window.addEventListener('scroll', this.handleScroll, true);
		this.scrollTo(0);
		//this.checkAutoLock();
	}
	
	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll, true);
	}
	
	closeDiv()
	{
		$('html, body').animate({
			scrollTop: this.state.finalWindowY
		}, 0, function(){
		});
		this.setState({ currentData: null, canScroll: true, scrolling: this.state.lastScrollPos });
	}
	
	openDiv()
	{
		this.setState({ canScroll: false,
						finalWindowY: window.scrollY,
						currentData: this.state.data[this.getCenterName()] });
	}
	
	handleScroll(event){
		var previous = this.state.scrolling;
		this.setState({ scrolling: window.scrollY * 100 / this.state.max});
		if (previous !== this.state.scrolling)
			this.setState({ autolock: false });

		if (this.state.scrolling > 100) {
			this.setState({ scrolling: 100, max: window.scrollY });
		}
		if (this.state.canScroll) {
			this.setState({ lastScrollPos: this.state.scrolling });
		}
	}
	
	changeData(sort)
	{
		this.setState({ data: getData(sort), weights: getWeights(sort), sort_by: "Sorted by " + sort });
		this.scrollTo(0);
	}
	
	scrollNext(index)
	{
		this.scrollTo(this.getScrollPosition(this.getCenterName() + index));
	}
	
	scrollTo(scrollIndex, callback = null)
	{
		$('html, body').animate({
			scrollTop: scrollIndex
		}, 800, function(){
			if (callback) callback();
		});
	}
	
	getProjectComponent()
	{
		if (this.state.currentData == null)
			return <></>
		return <>
			<div 
				onClick={()=>{ this.closeDiv(); }} 
				className="componentBackground">
			</div>
			<ProjectBrowser
				data={this.state.currentData} />
		</>
	}
	
	render() {
		return ( 
			<div className="black-background bigPage">
				<div className="wholeScreen">
					<div className="black-background">
						<DropdownButton style={{ paddingTop: '5%', width: '10%', marginLeft: this.state.sortButtonMargin }} title={this.state.sort_by}>
								<Dropdown.Item onClick={() => { this.changeData("language")}} style={{ color: 'black'}}>Language</Dropdown.Item>
								<Dropdown.Item onClick={() => { this.changeData("type")}} style={{ color: 'black'}}>Type</Dropdown.Item>
								<Dropdown.Item onClick={() => { this.changeData("time")}} style={{ color: 'black'}}>Time</Dropdown.Item>
								<Dropdown.Item onClick={() => { this.changeData("group")}} style={{ color: 'black'}}>Group</Dropdown.Item>
						</DropdownButton>
					</div>
					<div className="sectionText" style={{ marginTop: '5%', marginLeft: '10%', width: '80%' }}>
						{this.getSectionText()}
					</div>
					<ProgressBar style={{ marginLeft: '10%', width: '80%' }}>
						{this.getProgressBar()}
					</ProgressBar>
					
					<div style={{ marginTop: '5%'}}>
						{this.getProjectDiv()}
						<Button 
							className="centerText" 
							style={{ marginTop: '25%', position: 'fixed', textAlign: 'center', height: '35px', width: '40%', marginLeft: '30%'}}
							onClick={() => { 
								$('html, body').animate({
									scrollTop: this.getScrollPosition(this.getCenterName())
								}, 300, function(){
									this.openDiv();
								}.bind(this));
							}}>
							{this.state.data[this.getCenterName()].name}
						</Button>
					</div>
				</div>	
				{this.getProjectComponent()}
			</div>
		)
	}
}