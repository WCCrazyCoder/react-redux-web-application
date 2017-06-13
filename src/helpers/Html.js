import React from 'react';

export default class Html extends React.Component {
	render() {
    return (
      <html lang="en-US">
        <head>
          <link rel="manifest" href="/manifest.json" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
          <meta name="theme-color" content="#ffffff" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        </head>
        <body>
          <div id="app" />
          <script src='dist/vendor.js' />
          <script src='dist/main.js' />
        </body>
      </html>
		);
	}
}
