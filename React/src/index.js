import React from 'react'
import { render } from 'react-dom'

window.React = React

render(
  <div>
    <h1>Hello world</h1>
  </div>,
  document.getElementById('react-container')
)
