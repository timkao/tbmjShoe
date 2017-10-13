import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar'
// import store from '../store';
// import {thunk actions come here later} from '../store';
import Auth from './Auth'
import Cart from './Cart'

export default class Main extends Component {

	render(){
		return(
				<div className="container">
					<Navbar />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/signup" component={Auth} />
						<Route exact path="/login" component={Auth} />
						<Route exact path="/cart/:orderId" component={Cart} />
					</Switch>

				</div>
			)
	}
}
