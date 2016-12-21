import '../static/index.html';

import React from 'react';
import FastClick from 'fastclick';
window.React = React;

import '../styles/index.scss';

import './utils/in-app-browser';
import Main from'./views/main';

FastClick.attach(document.body);
React.render(<Main/>, document.getElementById('react'));
