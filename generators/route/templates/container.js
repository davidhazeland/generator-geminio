'use strict';

import React, {
  Component,
  PropTypes
} from 'react';
import DocumentTitle from 'react-document-title';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import {actions as moduleActions} from 'modules/module';
import create<%= componentName %> from '../components/<%= component %>';

class <%= containerName %> extends Component {
  render() {
    const title = '<%= title %>';
    const <%= componentName %> = create<%= componentName %>(React);
    return (
    <DocumentTitle title={title}>
      <<%= componentName %> {...this.props}/>
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
