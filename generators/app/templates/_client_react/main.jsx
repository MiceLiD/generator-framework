import React, { Component } from 'react'
import { render } from 'react-dom'
import f_Request from './utils/request.js'
window.f_Request = f_Request

import './favicon.ico'
import './main.less'

import App from './App.jsx'

render(<App />, document.getElementById('app'))