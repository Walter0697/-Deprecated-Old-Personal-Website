import React from 'react';

import '../css/numbers.css';

import Carleton from '../sprite/work/carleton.png';
import Nokia 	from '../sprite/work/nokia.png';

export default class Sitemap extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			
		};
	}
	
	redirectOut = (link) => {
		window.location = link;
	}
	
	componentWillMount() {
	}
	
	componentWillUnmount() {
	}	
	
	render() {
		return (
		<div className="wholeScreen smallFontStyle">
			<div style={{ marginLeft: '2%', marginTop: '2%'}}> Education:</div>
				<div style={{ marginLeft: '15%', marginTop: '2%'}}>
					<img alt="carleton" onClick={this.redirectOut.bind(this, 'https://carleton.ca')} src={Carleton}></img>
					<div> - Bachelor Degree Of Computer Science</div> 
					<div> - Minor In Japanese </div>
					<div> - CGPA 10.5 / 12.0 (A-) </div>
					<div> - Carleton University Entrance Scholarship </div>
					<div> - Dean's Honour List Student</div>
				</div>
				
			<div style={{ marginLeft: '2%', marginTop: '2%'}}> Work Experience:</div>
				<div style={{ marginLeft: '15%', marginTop: '2%'}}>
					<img alt="carleton" onClick={this.redirectOut.bind(this, 'https://carleton.ca')} src={Carleton}></img>
					<div> - Teaching Assistant for Computer Science faculty</div> 
					<div> - Jan 2017 - Apr 2017 Introduction to Computational Thinking for Arts and Social Science </div>
					<div> - Sep 2017 - Dec 2017 Introudction to Computer Science I </div>
					<div> - Jan 2018 - Apr 2018 Fundamentals Web Application</div>
					<div> - Sep 2018 - Apr 2019 Programming Paradigms</div>
				</div>
				
				<div style={{ marginLeft: '15%', marginTop: '2%'}}>
					<img alt="nokia" onClick={this.redirectOut.bind(this, 'https://www.nokia.com/')} src={Nokia}></img>
					<div> - Embedded Software Developer Co-op</div> 
					<div> - May 2017 - Aug 2017 </div>
				</div>
		</div>
		);
	}
}