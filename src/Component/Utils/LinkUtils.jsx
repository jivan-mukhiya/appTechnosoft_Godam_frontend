/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function LinkUtils({name, to , className, icon: Icon}) {

  return (
    
    <Link
    to={to}
    className={`flex items-center space-x-2 ${className}`}
  >
    {Icon && <Icon className="w-5 h-4" />}
    <span className="text-sm font-medium">{name}</span>
  </Link>
  );
}

export default LinkUtils;
