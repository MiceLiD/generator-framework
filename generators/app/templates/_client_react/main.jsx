import React, { Component } from 'react'
import { render } from 'react-dom'
import f_Request from './utils/request.js'
window.f_Request = f_Request

import './assets/images/favicon.ico'
import './assets/styles/main.less'

import App from './App.jsx'

render(<App />, document.getElementById('app'))