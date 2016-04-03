'use strict';

import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import DocumentTitle from 'react-document-title';

// import {actions as myActions} from 'modules/<%= module %>';
import <%= componentName %>Component from '../components/<%= component %>';

class <%= containerName %> extends Component {
  render() {
    const title = '<%= title %>';
    return (
    <DocumentTitle title={title}>
      <<%= componentName %>Component {...this.props}/>
    </DocumentTitle>
    );
  }
}

<%= containerName %>.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps() {
  return {

  };
}
function mapDispatchToProps(dispatch) {
  const actions = Object.assign({}, {}, {

  });
  return { actions: bindActionCreators(actions, dispatch) };
}
export default connect(mapStateToProps, mapDispatchToProps)(<%= containerName %>);
