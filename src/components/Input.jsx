import React , {useId , forwardRef} from 'react';

function Input({
    label,
    type = "text",
    className="",
    labelClass="",
    ...props
} , ref){
    const id = useId();
    return (
        <>
        <div className='w-full' >
            {label ? (<label htmlFor={id} className={`inline-block font-semibold ${labelClass}`}>{label}</label>) : null}
            <input ref={ref} id={id} type={type} className={`${className} w-full rounded-lg  text-gray-800 p-2`} {...props} />
        </div>
        </>
    )
}

export default forwardRef(Input); //when exporting wrap it inside forwardRef.
