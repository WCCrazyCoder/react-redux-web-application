// import React from 'react';
import ReactDOM from 'react-dom';

const component = (
	<div>
		<h1>Hello React</h1>
	</div>
);

ReactDOM.render(
	component,
	document.getElementById("app")
);


if (module.hot) {
	module.hot.accept();
}