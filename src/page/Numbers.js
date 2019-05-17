import React from 'react';

import { getNumbers, getLengthOfStat } from '../component/numberParser.js';
import { sendingFeedback } from '../component/airtableConnection.js';

//import library
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

import '../css/numbers.css';

const SortableItem = SortableElement(({value, classStyle}) => 
	<li style={{ marginBottom: '15px', background: '#222222' }} className="fontStyle">
		<div style={{ display: 'inline-block', marginLeft: '5%', width: '50%'}}>{value.name}</div>
		<div style={{ display: 'inline-block', width: '35%'}}>{value.nums}</div>
	</li>);

const SortableList = SortableContainer(({items}) => {
	return (
		<ul style={{ marginLeft: '5%', marginTop: '8%', width: '80%' }}>
			{items.map((value, index) => (
				<SortableItem key={`items${index}`} index={index} value={value} />
			))}
		</ul>
	);
});

export default class Numbers extends React.Component {
	constructor(props) {
		super(props);
		var len = getLengthOfStat();
		
		this.state = {
			date: "",
			items: [],
			len: len,
			suggestion: "",
			classStyle: "fontStyle",
			placeholder: "Wanna request more?"
		};
	}
	
	componentDidMount() {
		var curitems = [];
		for (var i = 0; i < this.state.len; i++)
		{
			curitems.push(getNumbers(i));
		}
		this.setState({ items: curitems });
		this.setData();
	}
	
	setData() {
		var curitems = [];
		if (this.state.items[0])
		{
			for (var i = 0; i < this.state.len; i++)
			{
				curitems.push(getNumbers(this.state.items[i].name));
			}
			this.setState({ items: curitems });
		}
			
		setTimeout(
			function() {
				this.setData();
			}.bind(this), 25
		);
	}
	
	onSortEnd = ({oldIndex, newIndex}) => {
		this.setState(({items}) => ({
			items: arrayMove(items, oldIndex, newIndex),
		}));
	};
	
	keyPress(event) {
		if (event.keyCode === 13) {
			if (this.state.placeholder === "Wanna request more?")
			{
				sendingFeedback(this.state.suggestion);
				this.setState({ suggestion: '', placeholder: "Thanks, I will consider it!" });
				
			}
		}
	}
	
	handleSuggestion(event) {
		if (this.state.placeholder === "Wanna request more?")
			this.setState({ suggestion: event.target.value });
	}
	
	render() {
		return (
		<div className="wholeScreen">
	<div className="smallFontStyle" style={{ marginLeft: '2%', marginTop: '2%'}}>Here is some numbers, somethings that related to me:</div>
			<SortableList items={this.state.items} onSortEnd={this.onSortEnd} />
			<div style={{ width: '50%', marginLeft: '20%', marginBottom: '15px', background: '#222222' }} className="fontStyle">
				<input
					style={{ width: "90%", marginLeft: "5%", background: "#222222", color: "white"}}
					placeholder={this.state.placeholder}
					type="text"
					value={this.state.suggestion}
					onKeyDown={this.keyPress.bind(this)}
					onChange={this.handleSuggestion.bind(this)}
					/>
			</div>
		</div>
		);
	}
}


//<div style={{ display: 'inline-block', marginLeft: '5%', width: '45%'}}>Wanna request more?</div>