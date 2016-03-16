'use strict';

export default React => {
  const <%= name %> = () => {
    return (
      <div className="<%= name %>">

      </div>
    )
  };

  <%= name %>.displayName = '<%= name %>';

  return <%= name %>;
}
