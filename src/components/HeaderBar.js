import React, { Component } from 'react'
import { connect } from 'react-redux'
import { css } from 'aphrodite'
import {
  Avatar,
  Col,
  Dropdown,
  Icon,
  Layout,
  Menu,
  Row
} from 'antd'

import { getDatabase } from 'api/Database'
import { strings } from 'common/Constants'
import styles from 'components/styles/HeaderBarStyle'

class HeaderBar extends Component {
  _onLogoutClick = () => {
    getDatabase().logout()
  }

  render () {
    let { user } = this.props
    let login = null
    if (user !== null) {
      const logoutMenu = (
        <Menu>
          <Menu.Item>
            <a onClick={this._onLogoutClick} >Log out</a>
          </Menu.Item>
        </Menu>
      )
      login = (
        <Dropdown overlay={logoutMenu}>
          <div>
            <Avatar src={user.photoURL} style={{ marginRight: 6 }} />
            <a className='ant-dropdown-link'>
              {user.DisplayName} <Icon type='down' />
            </a>
          </div>
        </Dropdown>
      )
    }
    return (
      <Layout.Header className={css(styles.navHeader)}>
        <Row type='flex'>
          <Col span={4} offset={4}>
            <span>{ strings.app_name }</span>
          </Col>
          <Col span={4} offset={10}>
            {login}
          </Col>
        </Row>
      </Layout.Header>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state.user
  }
}

export default connect(mapStateToProps, null)(HeaderBar)
