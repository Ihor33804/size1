import React, { useState, useEffect, useLayoutEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useHistory, NavLink, useParams } from 'react-router-dom';
import classnames from 'classnames';
import ContainerForMessage from "../../components/General/ContainerForMessage";
import ReCAPTCHA from "react-google-recaptcha";
import {registerFriend, clearRegistrationFriend} from '../../actions/authActions';
import {registrationFriendFinishedSelector, registrationFriendFinishedErrorTextSelector} from '../../selectors/authSelectors';
import { CustomInput } from "reactstrap";
import * as keys from '../../routers/keys';
import styles from "./styles/index.module.scss";
import "./styles/index.scss";
import "../../styles/index.scss";
import InputComponent from "../../components/General/InputComponent";
import MainButton from "../../components/General/MainButton";
import RulesModal from "../../containers/RulesModal";
import config from '../../config/';

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

const IAgree = ({registerFriend, registrationFriendFinished, registrationFriendFinishedErrorText, clearRegistrationFriend}) => {
  const [email, setEmail] = useState("");
  const [errorText, setErrorText] = useState("");
  const [invalid, setInvalid] = useState("");
  const [invalidAgree, setInvalidAgree] = useState(false);
  const [invalidAgreeOffers, setInvalidAgreeOffers] = useState(false);
  const [iConfirm, setIConfirm] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState('');
  const [recaptchaMessage, setRecaptchaMessage] = useState(false);
  const [showPopupHome, setShowPopupHome] = useState(false);

  const SITE_KEY = '6LeoLcEUAAAAACjXuvYLDxFnn-aFQ3WU8Ab13E_L';

  const [width] = useWindowSize();
 // const widthCaptcha = (width >= 767) ? "normal" : "compact";

  const history = useHistory(); 
  const params = useParams();

  useEffect(()=>{
    clearErrors();
    clearRegistrationFriend();
  },[]);

  const clearErrors = () => {
    setInvalidAgree(false);
    setInvalidAgreeOffers(false);
    setInvalid(false);
    setErrorText("");
  }

  const emailValidation = email => {
    const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return regex.test(email);
  };

  const onSendPromoCode = () => {
    const validEmail = emailValidation(email);
    clearErrors();
    if(!recaptchaValue) {
      setRecaptchaMessage(true);
    }
    else {
        setRecaptchaMessage(false);
    }
    if(validEmail && iConfirm) {
      const { code } = params;
      const codeValue = code.substring(5);
      
      if(recaptchaValue) {
        console.log(recaptchaValue);
        registerFriend(email, codeValue, recaptchaValue);
      }
    } else {
      if(!validEmail) {
        setInvalid(true);
        setErrorText("Проверьте ваш email");
      
      } 
      if(!iConfirm) {
        setInvalidAgree(true);
       
      }
      
    }
  };

  let captcha;
	const setCaptchaRef = (ref) => {
		if (ref) {
			return captcha = ref;
		}
	};
  const resetCaptcha = () => {
		// maybe set it till after is submitted
    captcha.reset();
    console.log(captcha);
	}
  // useEffect(()=>{
  //   if(registrationFriendFinished) {      
  //     clearErrors();
  //     clearRegistrationFriend();
  //     history.replace(keys.CHECK_EMAIL);      
  //   }
  //   else if (registrationFriendFinished === false) {
  //     setInvalid(true);
  //     setErrorText(registrationFriendFinishedErrorText);
  //   } 
  // },[registrationFriendFinished, history, registrationFriendFinishedErrorText, clearRegistrationFriend])



  useEffect(()=>{
    //setInvalid(true);
    //setErrorText(registrationFriendFinishedErrorText);
    if(registrationFriendFinished) {   
      clearErrors();   
      clearRegistrationFriend();
      history.replace(keys.CHECK_EMAIL);      
    }
    else {
      setInvalid(true);
      setErrorText(registrationFriendFinishedErrorText);
    }
   

  
  },[registrationFriendFinished,])


  const styleInput = {
    height: '60px'
  }
  const onChangeCaptcha = (value) => {
    setRecaptchaValue(value);
}

  return (
    <ContainerForMessage>
      <div className={styles["promocode-form"]}> 
        <div className={styles["title"]}>РЕГИСТРАЦИЯ</div>
        <div className={styles["h3"]}>Пройди простую регистрацию и получи свой промокод</div>
        <div className={styles["input-block"]}>
          <InputComponent style={styleInput}
          type="email"
          required          
          onChangeInput={e=>{setEmail(e.target.value);   }}
          onFocus={()=>{resetCaptcha()}}
          value={email}
          errorText={errorText}
          invalid={invalid}
          placeholder="Введите e-mail"
          />
        </div>
        <div className={classnames("d-flex flex-column",styles["label-block"])}>
          <div className={"d-flex"}>
          <CustomInput
            type="checkbox"
            id="exampleCustomCheckbox1"
            value={iConfirm}
            onChange={(e)=>{setIConfirm(!iConfirm)}}
          /> 
          {/* <p className={styles["i-agree-with-text"]}>Я даю добровольное <NavLink to={keys.RULES} className={styles["agree-link"]}>согласие</NavLink> на обработку своих персональных данных</p> */}
          <p className={styles["i-agree-with-text"]}>Я ознакомлен с <a href={`${config.siteUrl}/upload/jti-ip-personal-data-protection.pdf?${Math.random()}`} target="_blank" className={styles["agree-link"]}>Политикой</a> в отношении обработки и обеспечения безопасности персональных данных и даю добровольное <a href={`${config.siteUrl}/upload/agreement-friend.pdf?${Math.random()}`} target="_blank" className={styles["agree-link"]}>согласие</a> на обработку персональных данных </p>
          
          </div>
          {invalidAgree && <div className={styles["checkbox-block"]}><div className={styles["error-text"]}>Подтвердите согласие</div></div>}
        </div >
       
        <div className={classnames("d-flex flex-column",styles["label-block"])}>
        {invalidAgreeOffers && <div className={styles["checkbox-block"]}><div className={styles["error-text"]}>Подтвердите согласие</div></div>}
        </div>

        <div className={styles["recapcha-block"]}>
                <ReCAPTCHA
                    ref={(r) => setCaptchaRef(r)}
                    className="g-recaptcha_promocode "
                    sitekey={SITE_KEY}
                    onChange={onChangeCaptcha}
                    hl="ru"
                    //size="normal"
                />
            </div>
        {recaptchaMessage&& 
             <div className={styles["error-text-block-step"]}>
                    <div className={styles["error-text-recapcha"]}>Подтвердите, что вы не робот</div> 
            </div>
        }
         <div className={styles["button-block"]}>
          <MainButton title="Отправить промокод" onClick={onSendPromoCode} classNamesForButton={styles["send-promo-code-button"]}/>
        </div>
      </div>
      <RulesModal showPopup={showPopupHome} setShowPopup={setShowPopupHome}  />
    </ContainerForMessage>
  );
};

const mapStateToProps = state => ({
  registrationFriendFinished: registrationFriendFinishedSelector(state),
  registrationFriendFinishedErrorText: registrationFriendFinishedErrorTextSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  registerFriend,
  clearRegistrationFriend
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IAgree);
