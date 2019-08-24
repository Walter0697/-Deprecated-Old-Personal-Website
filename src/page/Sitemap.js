import React from 'react';
import { isMobile } from 'react-device-detect';

import '../css/numbers.css';

function mobileDifferent(name, computer, mobile)
{
	var output = [];
	if (isMobile)
	{
		output.push(<div key="1" onClick={()=>{window.location = mobile;}} style={{display: "inline"}}>{name}</div>);
	}
	else
	{
		output.push(<div key="1" onClick={()=>{window.location = computer;}} style={{display: "inline"}}>{name}</div>);
	}
	output.push(<div key="2" style={{display: "inline"}}> ( 
	<div onClick={()=>{window.location = computer;}} style={{display: "inline"}}>web ver.</div> 
	<div style={{display: "inline"}}> | </div>  
	<div onClick={()=>{window.location = mobile;}} style={{display: "inline"}}>mobile ver.</div> 
	) </div>)
	return output;
}

export default class Sitemap extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			
		};
	}
	
	componentWillMount() {
	}
	
	componentWillUnmount() {
	}	
	
	render() {
		return (
		<div className="wholeScreen smallFontStyle">
			<div style={{ marginLeft: '2%', marginTop: '2%'}}>
				<div onClick={()=>{window.location = "/";}}>Homepage</div>
				<div style={{display: "block"}}>{mobileDifferent("Project Page", "/projects", "m_projects")}</div>
				<div onClick={()=>{window.location = "http://www.waltercheng.com:3000/#resume";}}>Resume Page(still in my old website)</div>
				<div onClick={()=>{window.location = "/numbers";}}>Number Page</div>
				<div onClick={()=>{window.location = "/NOJJKT";}}>Lock</div>
			</div>
		</div>
		);
	}
}