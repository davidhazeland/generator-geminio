'use strict';

export default React => {
  const <%= name %> = (props) => {
    return (
      <div className="<%= name %>">

      </div>
    )
  };

  <%= name %>.displayName = '<%= name %>';

  return <%= name %>;
}
