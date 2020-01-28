import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, NavLink } from "reactstrap";

import { passwordResetLink, clearPasswordResetLink } from '../../actions/authActions';
import { resetPasswordLinkSelector, resetPasswordLinkErrorSelector } from "../../selectors/authSelectors";
import { setIsResetPassword, } from '../../actions/userActions';
import { isResetPasswordSelector, } from '../../selectors/userSelectors';
import Popup from "../../components/General/PopupWithHeader";
import Input from "../../components/General/InputComponent";
import MainButton from "../../components/General/MainButton";
import ThankYouModal from '../../containers/ThankYouModal';
import styles from "./styles/index.module.scss";
import { BACK_ARROW, ARROW_BACK } from '../../styles/images';

const RestoreEmail = ({showPopup, setShowPopup, sendButtonClick, passwordResetLink, resetPasswordLink, resetPasswordLinkError, clearPasswordResetLink,  
  onClickBackFunc,  isResetPassword, setIsResetPassword
}) => {
   //const [showPopup, setShowPopup] = useState(false);
  const history = useHistory();
  const [personalMail, setPersonalMail] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidEmailText, setInvalidEmailText] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [isDisabledButton, setIsDisabledButton] = useState(true); //кнопка disabled

  const emailValidation = email => {
    const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return regex.test(email);
  };
 
  const enter = () => {
    const isEmailValid = emailValidation(personalMail);
    if(isEmailValid) {
      clearErrors();
      send();
      //setShowThankYouModal(true);
   //   setShowPopup(false);
    }
    if(!isEmailValid) {
      setInvalidEmail(true);
      setInvalidEmailText('Email неверный')
    } else {
      setInvalidEmail(false);
    }

    
  
  };

  const clearErrors = () => {
    setInvalidEmail(false);  
    setInvalidEmailText('');
    setIsDisabledButton(true);
  }

  const send = () => {
    passwordResetLink(personalMail);
  }

  useEffect(()=>{
  
    if(resetPasswordLink){
     // sendButtonClick();
      clearPasswordResetLink();
      setShowThankYouModal(true);
    } else if( resetPasswordLink === false) {
      setInvalidEmail(true);
      setInvalidEmailText(resetPasswordLinkError);
      clearPasswordResetLink();
      setShowThankYouModal(false);
   
    }
  },[resetPasswordLink, sendButtonClick, resetPasswordLinkError, clearPasswordResetLink])

  const onClickBack = () => {
    setIsResetPassword(false);
   // onClickBackFunc();
  }

  const inputStyles = {
    height: '60px'
  };

  return (
    <>
      <div className={styles["restore-email-block"]}>
          {/* {back-arrow} */}
        <div className={styles["arrow-back"]} onClick={onClickBack}> 
            <img src={ARROW_BACK} alt="back" />
            <span className={styles["back-text"]}>назад</span>
        </div>
        <div className={styles["email-container"]}>
          <Input
            type="email"
            placeholder="Рабочая почта"
            name="email"
            required
            onChangeInput={(e)=>{
              setPersonalMail(e.target.value);   
              if(e.target.value.length===0) {
                setIsDisabledButton(true);  
              }
              else {
                    setIsDisabledButton(false);
                
              }}}
            onFocus={()=>clearErrors()}
            style={inputStyles}
            value={personalMail}
            invalid={invalidEmail}
            errorText={invalidEmailText}

          />
        </div>        
        <MainButton title="Отправить" onClick={enter} disabled={isDisabledButton} />     
      </div>

    <Popup
     show={showThankYouModal}
     headerTitle="Спасибо!"
     closefunc={() => { 
      setShowThankYouModal(false); 
      setPersonalMail("");
      setIsResetPassword(false)
    }}
    >
        <div className={styles["thank-you-block"]}>На вашу почту отправлено письмо со ссылкой для восстановление пароля</div>
    </Popup>
    </>
  );
};

const mapStateToProps = state => ({
  resetPasswordLink: resetPasswordLinkSelector(state),
  resetPasswordLinkError: resetPasswordLinkErrorSelector(state),
  isResetPassword: isResetPasswordSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  passwordResetLink,
  clearPasswordResetLink,
  setIsResetPassword,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestoreEmail);
