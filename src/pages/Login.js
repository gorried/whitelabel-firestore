import React, { Component } from 'react'
import { Button, Card } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { getDatabase, getKey } from 'api/Database'
import { internalEndpoints } from 'common/Endpoints'
import CenteredContainer from 'components/CenteredContainer'

import asPage from 'pages/hoc/AsPage'

const LOGIN_TIMEOUT = 2000

class Login extends Component {
  constructor (props) {
    super(props)
    this.key = getKey()
    this._loginTimeout = null
    this.state = {
      loggingIn: true
    }
  }

  componentDidMount () {
    this._loginTimeout = setTimeout(() => this.setState({ loggingIn: false }), LOGIN_TIMEOUT)
    this._redirectIfLoggedIn()
  }

  componentWillUnmount () {
    if (this._loginTimeout !== null) {
      clearTimeout(this._loginTimeout)
    }
  }

  componentDidUpdate () {
    this._redirectIfLoggedIn()
  }

  _redirectIfLoggedIn = () => {
    if (this.props.user !== null) {
      this.props.history.push(internalEndpoints.CLIENT.LABELING)
    } else {
      if (this.state.loggingIn) {
        this.setState({ loggingIn: false })
      }
    }
  }

  _onLoginClick = () => {
    if (!this.state.loggingIn) {
      this.setState({
        loggingIn: true
      }, () => getDatabase().login())
    }
  }

  render () {
    return (
      <CenteredContainer>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Card title='Welcome to the Labeling Tool' style={{ width: 300 }}>
            <Button type='primary' loading={this.state.loggingIn} onClick={this._onLoginClick}>
              Login
            </Button>
          </Card>
        </div>
      </CenteredContainer>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state.user
  }
}

export default withRouter(
  asPage(
    connect(
      mapStateToProps,
      null
    )(Login)
  )
)
