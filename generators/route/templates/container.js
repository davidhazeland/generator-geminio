import React, {
  Component,
  PropTypes
} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import DocumentTitle from 'react-document-title'

import {actions as myActions, selectors as mySelectors} from 'businesses/<%= module %>'
import {actions as notifActions, selectors as notifSelectors} from 'ironlake/businesses/notification'

import <%= componentName %>Component from '../components/<%= component %>'

class <%= containerName %> extends Component {
  componentWillUnmount() {
    this.props.actions.clear()
    this.props.actions.clearNotification()
  }

  render() {
    const title = '<%= title %>'
    return (
      <DocumentTitle title={title}>
        <<%= componentName %>Component {...this.props}/>
      </DocumentTitle>
    )
  }
}

<%= containerName %>.propTypes = {
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    ...mySelectors.get(state),
    Notification: notifSelectors.get(state)
  }
}
function mapDispatchToProps(dispatch) {
  const actions = {
    ...myActions,
    clearNotification: notifActions.clear
  }
  return { actions: bindActionCreators(actions, dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(<%= containerName %>)
