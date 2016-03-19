'use strict';

export default React => {
  const <%= componentName %> = () => {
    return (
      <div className="<%= componentName %>">

      </div>
    );
  };

  <%= componentName %>.displayName = '<%= componentName %>';

  return <%= componentName %>;
}
