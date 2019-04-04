import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { internal } from 'common/Endpoints'

export default WrappedComponent => {
  class Wrapper extends PureComponent {
    componentDidMount () {
      this._redirectIfLoggedOut()
    }

    componentDidUpdate () {
      this._redirectIfLoggedOut()
    }

    _redirectIfLoggedOut = () => {
      if (this.props.user === null) {
        this.props.history.push(internal.CLIENT.ROOT, { fromInternal: true })
      }
    }

    render () {
      let { user, history, ...rest } = this.props
      return <WrappedComponent {...rest} />
    }
  }

  const mapStateToProps = state => {
    return {
      ...state.user
    }
  }

  return withRouter(connect(mapStateToProps, null)(Wrapper))
}
