import React, {useReducer, useEffect} from "react";

import {validate} from "../../util/validators";

import "./Input.css";

const inputReducer = (state, action) => {
    switch(action.type) {
        case "CHANGE":
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case "TOUCH":
            return {
                ...state,
                isTouched: true
            };
        default:
            return state;
    }
};

const Input = props => {

    const [inputState, dispatcher] = useReducer(inputReducer, {
        value: props.initialValue || "", 
        isValid: props.initialValid || false,
        isTouched: false
    });

    const {id, onInput} = props;
    const {value, isValid} = inputState;

    useEffect(()=>{
        onInput(id, value, isValid);
    }, [id, value, isValid, onInput]);

    const changeHandler = event => {
        dispatcher({
            type: "CHANGE", 
            val: event.target.value, 
            validators: props.validators
        });
    }

    const touchHandler = () => {
        dispatcher({
            type: "TOUCH"
        });
    };

    const element = 
        props.element === "input" ? (
            <input 
                id={props.id}
                type={props.type} 
                placeholder={props.placeholder} 
                onBlur={touchHandler} 
                onChange={changeHandler} 
                value={inputState.value} 
                className={props.className}
            />
        ) : (
            <textarea 
                id={props.id} 
                rows={props.rows || 3}
                value={inputState.value} 
                onBlur={touchHandler} 
                onChange={changeHandler}
                className={props.className}
            />
        );
        
    return (
        <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}> 
            {props.label && <label htmlFor={props.id}>{props.label}</label>}
            {element}
            {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
        </div>
    )
};

export default Input;