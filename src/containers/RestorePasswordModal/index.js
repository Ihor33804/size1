import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { NavLink } from "reactstrap";
import { useLocation } from "react-router-dom";

import { passwordChange, clearPasswordChange } from '../../actions/authActions';
import { passwordChangedErrorSelector,  passwordChangedStatusSelector } from '../../selectors/authSelectors';
import Popup from "../../components/General/PopupWithHeader";
import Input from "../../components/General/InputComponent";
import MainButton from "../../components/General/MainButton";
import styles from "./styles/index.module.scss";


const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const RestorePasswordModal = ({showPopup, setShowPopup, passwordChange, passwordChangedStatus, clearPasswordChange, passwordChangedError}) => {
  // const [showPopup, setShowPopup] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [invalidNewPassword, setInvalidNewPassword] = useState(false);
  const [invalidRepeatNewPassword, setInvalidRepeatNewPassword] = useState(
    false
  );
  const [invalidNewPasswordText, setInvalidNewPasswordText] = useState(false);
  const [invalidRepeatPasswordText, setInvalidRepeatPasswordText] = useState(
    false
  );
  
  let query = useQuery();

  const enter = () => {
    const isNewPasswordValid = newPassword.length === 0 ? false : true;
    const isPasswordValid = repeatNewPassword.length === 0 ? false : true;
    if (
      isNewPasswordValid &&
      isPasswordValid &&
      (newPassword === repeatNewPassword)
    ) {
      clearErrors();
      send();
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
  };


  const send = () => {
    //send data
    const n = query.get("n");
    const code = query.get("code");
    passwordChange(n,code,newPassword);
  };

  useEffect(()=>{
    if(passwordChangedStatus){
      setShowPopup(false);
      clearPasswordChange();
    } else if(passwordChangedStatus === false){
      setInvalidNewPassword(true);
      setInvalidNewPasswordText(passwordChangedError);
      clearPasswordChange();
    }
  },[passwordChangedStatus, passwordChangedError, setShowPopup, clearPasswordChange])

  

  const inputStyles = {
    height: '60px'
  };

  return (
    <Popup
      show={showPopup}
      headerTitle="Восстановление"
      closefunc={() => setShowPopup(false)}
    >
      <div>
        <div className={styles["email-container"]}>
          <Input
            type="password"
            placeholder="Новый пароль"
            name="repeatNewPassword"
            style={inputStyles}
            required
            onFocus={()=>{
              setInvalidNewPassword(false);
              setInvalidNewPasswordText("");
            }}
            onChangeInput={(e)=>setNewPassword(e.target.value)}
            value={newPassword}
            invalid={invalidNewPassword}
            errorText={invalidNewPasswordText}
          />
        </div>
        <div className={styles["phone-container"]}>
          <Input
            type="password"
            placeholder="Новый пароль"
            name="repeatNewPassword"
            style={inputStyles}
            required
            onFocus={()=>{
              setInvalidRepeatNewPassword(false);
              setInvalidRepeatPasswordText("");
            }}
            onChangeInput={(e)=>setRepeatNewPassword(e.target.value)}
            value={repeatNewPassword}
            invalid={invalidRepeatNewPassword}
            errorText={invalidRepeatPasswordText}
          />
        </div>
        <MainButton title="Сохранить" onClick={enter} />
      </div>
    </Popup>
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
)(RestorePasswordModal);
