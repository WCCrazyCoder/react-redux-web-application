import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { increment, decrement, getHomepageJSON } from '../modules/home';

@connect(
	state => ({
		counter: state.home.counter,
		homepageJSON: state.home.homepageJSON
	}),
	dispatch => bindActionCreators({ increment, decrement, getHomepageJSON }, dispatch)
)

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = (e) => this._handleClick(e);
	}

	_handleClick(e) {
		e.preventDefault();
		if (e.target.id === 'increment') {
			this.props.increment();
		} else if (e.target.id === 'decrement') {
			this.props.decrement();
		} else if (e.target.id === 'homepage') {
			this.props.getHomepageJSON();
		}
	}

	render() {
		const styles = require('./Home.scss');
		return (
			<div className={styles.home}>
				<button id='increment' onClick={this.handleClick}>increment</button>
				<span><strong>{this.props.counter}</strong></span>
				<button id='decrement' onClick={this.handleClick}>decrement</button><br />
				<button id='homepage' onClick={this.handleClick}>load home page data</button>
				<div>{JSON.stringify(this.props.homepageJSON)}</div>
				<h2>Welcome to homepage ...</h2>
				<h4>{this.props.name}</h4>
			</div>
		);
	}
}
