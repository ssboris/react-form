import React, { useContext } from 'react';
import { context } from './Form';

const FormInput = (props: any) => {
    const { value, setValue, getValue } = useContext(context);

    const style = {
        marginTop: '10px',
        marginBottom: '10px',
        padding: '10px'
    };

    const submitStyle = {
        backgroundColor: '#2196f3',
        color: 'white',
        border: '0',
        borderRadius: '12px',
        padding: '10px',
        fontWeight: 'bold',
        fontSize: '20px',
        marginTop: '20px',
        width: '100%'
    };

    const titleStyle: any = {
        margin: 0,
        textTransform: 'capitalize',
        color: '#757575'
    };

    const handleUpdate = (e: any) => {
        const update = new Function(
            'obj',
            'newval',
            'return obj.' + e.target.name + ' = newval;'
        );
        update(value, e.target.value);
        setValue({ ...value });
    };

    return (
        <div>
            {props.type !== 'submit' && (
                <div>
                    <p style={titleStyle}>{props.name}</p>
                    <input
                        value={getValue(props.name)}
                        onChange={(e) => {
                            handleUpdate(e);
                        }}
                        style={style}
                        {...props}
                    />
                </div>
            )}
            {props.type === 'submit' && (
                <div>
                    <input style={submitStyle} {...props} />
                </div>
            )}
        </div>
    );
};

export default FormInput;
