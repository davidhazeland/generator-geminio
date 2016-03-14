'use strict';

import React, {
  Component,
  PropTypes
} from 'react';
import DocumentTitle from 'react-document-title';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import {actions} from 'modules/module';

import create<%= name %> from '../components/<%= componentFileName %>';

class <%= name %> extends Component {
  render() {
    const title = '<%= name %>';
    const <%= name %> = create<%= name %>(React);
    return (
    <DocumentTitle title={title}>
      <<%= name %> {...this.props}/>
    </DocumentTitle>
    );
  }
}

<%= name %>.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {

  };
}
function mapDispatchToProps(dispatch) {
  const actions = {

  }
  return { actions: bindActionCreators(actions, dispatch) };
}
export default connect(mapStateToProps, mapDispatchToProps)(<%= name %>);
