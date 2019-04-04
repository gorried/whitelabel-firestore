import React, { Component } from 'react'
import { connect } from 'react-redux'

import authProtected from 'pages/hoc/AuthProtected'
import asPage from 'pages/hoc/AsPage'

class Labeling extends Component {
  render () {
    return (
      <div>Labeling Component</div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state.demo
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default authProtected(
  asPage(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Labeling)
  )
)
