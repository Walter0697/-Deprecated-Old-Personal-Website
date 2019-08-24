import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route } from 'react-router-dom';
import './App.css';

import HomePage 			from './page/Homepage';
import Robot				from './page/Robot';
import Projects				from './page/Projects';
import MobileProjectPage 	from './page/Projectsm.js';
import Numbers				from './page/Numbers.js';
import Sitemap				from './page/Sitemap.js';

class App extends Component {
  render() {
    return (
      <Router>
		<Switch>
			<Route exact path="/" render={props => ( <HomePage /> )} />
			<Route exact path="/projects" render={props => (<Projects /> )} />
			<Route exact path="/Q23T6" render={props => ( <Robot /> )} />
			<Route exact path="/m_projects" render={props => <MobileProjectPage />} />
			<Route exact path="/numbers" render={props => <Numbers />} />
			
				<Route exact path="/sitemap" render={ props => <Sitemap	 /> } />
		</Switch>
	  </Router>
    );
  }
}

export default App;
