import React from "react";
import ReactTooltip from 'react-tooltip';

import { getProjectImage, getScreenShot } from '../component/imageParser.js';
import '../css/component.css';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { getTechnology } from '../component/techParser.js';

import BallGame from '../downloadable/Ball-Game-windows.zip';
import BallGameMac from '../downloadable/Ball-Game-mac.zip';
import Imitator from '../downloadable/Imitator.zip';
import ImitatorUn from '../downloadable/ImitatorUnlock.zip';
import MusicShooter from '../downloadable/Music-Shooter.zip';
import BunnySenet from '../downloadable/BunnySenet.zip';
import ConnectFour from '../downloadable/ConnectFour.zip';

const zipfile = { 	'Ball-Game-windows.zip'	: BallGame,
					'Ball-Game-mac.zip'		: BallGameMac,
					'Imitator.zip'			: Imitator,
					'ImitatorUnlock.zip'	: ImitatorUn,
					'Music-Shooter.zip'		: MusicShooter,
					'ConnectFour.zip'		: ConnectFour,
					'BunnySenet.zip'		: BunnySenet,
				}

function getIcon(data, size, color="svgicon") {
	if (data.src === "none")
	{
		return <img alt={data.name} src={data.image} style={{ width: size }} key={data.src} />;
	}
	return (<svg style={{ width: size }} width={data.width} height={data.height} viewBox={data.view} key={data.src}>
		<path className={color} d={data.src} />
	</svg>);
}

function getSourceInfo(data) {
	let allSource = [];
	var currentdiv, iconData;
	if (data.hackathon)
	{
		iconData = getTechnology(data.hackathon.name);
		currentdiv = <a href={data.hackathon.link} style={{ display: 'inline-block' }}>
			Project from {getIcon(iconData, "25px")}</a>;
		allSource.push(currentdiv);
		currentdiv = <div key={'&nbsp1'} style={{ display: 'inline-block'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
		allSource.push(currentdiv);
	}
	if (data.github)
	{
		iconData = getTechnology("github");
		currentdiv = <a key={data.github} href={data.github} style={{ display: 'inline-block', color: "white" }}>
			{getIcon(iconData, "25px")} Code Here
			</a>;
		allSource.push(currentdiv);
		currentdiv = <div key={'&nbsp2'} style={{ display: 'inline-block'}}>&nbsp;&nbsp;&nbsp;</div>
		allSource.push(currentdiv);
	}
	if (data.youtube)
	{
		iconData = getTechnology("youtube");
		currentdiv = <a key={data.youtube} href={data.youtube} style={{ display: 'inline-block', color: "white" }}>
			{getIcon(iconData, "25px")} Video Here
			</a>;
		allSource.push(currentdiv);
		currentdiv = <div key={'&nbsp3'} style={{ display: 'inline-block'}}>&nbsp;&nbsp;&nbsp;</div>
		allSource.push(currentdiv);
	}
	if (data.hackathon)
	{
		iconData = getTechnology("devpost");
		currentdiv = <a href={data.hackathon.devpost} style={{ display: 'inline-block', color: "white" }}> 
			{getIcon(iconData, "25px")} Devpost Here
		</a>;
		allSource.push(currentdiv);
	}
	return allSource;
}

function getExtraInfo(data) {
	let allExtra = [];
	var key, currentdiv, iconData;
	if (data.download)
	{
		for (key in data.download)
		{
			iconData = getTechnology("download");
			if (zipfile[data.download[key]])
			{
				currentdiv = <a href={zipfile[data.download[key]]} display="block" style={{ color: "#666"}} key={key}>{key} :&nbsp;&nbsp;&nbsp;
					{getIcon(iconData, "15px", "extraicon")}
				<br/></a>;
			}
			else
			{
				currentdiv = <a href={data.download[key]} display="block" style={{ color: "#666"}} key={key}>{key} :&nbsp;&nbsp;&nbsp;
					{getIcon(iconData, "15px", "extraicon")}
				<br/></a>;
			}
			allExtra.push(currentdiv);
		}
	}
	if (data.extra)
	{
		currentdiv = <a href={data.extralink} style={{ color: "#666" }} key={data.extra}>{data.extra}</a>
		allExtra.push(currentdiv);
	}
	return allExtra;
}

function getAllScreenShot(data) {
	let allScreenShot = [];
	var key, currentdiv;
	for (key in data.screenshot)
	{
		currentdiv = <Card.Img style={{ width: '30%', textAlign: 'center' }} variant="top" src={getScreenShot(data.screenshot[key])} />;
		allScreenShot.push(currentdiv);
	}
	return allScreenShot;
}

function getAllDescription(data){
	return data.map(des => (
		<li key={des}>{des}</li>
	));
}

function getAllTech(data)
{
	let dataIcons = [];
	for (var i = 0; i < data.length; i++)
	{
		dataIcons.push(getTech(data[i]));
	}
	return dataIcons;
}

function getTech(data)
{
	var outputData = getTechnology(data);
	return (<div style={{ display: "inline-block", paddingLeft: "5px" }} key={data} data-tip={data}>
				{getIcon(outputData, "30px")}
			<ReactTooltip /></div>);
}

function getOutputDiv(data)
{
	if (data == null)
	{
		return <></>;
	}
	
	return (
			<div style={{ position: 'fixed', textAlign: 'center', marginTop: '10%', marginLeft: '10%', width: '80%'}}>
				<Card style={{ background: '#222222', color: 'white' }}>
					<Container>
						<Row>
							<Col xs={5} sm={5}>
								<Card.Img style={{ marginTop: '10%', textAlign: 'left' }} variant="top" src={getProjectImage(data.image)} />
							</Col>
							<Col xs={7} sm={7}>
								<div style={{ marginTop: '10%', justifyContent: 'center', alignItems: 'center' }}>
									<div style={{ display: 'block'}}>
										Technologies used:
									</div>
									{getAllTech(data.technology)}
								</div>
							</Col>
						</Row>
					</Container>
						
					<Card.Body style={{ textAlign: 'left' }} >
						<Container>
							<Row>
								<Col xs={3} sm={3}>
									<Card.Title style={{ fontSize: '30px'}} className="fontStyleAdjust">{data.name}</Card.Title>
									{getSourceInfo(data)}
									<br/>
									{getAllDescription(data.description)}
									<br/>
									{getExtraInfo(data)}
								</Col>
								<Col style={{marginLeft: '15%', textAlign:'center'}}>
									{getAllScreenShot(data)}
								</Col>
							</Row>
						</Container>
					</Card.Body>
					
				</Card>
			</div>
			);
}

const ProjectBrowser = ({ data = null, imgSrc = null }) => (
	<>{getOutputDiv(data, imgSrc)}</>
);

export default ProjectBrowser;