import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { NavLink } from "reactstrap";
import { useHistory } from 'react-router-dom';

import { signInFinishedSelector, signInFinishedErrorSelector } from "../../selectors/authSelectors";
import { clearSignInFinished } from "../../actions/authActions";
import Popup from "../../components/General/PopupWithHeader";
import Input from "../../components/General/InputComponent";
import MainButton from "../../components/General/MainButton";
import { auth } from "../../actions/authActions";
import * as keys from "../../routers/keys";
import styles from "./styles/index.module.scss";

const AuthModal = ({auth, showPopup, setShowPopup,clearSignInFinished, signInFinishedError, signInFinished, showRestorePasswordEmail, }) => {
  const history = useHistory();
  // const [showPopup, setShowPopup] = useState(true);
  const [personalMail, setPersonalMail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidEmailText, setInvalidEmailText] = useState(false);
  const [invalidPasswordText, setInvalidPasswordText] = useState(false);
  const [disabledBut, setDisabledBut] = useState(true);
  const emailValidation = email => {
    const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return regex.test(email);
  };

  const enter = () => {
   
    const isEmailValid = emailValidation(personalMail);
    const isPasswordValid = password.length === 0 ? false : true;
    if(isEmailValid && isPasswordValid) {
      clearErrors();
      send();
      setDisabledBut(true);
    } else {
      if(!isEmailValid) {
        setInvalidEmail(true);
        setInvalidEmailText('Email неверный')
      } else {
        setInvalidEmail(false);
      }
      if(!isPasswordValid) {
        setInvalidPassword(true);
        setInvalidPasswordText('Пароль не может быть пустым');
      } else {
        setInvalidPassword(false);
      }
    }
    
    
  };

  const clearErrors = () => {
    setInvalidEmail(false);
    setInvalidPassword(false);
    setInvalidPasswordText('');
    setInvalidEmailText('');
  }

  const forgotPasswordClick = () => {
    showRestorePasswordEmail();
  }

  const send = () => {
    //send data
 
    auth(personalMail, password);
  }

  useEffect(()=>{
    if(signInFinished) {
      history.push(keys.MAIN_PAGE); 
      clearSignInFinished();
     // setDisabledBut(true);
    } else if (signInFinished === false){
      setInvalidEmail(true);
      setInvalidEmailText(signInFinishedError);
    } else {
      setInvalidEmail(false);
      setInvalidEmailText(false);
     
    }
    },[signInFinished, history, signInFinishedError, clearSignInFinished])

  

  const emailStyle = {
    height: '60px'
  }

  const passwordStyle = {
    height: '60px'
  }

  const mainButtonStyle = {
    backgroudColor: '#7F7D80!important'
  }

 
  return (
    <Popup
      show={showPopup}
      headerTitle="Авторизация"
      closefunc={() => setShowPopup(false)}
    >
      <div>
        <div className={styles["email-container"]}>
          <Input
            type="email"
            placeholder="Рабочая почта"
            name="email"
            style={emailStyle}
            required
            onFocus={()=>{
              setInvalidEmail(false);
              setInvalidEmailText('');
            }}
            onChangeInput={(e)=>setPersonalMail(e.target.value)}
            value={personalMail}
            invalid={invalidEmail}
            errorText={invalidEmailText}
          />
        </div>
        <div className={styles["phone-container"]}>
          <Input
            type="password"
            placeholder="Пароль"
            name="password"
            style={passwordStyle}
            required
            onFocus={()=>{
              setInvalidPassword(false);
              setInvalidPasswordText('');
              setDisabledBut(false);
            }}
            onChangeInput={(e)=>setPassword(e.target.value)}
            value={password}
            invalid={invalidPassword}
            errorText={invalidPasswordText}
          />
        </div>
        <MainButton title="Войти" disabled={disabledBut} onClick={enter}  classNamesForButton={styles['styleBut']} />
        <NavLink href="#" onClick={forgotPasswordClick} className={styles["forgot-password"]}>
          Забыли пароль?
        </NavLink>
      </div>
    </Popup>
  );
};

const mapStateToProps = state => ({
  signInFinished: signInFinishedSelector(state),
  signInFinishedError: signInFinishedErrorSelector(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  auth,
  clearSignInFinished,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthModal);
