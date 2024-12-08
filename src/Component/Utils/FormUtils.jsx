/* eslint-disable react/prop-types */
function FormUtils({ htmlFor, type, name, id, value, tagName, placeholder, onChange }) {
    return (
        <div className="mb-4">
            <label
              htmlFor={htmlFor}
              className="block text-sm font-medium text-gray-700"
            >
             {tagName}
            </label>
            <input
              type={type}
              id={id}
              name={name}
              value={value}
              onChange={onChange}
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder={placeholder}
              required
            />
          </div>
    );
}

export default FormUtils
