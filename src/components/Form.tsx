import React, { createContext, useState, useEffect, useRef } from 'react';

export const context: any = createContext(null);

const Form = (props: any) => {
    const [value, setValue] = useState({ ...props.initialValues });
    const isMounted = useRef(false);

    useEffect(() => {
        if (isMounted.current) {
            console.log('SUBMIT: ');
            console.log(props.initialValues);
        } else {
            isMounted.current = true;
        }
    }, [props.initialValues]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        props.onSubmit({ ...value });
    };

    const getValue = (propName: any) => {
        const get = new Function('obj', 'return obj.' + propName + ';');
        return get(value);
    };

    const providerValues = {
        value,
        setValue,
        handleSubmit,
        getValue
    };

    const formStyle = {
        margin: 'auto',
        width: 'fit-content',
        padding: '40px',
        borderRadius: '12px',
        background: 'white',
        boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px'
    };

    if (props.initialValues === undefined) {
        console.error(
            'Can not find "initialValues".\nMake sure that you pass everything correctly'
        );
        return (
            <div>
                Can not render the component.
                <br />
                Please check the console for errors.
            </div>
        );
    }

    if (props.onSubmit === undefined) {
        console.error(
            'Can not find "onSubmit".\nMake sure that you pass everything correctly'
        );
        return (
            <div>
                Can not render the component.
                <br />
                Please check the console for errors.
            </div>
        );
    }

    return (
        <div style={formStyle}>
            <context.Provider value={providerValues}>
                <form
                    onSubmit={(e) => {
                        handleSubmit(e);
                    }}
                >
                    {props.children}
                </form>
            </context.Provider>
        </div>
    );
};

export default Form;
