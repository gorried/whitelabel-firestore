import React, { PureComponent } from 'react'
import { css } from 'aphrodite'
import { Layout } from 'antd'

import HeaderBar from 'components/HeaderBar'

import styles from 'pages/styles/PageStyle'

export default WrappedComponent => {
  class Wrapper extends PureComponent {
    render () {
      return (
        <Layout>
          <HeaderBar />
          <Layout.Content className={css(styles.content)}>
            <WrappedComponent {...this.props} />
          </Layout.Content>
        </Layout>
      )
    }
  }

  return Wrapper
}
