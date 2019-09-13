import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route } from 'react-router-dom';
import './App.css';

import HomePage 			from './page/Homepage';
import Projects				from './page/Projects';
import MobileProjectPage 	from './page/Projectsm.js';
import Numbers				from './page/Numbers.js';
import Work 				from './page/Work.js';
import Sitemap				from './page/Sitemap.js';
import NotFound				from './page/NotFound.js';

class App extends Component {
  render() {
    return (
      <Router>
		<Switch>
			<Route exact path="/" render={ props =>  <HomePage /> } />
			<Route exact path="/projects" render={ props => <Projects /> } />
			<Route exact path="/m_projects" render={ props => <MobileProjectPage />} />
			<Route exact path="/work" render={props => <Work />} /> 
			<Route exact path="/numbers" render={ props => <Numbers /> } />
						
			<Route exact path="/sitemap" render={ props => <Sitemap	 /> } />
		
			<Route render={ props => <NotFound />} />
		</Switch>
	  </Router>
    );
  }
}

export default App;
