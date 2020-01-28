import React, { useEffect, useState, useRef } from 'react';
import { Input, Col,} from "reactstrap";
import className from 'classnames';
import styles from './styles/index.module.scss';
import './styles/index.scss';
import {
    ELLIPSE_COMPLETE_INPUT,
    EDIT_INPUT
  } from "../../../styles/images";

const InputComponent = ({ 
                            type="text", 
                            style = {}, 
                            placeholder="", 
                            name="input", 
                            required=false, 
                            onChangeInput = () => { }, 
                            send = () => { },  
                            onBlur = () => { },
                            onFocus = () => {},
                            onClickAgree = () => {},
                            onClickComplete = () => {},
                            value = '' , 
                            complete = false,
                            disabled = false,
                            invalid  = false,
                            errorText = false,
                            confirm = false,
                            edit = false,
                            autoСomplete = 'off',
                            classNamesForInput,
                            maxLength="50",
                            ...props 
                        }) => {
     
    const [inputVal, setInputVal] = useState('');
   
    // const checkInput = e => {
    //     setInputVal(e.target.value);
    // }
   
    
    return (
      <>
       <span className={styles["input-block"]}>
        <Input
                type={type}
                //className={styles["input"]} 
                style={style} 
                className={className(styles["input"],classNamesForInput)} 
                placeholder={placeholder}
                value={value}
                name={name}
                onFocus={()=>onFocus()}
                onBlur={()=>{onBlur()}}
                onChange={(e)=>{
                   onChangeInput(e)
                }}
                required={required}
                disabled = {disabled}
                invalid = {invalid}
                autoComplete={autoСomplete}
                maxLength={maxLength}
        />
        {complete&&<div className={styles["icon-block-complete"]} ><img src={ELLIPSE_COMPLETE_INPUT} alt="complete" className={styles["icon-input"]} /></div>}
        {/* {confirm&&
            <Col xs="12" sm="12" md="4" lg="4">
              <div className={styles["confirm-input-block"]} onClick={()=>onClickAgree()}>
                <span className={styles["confirm-input"]}>Подтвердить</span>
              </div>
            </Col>
        } */}
        {edit&&<img src={EDIT_INPUT} alt="edit" className={styles["icon-input"]}/>}
       
       </span>
       {(errorText && invalid) &&<p className={styles["error-text"]}>{errorText}</p>}
       
       </>
   )

}

export default InputComponent;


