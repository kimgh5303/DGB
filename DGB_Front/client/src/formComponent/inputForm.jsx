/* eslint-disable */
export default function InputForm({ text, type, value, handle, id, ph }) {
    return (
        <div className="d-flex align-items-center bg-light rounded-4 p-3 h-100 mb-3">
            <div className="w-28 text-center">
                {text}
            </div>
            <input
                id={id}
                placeholder={ph}
                name={type}
                type={type}
                value={value}
                onChange={handle}
                autoComplete={type}
                readOnly={id === 'bcid'}
                className="block w-1/3 px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
        </div>
    )
}