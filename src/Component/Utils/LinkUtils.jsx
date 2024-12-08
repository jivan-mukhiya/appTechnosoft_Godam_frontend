/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function LinkUtils({name, to , className, icon: Icon, classname}) {

  return (
    
      <Link to={to} className={className}>
              {Icon && <Icon  className={classname} />} {/* Render the icon if provided */}
      <span>{name}</span>

      </Link>
  );
}

export default LinkUtils;
