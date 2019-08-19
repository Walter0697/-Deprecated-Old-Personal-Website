import React from 'react';
import anime from 'animejs'

import '../css/project.css';

import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import { getData, getOutput } from '../component/projectsParser.js';
import { getProjectImage } from '../component/imageParser.js';

require('bootstrap/dist/css/bootstrap.css');

export default class MobileProjectPage extends React.Component {
	constructor(props) {
		super(props);
		var tempdata = getData("type");
		var tempnum = getOutput("type");
		var files = [];
		var i, curr = 0;
		for (var key in tempnum)
		{
			files.push({ sorting: key })
			for (i = 0; i < tempnum[key]; i++)
			{
				files.push({ sorting: "none", imgsource: tempdata[curr].image, github: tempdata[curr].github, variation: tempdata[curr].variation, index: curr });
				curr++;
			}
		}
		this.state = {
			selected: -1,
			sort_by: "sorted by type",
			data: tempdata,
			images: files,
		};
	}
		
	componentDidMount()
	{
		this.projectImgAnim();
	}
	
	openInfo(index)
	{
		for (var i = 0; i < this.state.images.length; i++)
		{
			if (index === this.state.images[i].index)
			{
				if (this.state.images[i].github)
				{
					window.location = this.state.images[i].github;
				}
				break;
			}
			
		}
	}
	
	changeData(sort)
	{
		var tempdata = getData(sort);
		var tempnum = getOutput(sort);
		var files = [];
		var i, curr = 0;
		for (var key in tempnum)
		{
			files.push({ sorting: key })
			for (i = 0; i < tempnum[key]; i++)
			{
				files.push({ sorting: "none", imgsource: tempdata[curr].image, github: tempdata[curr].github, variation: tempdata[curr].variation, index: curr });
				curr++;
			}
		}
		this.setState({
			sort_by: "sorted by " + sort,
			data: tempdata,
			images: files,
		});
		this.state.Projanimation.restart();
	}
	
	projectImgAnim = () => {
		let anim =	anime({
						targets: '.image',
						translateX: { 
							value: document.body.clientWidth * 3 / 7,
							duration: 1000,
							easing: 'easeOutElastic(5, 0.5)'
						},
						rotate: {
							value: 360,
							duration: 800,
							easing: 'easeInOutSine'
						},
						scale: {
							value: 3,
							duration: 1500,
							easing: 'easeInOutQuart'
						}
					});
		this.setState({ Projanimation: anim });
	}
	
	projectInfoAnim = () => {
		let anim = 	anime({
			targets: '.info',
			scale: {
				value: 1.2,
				duration: 1000,
				easing: 'easeInOutQuart'
			}
		});
		this.setState({ Infoanimation: anim });
	}
	
	getProjectComponent()
	{
		if (this.state.selected === -1)
			return <></>
		return <>
			<div 
				onClick={()=>{ }} 
				className="componentBackground">
			</div>
		</>
	}
		
	render() {
		return ( 
			<div className="black-background bigPage">
				<div className="mobileWholeScreen">
					<DropdownButton style={{ marginLeft: '5%', paddingTop: '5%', width: '10%' }} title={this.state.sort_by}>
						<Dropdown.Item onClick={() => { this.changeData("language")}} style={{ color: 'black'}}>Language</Dropdown.Item>
						<Dropdown.Item onClick={() => { this.changeData("type")}} style={{ color: 'black'}}>Type</Dropdown.Item>
						<Dropdown.Item onClick={() => { this.changeData("time")}} style={{ color: 'black'}}>Time</Dropdown.Item>
						<Dropdown.Item onClick={() => { this.changeData("group")}} style={{ color: 'black'}}>Group</Dropdown.Item>
					</DropdownButton>

					<div style={{ marginTop: '10%' }}>
						{this.state.images.map((data, index) => 
								(data.sorting === "none") ?
									<img
										className="image"
										key={data.index}
										src={getProjectImage(data.imgsource, data.variation)}
										alt={data.index}
										onClick={() => { this.openInfo(data.index); }}
										style={{
											width: '10%',
											display: 'block',
											marginBottom: '20%'
										}}
									/>
									:
									<div
										className="sectionText"
										key={data.sorting}
										style={{
											fontSize: '20px',
											display: 'block',
											marginBottom: '10%',
											marginLeft: '20%',
										}}
										>
										{data.sorting}
									</div>
						)}
					</div>
				</div>
				{this.getProjectComponent()}
			</div>
		)
	}
}
