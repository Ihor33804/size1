import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Container, Row, Col, NavLink } from "reactstrap";

import { passwordResetLink, clearPasswordResetLink } from '../../actions/authActions';
import { resetPasswordLinkSelector, resetPasswordLinkErrorSelector } from "../../selectors/authSelectors";
import Popup from "../../components/General/PopupWithHeader";
import Input from "../../components/General/InputComponent";
import MainButton from "../../components/General/MainButton";
import ThankYouModal from '../../containers/ThankYouModal';
import styles from "./styles/index.module.scss";
import { BACK_ARROW } from '../../styles/images';

const RestoreEmailModal = ({showPopup, setShowPopup, sendButtonClick,passwordResetLink, resetPasswordLink, resetPasswordLinkError, clearPasswordResetLink,  onClickBackFunc}) => {
   //const [showPopup, setShowPopup] = useState(false);
  const [personalMail, setPersonalMail] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidEmailText, setInvalidEmailText] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);

  const emailValidation = email => {
    const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return regex.test(email);
  };
 
  const enter = () => {
    const isEmailValid = emailValidation(personalMail);
    if(isEmailValid) {
      clearErrors();
      send();
      setShowThankYouModal(true);
      setShowPopup(false);
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
  }

  const send = () => {
    passwordResetLink(personalMail);
  }

  useEffect(()=>{
    if(resetPasswordLink){
      sendButtonClick();
      clearPasswordResetLink();
    } else if( resetPasswordLink === false) {
      setInvalidEmail(true);
      setInvalidEmailText(resetPasswordLinkError);
      clearPasswordResetLink();
   //   setShowThankYouModa(false);
    }
  },[resetPasswordLink, sendButtonClick, resetPasswordLinkError, clearPasswordResetLink])

  const onClickBack = () => {
    onClickBackFunc();
  }

  const inputStyles = {
    height: '60px'
  };

  return (
    <>
    <Popup
      show={showPopup}
      headerTitle="Восстановление"
      closefunc={() => setShowPopup(false)}
    >
      <div>
        <div className={styles["back-arrow"]} onClick={onClickBack}>
        <img src={BACK_ARROW} alt="back" />
        <span className={styles["back-text"]}>назад</span>
        </div>
        <div className={styles["email-container"]}>
          <Input
            type="email"
            placeholder="Рабочая почта"
            name="email"
            required
            onChangeInput={(e)=>setPersonalMail(e.target.value)}
            onFocus={()=>clearErrors()}
            style={inputStyles}
            value={personalMail}
            invalid={invalidEmail}
            errorText={invalidEmailText}
          />
        </div>        
        <MainButton title="Отправить" onClick={enter} />     
      </div>
    </Popup>
    <Popup
     show={showThankYouModal}
     headerTitle="Спасибо!"
     closefunc={() => { setShowThankYouModal(false); setPersonalMail(""); }}
    >
        <div className={styles["thank-you-block"]}>На вашу почту отправлено письмо со ссылкой для восстановление пароля</div>
    </Popup>
    </>
  );
};

const mapStateToProps = state => ({
  resetPasswordLink: resetPasswordLinkSelector(state),
  resetPasswordLinkError: resetPasswordLinkErrorSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  passwordResetLink,
  clearPasswordResetLink,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestoreEmailModal);
