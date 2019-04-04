import React, { Component } from 'react'

export default class CenteredContainer extends Component {
  render () {
    return (
      <div style={{
        height: '90vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ flex: 1 }}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
