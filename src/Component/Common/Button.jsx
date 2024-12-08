/* eslint-disable react/prop-types */
function Button({ type, name,onClick, className,icon: Icon }) {


    return (
        <button
        type={type}
        className={className}
       onClick={onClick}
      >
        {Icon && <Icon/>}
       <span>{name}</span>
      </button>
    )
}

export default Button
