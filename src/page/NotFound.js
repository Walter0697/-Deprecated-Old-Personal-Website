import React from 'react';

import '../css/numbers.css';

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
			<div style={{ marginLeft: '2%', marginTop: '2%'}}>
				<div>404 - Unfortunately, I can't find what you are looking for</div>
				<div>Prehaps you typed something wrong? Would you like to check out the <span onClick={this.redirectOut.bind(this, '/sitemap')}>sitemap</span>?</div>
			</div>
		</div>
		);
	}
}