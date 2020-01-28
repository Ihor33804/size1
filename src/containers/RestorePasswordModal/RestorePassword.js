import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { NavLink } from "reactstrap";
import { useLocation, useHistory } from "react-router-dom";
import * as keys from "../../routers/keys";
import classnames from "classnames";
import { passwordChange, clearPasswordChange } from '../../actions/authActions';
import { passwordChangedErrorSelector,  passwordChangedStatusSelector } from '../../selectors/authSelectors';
import Popup from "../../components/General/PopupWithHeader";
import Input from "../../components/General/InputComponent";
import MainButton from "../../components/General/MainButton";
import styles from "./styles/index.module.scss";
import "./styles/index.scss";
import { ARROW_BACK, SHOW_PASSWORD, EYE,ELLIPSE_COMPLETE_INPUT } from '../../styles/images';


const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const RestorePassword = ({showPopup, setShowPopup, passwordChange, passwordChangedStatus, clearPasswordChange, passwordChangedError}) => {
    const history = useHistory();
  // const [showPopup, setShowPopup] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [invalidNewPassword, setInvalidNewPassword] = useState(false);
  const [invalidRepeatNewPassword, setInvalidRepeatNewPassword] = useState(
    false
  );
  const [invalidNewPasswordText, setInvalidNewPasswordText] = useState(false);
  const [invalidRepeatPasswordText, setInvalidRepeatPasswordText] = useState(false);
  const [warning, setWarning] = useState("");
  const [showImagePassword, setShowImagePassword] = useState("password"); //показ-скрытие пароля по клике на иконку;
  const [imageIconPassword, setImageIconPassword] = useState(SHOW_PASSWORD); 
  const [isDisabledButton, setIsDisabledButton] = useState(true); //кнопка disabled

  const goBack = () => {
    
        history.replace(keys.IDENTIFICATION); //
  }  



  let query = useQuery();

  const enter = () => {
    const isNewPasswordValid = newPassword.length === 0 ? false : true;
    const isPasswordValid = repeatNewPassword.length === 0 ? false : true;

    validSpecialSymbol(isNewPasswordValid)
    
    if (
      isNewPasswordValid &&
      isPasswordValid &&
      (newPassword === repeatNewPassword)
    ) {
      const validSpec = validSpecialSymbol(newPassword);

      if(validSpec) {
        clearErrors();
        send();
      }
    } else{
      if (newPassword.length === 0 ) {
        setInvalidNewPassword(true);
        setInvalidNewPasswordText("Поле пароля не может быть пустым");
      }
      if (repeatNewPassword.length === 0) {
        setInvalidRepeatNewPassword(true);
        setInvalidRepeatPasswordText("Поле пароля не может быть пустым");
      }
    } if (newPassword.length === 0 || repeatNewPassword.length === 0) {
      setInvalidNewPassword(true);
      setInvalidRepeatNewPassword(true);
      setInvalidRepeatPasswordText("Поле пароля не может быть пустым");
    } else if(newPassword.length > 0 && repeatNewPassword.length > 0 && newPassword !== repeatNewPassword){
      setInvalidNewPassword(true);
      setInvalidRepeatNewPassword(true);
      setInvalidRepeatPasswordText("Пароли не совпадают");
    }
  };

  const clearErrors = () => {
    setInvalidNewPassword(false);
    setInvalidRepeatNewPassword(false);
    setInvalidRepeatPasswordText("");
    setInvalidNewPasswordText("");
    setIsDisabledButton(true);
  };

  const validSpecialSymbol = str => {

    let password_str = str.toString();
    if (password_str.length >= 8) { //если длина пароля минимум 8 символов
      let capitalLetters = /[A-ZА-Я]+/.test(str);

      if (capitalLetters) { //если в пароле есть заглавные буквы
        let letters = /[a-zа-я]+/.test(str);
        if (letters) { //если в пароле есть строчные буквы
          let digits = /[0-9]+/.test(str);
          if (digits) { //если в пароле есть цифры
            //let special_symbols = /\W+/.test(str); 
            let special_symbols = /@+|:+|,+|'+|"+|;+|-+|_+|=+|<+|>+|%+|#+|~+|`+|&+|!+|\/+|\$+|\^+|\.+|\*+|\{+|\}+|\[+|\]+|\(+|\)+|\|+|\++/.test(str);
            // 
            if (special_symbols) { //если в пароле есть не алфавитно-цифровой символы
              return true;
            }
            else {
              setInvalidNewPassword(true);
              setInvalidRepeatNewPassword(true);
              setInvalidNewPasswordText("Необходимо использовать символ. Например: * @ # & % _");
            }
          }
          else {
            setInvalidNewPassword(true);
            setInvalidRepeatNewPassword(true);
            setInvalidNewPasswordText("В пароле должна находится минимум одна цифра");
          }
        }
        else {
          setInvalidNewPassword(true);
          setInvalidRepeatNewPassword(true);
          setInvalidNewPasswordText("В пароле должна находится минимум одна строчная буква");
        }
      }
      else {
        setInvalidNewPassword(true);
        setInvalidRepeatNewPassword(true);
        setInvalidNewPasswordText("В пароле должна находится минимум одна заглавная буква");
      }

    }
    else {
      setInvalidNewPassword(true);
      setInvalidRepeatNewPassword(true);
      setInvalidNewPasswordText("Пароль должен состоять не менее, чем из 8 символов");

    }

    return false;
  }


  const send = () => {
    //send data
    const n = query.get("n");
    const code = query.get("code");
    passwordChange(n,code,newPassword);
  };
  useEffect(()=>{
    if(newPassword.length>0&&repeatNewPassword.length>0) {
    
      setIsDisabledButton(false);  
    }
    else {
      setIsDisabledButton(true);  
    }
  },[newPassword, repeatNewPassword])

  useEffect(()=>{
  
    if(passwordChangedStatus){
      //setShowPopup(false);
      clearPasswordChange();
      history.push(keys.MAIN_PAGE); //
      setShowImagePassword("password");
      setImageIconPassword(SHOW_PASSWORD);
     // goBack();
    } else if(passwordChangedStatus === false){
      setInvalidNewPassword(true);
      if(passwordChangedError&&passwordChangedError==='Неверная ссылка') {
        setWarning("Неверная ссылка для восстановления пароля");
      }
      else {
         setInvalidNewPasswordText(passwordChangedError);
         setWarning("")
      }
      clearPasswordChange();
    }
   

    
  },[passwordChangedStatus, passwordChangedError, setShowPopup, clearPasswordChange])

  
  const toggleImagePassword = () => {
    if(showImagePassword==="password") {
        setShowImagePassword("text");
        setImageIconPassword(EYE);
    }
    else if (showImagePassword==="text") {
        setShowImagePassword("password");
        setImageIconPassword(SHOW_PASSWORD);
    }
}


  const inputStyles = {
    height: '60px'
  };

  return (
   
      <div>
        <div className={styles["arrow-back"]} onClick={()=>{goBack()}}> 
            <img src={ARROW_BACK} alt="back" />
            <span className={styles["back-text"]}>назад</span>
        </div>
        <div className={styles["email-container"]}>
          <Input
            type={showImagePassword}
            placeholder="Новый пароль"
            name="repeatNewPassword"
            style={inputStyles}
            required
            onFocus={()=>{
              setInvalidNewPassword(false);
              setInvalidNewPasswordText("");
              // if(newPassword.length===0) {
              //   setIsDisabledButton(true);  
              // }            
            }}
            onChangeInput={(e)=>{
              e.target.value =  e.target.value.replace(/\s+/g, '');
              setNewPassword(e.target.value);
             
            }}
            value={newPassword}
            invalid={invalidNewPassword}
            errorText={invalidNewPasswordText}
            maxLength={35}
          />
        </div>
        <div className={"show-password-image-block"}>
                <img src={imageIconPassword} alt="пароль" 
                    className={classnames({  'show-password-image ' : showImagePassword==="password" }, {'show-password-image-text' : showImagePassword==="text" })}
                    onClick = {()=>{toggleImagePassword()}}/>
        </div>
        <div className={styles["phone-container"]}>
          <Input
            type="password"
            placeholder="Подтвердите новый пароль"
            name="repeatNewPassword"
            style={inputStyles}
            required
            onFocus={()=>{
              setInvalidRepeatNewPassword(false);
              setInvalidRepeatPasswordText("");
              // if(repeatNewPassword.length===0) {
              //   setIsDisabledButton(true);  
              // }
            }}
            onChangeInput={(e)=>{setRepeatNewPassword(e.target.value);  }}
            value={repeatNewPassword}
            invalid={invalidRepeatNewPassword}
            errorText={invalidRepeatPasswordText}
          />
        </div>
        {repeatNewPassword.length!==0 && repeatNewPassword===newPassword&&<div className={styles["confirm-image-block"]}>
                <img src={ELLIPSE_COMPLETE_INPUT} alt="подтверждение пароля" className={styles["confirm-image"]} onClick = {()=>{}}/>
            </div>}
        {warning&&<div className={styles["warning-block"]}>
          <div className={styles["warning"]}>
            {warning}
            </div>
          </div>
        }
        <MainButton title="Сохранить" onClick={enter} disabled = {isDisabledButton}/>
      </div>
  );
};

const mapStateToProps = state => ({
  passwordChangedError: passwordChangedErrorSelector(state), 
  passwordChangedStatus: passwordChangedStatusSelector(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  passwordChange,
  clearPasswordChange
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestorePassword);
