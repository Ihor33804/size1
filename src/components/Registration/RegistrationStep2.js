import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Container, Row, Col, CustomInput, NavLink } from "reactstrap";
import { useHistory } from "react-router-dom";
import classnames from "classnames";
import ReCAPTCHA from "react-google-recaptcha";
import * as keys from "../../routers/keys";
import { confirmEmpEmail, setResponseMessageUndefined, signUP, } from '../../actions/authActions';
import { isRequestAuthSelector, responseMessageSelector, isConfirmedEmailSelector, isRegisteredUserSelector, isConfirmedCodeSelector, isConfirmedEmailAndCodeSelector} from '../../selectors/authSelectors';
import { } from '../../actions/userActions.js';
import { } from '../../selectors/userSelectors';
import InputComponent from '../../components/General/InputComponent';
import MainButton from '../../components/General/MainButton/';
import RulesModal from "../../containers/RulesModal";
import styles from "./styles/index.module.scss";
import "./styles/index.scss";
import { SHOW_PASSWORD, ELLIPSE_COMPLETE_INPUT, EYE } from "../../styles/images.js";
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


const RegistrationStep2 = ({
    checkData,
    setCheckData,
    signUP,
    isRegisteredUser,
    isRequest,
    responseMessage,
    setResponseMessageUndefined,
    isConfirmedCode,
    isConfirmedEmailAndCode,
}) => {
    const history = useHistory();
    const [errorPassword, setErrorPassword] = useState(''); //если ошибка введенного значения в password input 
    const [confirmPassword, setConfirmPassword] = useState(""); //пароль для подтверждения
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(''); //класс для подсветки красным,в случае ошибки подтверждения пароля
    const [checkbox, setCheckbox] = useState(false);   //чекбокс для подтверждения согласия
    const [warning, setWarning] = useState(''); //для предупреждений, в связи с ошибками введенных данных (отображается между чекбоксом и кнопкой "Зарегистрироваться")
    const [warningCheckbox, setWarningCheckbox] = useState(''); 
    const [isEmptyInputs, setIsEmptyInputs] = useState(undefined); //для проверки не пустые ли поля 
    const [message, setMessage] = useState('');
    const [recaptchaValue, setRecaptchaValue] = useState('');
    const [recaptchaMessage, setRecaptchaMessage] = useState(false);
    const [showInfoPassword, setShowInfoPassword] = useState(false);
    const [showImagePassword, setShowImagePassword] = useState("password"); //показ-скрытие пароля по клике на иконку;
    const [imageIconPassword, setImageIconPassword] = useState(SHOW_PASSWORD); 
    const [showPopupHome, setShowPopupHome] = useState(false);
    const [isDisabledButton, setIsDisabledButton] = useState(true); //кнопка disabled

 
    const SITE_KEY = '6LeoLcEUAAAAACjXuvYLDxFnn-aFQ3WU8Ab13E_L';
    const [width] = useWindowSize();
    
    const widthCaptcha = (width >= 568) ? "normal" : "compact";



    const passwordInfo = (width >= 767) ? true : false;

    useEffect(() => {
        if(checkData['name']&&checkData['password']&&confirmPassword&&checkbox&&recaptchaValue) {
            setIsDisabledButton(false);
        }
        else {
            setIsDisabledButton(true);
        }
    }, [confirmPassword,checkbox,recaptchaValue ])

    useEffect(() => {
        if (isRegisteredUser) { //если пользователь успешно зарегистрировался
            // ga('send', 'event', [eventCategory], [eventAction], [eventLabel], [eventValue], [fieldsObject]);
            window.dataLayer.push({
                "event": "custom_event",
                "category" : "Logic For You Identification",
                "action": "Registration",
                "label" : "User registered"
              });

            history.replace(keys.MAIN_PAGE); //перенаправляем его на страницу профиля
            //refreshData(); //скидываем все данные
        }

    }, [isRegisteredUser])


    useEffect(() => {
    
        setIsDisabledButton(true);
        setIsEmptyInputs(undefined);
        setResponseMessageUndefined();
        setMessage("");
        setShowInfoPassword(false);
        setShowImagePassword("password");
        setImageIconPassword(SHOW_PASSWORD);
        if (!isRequest && responseMessage && responseMessage.status === 200) { //если код и е-мейл подтвержден 
            setMessage("Email успешно подтверждён ");
        }
    }, []);
  
    const checkInput = e => { //ввод значений в поля регистрации
        if (e.target.name === "name") {
            e.target.value = e.target.value = e.target.value.replace(/[^A-Za-zА-Яа-я\.]/g, '').split(/\./).slice(0, 2).join('.');
        }
        else if (e.target.name === "password") {
            e.target.value =  e.target.value.replace(/\s+/g, '');
            validSpecialSymbol(e.target.value);
        }

        setCheckData({ ...checkData, [e.target.name]: e.target.value });

    }
    const checkConfirmPassword = e => { //ввод пароля для подтверждения
        setConfirmPassword(e.target.value);
        setErrorConfirmPassword(""); //если после ошибки в подтверждении пароля начинают вводить заново значения в инпут , снимаем красную рамку с инпута
        setErrorPassword("");
    }
    const onChangeCheckbox = e => { //отметка чекбокса     
        setCheckbox(!checkbox);
        onBlurInput();
    }
    const comparePasswords = () => { //проверка совпадают ли пароли
        if (confirmPassword === checkData["password"]) {
            setErrorPassword("");
            return true;
        }
        else {
            setErrorConfirmPassword("error-input");
            setErrorPassword("Пароли должны совпадать");
            return false;
        }
    }


    const validSpecialSymbol = str => {

        let password_str = str.toString();
        if (password_str.length >= 8) { //если длина пароля минимум 8 символов
            setWarning(""); 
            setShowInfoPassword(false)
            let capitalLetters = /[A-ZА-Я]+/.test(str);

            if (capitalLetters) { //если в пароле есть заглавные буквы
                setWarning("");
                setShowInfoPassword(false)
                let letters = /[a-zа-я]+/.test(str);
                if (letters) { //если в пароле есть строчные буквы
                    setWarning("");
                    setShowInfoPassword(false)
                    let digits = /[0-9]+/.test(str);
                    if (digits) { //если в пароле есть цифры
                        setWarning("");
                        setShowInfoPassword(false)
                        //let special_symbols = /\W+/.test(str); 
                        let special_symbols = /@+|:+|,+|'+|"+|;+|-+|_+|=+|<+|>+|%+|#+|~+|`+|&+|!+|\/+|\$+|\^+|\.+|\*+|\{+|\}+|\[+|\]+|\(+|\)+|\|+|\++/.test(str);
                        // 
                        if (special_symbols) { //если в пароле есть не алфавитно-цифровой символы
                            setWarning("");
                            setShowInfoPassword(false)
                            return true;
                        }
                        else {
                            setWarning("Необходимо использовать символ. Например: * @ # & % _");
                            setShowInfoPassword(true);
                        }
                    }
                    else {
                        setWarning("В пароле должна находится минимум одна цифра");
                        setShowInfoPassword(true);
                    }
                }
                else {
                    setWarning("В пароле должна находится минимум одна строчная буква");
                    setShowInfoPassword(true);
                }
            }
            else {
                setWarning("В пароле должна находится минимум одна заглавная буква");
                setShowInfoPassword(true);
            }

        }
        else {
            setWarning("Используйте хотя бы 8 знаков");
            setShowInfoPassword(true);
          
        }
      
        return false; //
    }


    const sendData = () => { //отправка данных для регистрации
       
        let isCompleted = true;
        let isValidedSpecialSymbol = false;
        let isCheckedPasswords = false;

        Object.values(checkData).map((item, index) => { //проверяем заполнены ли все поля
            if (item.length === 0) {
                isCompleted = false;
            }

        });
        isValidedSpecialSymbol = validSpecialSymbol(checkData["password"]);
        isCheckedPasswords = comparePasswords(); //проверяем совпадают ли пароли


        if(!isCompleted)
            setIsEmptyInputs(true);
        else 
            setIsEmptyInputs(false);

        if (checkbox === false) {
            setWarningCheckbox("Подтвердите согласие на обработку своих персональных данных");
        }
        else {
            setWarningCheckbox("");
        }

       
        if(!recaptchaValue) {
            setRecaptchaMessage(true);
        }
        else {
            setRecaptchaMessage(false);
        }
        if (checkbox && isCompleted && isCheckedPasswords && checkData && isValidedSpecialSymbol&&recaptchaValue) { //
            signUP(checkData["workEmail"], checkData["password"], checkData["name"], "noname", "noname", recaptchaValue );
        }

    }
    const onChangeCaptcha = (value) => {
        onBlurInput();
        setRecaptchaValue(value);
    } 

    const goToRules = () => {
        history.push(keys.RULES); 
    }
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

    const onBlurInput = e => {
       
       if(checkData['name']&&checkData['password']&&confirmPassword&&checkbox&&recaptchaValue) {
            setIsDisabledButton(false);
       }
       else {
          setIsDisabledButton(true);
       }
    }

    
    return (
        <>

            <div className={styles["step-block"]}>
                <div className={styles["step"]}> шаг 2 </div>
            </div>
            <div className={styles["input-block-step"]}>
                <InputComponent //default input
                    onChangeInput={checkInput}
                    value={checkData['name']}
                    name='name'
                    placeholder="Имя"
                    onBlur={()=>{onBlurInput()}}
                    onFocus={()=> setIsDisabledButton(true)}
                //        disabled={isDisabled}
                />
            </div>

            {/* <div className={styles["input-block-step"]}>
                <InputComponent //default input
                    onChangeInput={checkInput}
                    value={checkData['surname']}
                    name='surname'
                    placeholder="Фамилия"
             
                />
            </div> */} 
            <div className={styles["input-block-step"]}>
                <InputComponent //default input
                    type={showImagePassword}
                    onChangeInput={checkInput}
                    value={checkData['password']}
                    name='password' 
                    placeholder="Пароль"
                    errorText={errorPassword}
                    onFocus={()=>{setShowInfoPassword(true); setIsDisabledButton(true)}}
                    onBlur={()=>{setShowInfoPassword(false);onBlurInput()}}
                    maxLength={35}
                // classNamesForInput={styles[errorConfirmPassword]}
                />
            </div>
            <div className={"show-password-image-block-register"}>
                <img src={imageIconPassword} alt="пароль" 
                    className={classnames({  'show-password-image-register ' : showImagePassword==="password" }, {'show-password-image-text-register' : showImagePassword==="text" })}
                    onClick = {()=>{toggleImagePassword()}}/>
            </div>
            {passwordInfo&&showInfoPassword&&
            <div className={styles["password-warning-block"]}>
                    <div className={styles["password-warning"]}>
                        <div className={styles["password-text"]}>                     
                        {!warning&&<span>Пароль должен содержать не менее 8 знаков, включать буквы, цифры и специальные символы</span>}
                        {warning==='Используйте хотя бы 8 знаков'&&<div className={styles["length-password"]}>Пароль слишком короткий.</div>}
                        {warning}
                        </div>
                    </div>
            </div>}
            {!passwordInfo&&<div>
                {!warning&&
                    <p className={styles["password-should-be"]}>
                     Пароль должен содержать не менее восьми знаков, включать буквы, цифры и специальные символы
                    </p>
                }
                {warning==='Используйте хотя бы 8 знаков'&&<div className={styles["length-password"]}>Пароль слишком короткий.</div>}
                {warning&&<p className={styles["password-should-be"]}>{warning}</p>}
            </div>} 
            <div className={styles["input-block-step"]}>
                <InputComponent //default input
                    type='password'
                    onChangeInput={checkConfirmPassword}
                    value={confirmPassword}
                    name='confirmPassword'
                    placeholder="Повторите пароль"
                    //     invalid={true}
                    errorText={errorPassword}
                    onBlur={()=>{setErrorPassword(false);onBlurInput()}}
                    onFocus={()=> setIsDisabledButton(true)}
                    //classNamesForInput={styles[errorConfirmPassword]}
                />
            </div>
            {confirmPassword.length!==0 && confirmPassword===checkData['password']&&<div className={styles["confirm-image-block"]}>
                <img src={ELLIPSE_COMPLETE_INPUT} alt="подтверждение пароля" className={styles["confirm-image"]} onClick = {()=>{}}/>
            </div>}
            {!passwordInfo&&errorPassword&& <div className={styles["error-text-block-step"]}><div className={styles["error-text"]}>Пароли должны совпадать</div></div>}
           

            {!showInfoPassword  &&
            passwordInfo&&errorPassword&& <div className={styles["error-empty-password-block"]}>
                 <div className={styles["error-empty-password"]}>
                    <div className={styles["error-empty-password-text"]}>
                        Пароли должны совпадать
                    </div> 
                 </div>
            </div>}

            {/* {!isEmptyInputs&&warning && 
                    <div className={styles["error-text-block-step"]}>
                            <div className={styles["error-text"]}>{warning}</div>
                    </div>
            } */}
            
            <div className={[styles["input-block-step"], styles["checkbox-block"]].join(" ")}>
                <CustomInput
                    type="checkbox"
                    id="exampleCustomCheckbox"
                    required
                    onChange={onChangeCheckbox}
                />

                <p className={styles["i-agree-with-text"]}>Я ознакомлен с <a href={`${config.siteUrl}/upload/jti-ip-personal-data-protection.pdf?${Math.random()}`}  target="_blank" className={styles["agree-link"]}>Политикой</a> в отношении обработки и обеспечения безопасности персональных данных и даю добровольное <a href={`${config.siteUrl}/upload/agreement-employee.pdf?${Math.random()}`} target="_blank" className={styles["agree-link"]}>согласие</a> на обработку персональных данных </p>
            </div>
            {isEmptyInputs&&<div className={styles["error-text-block-step"]}>
                        <div className={styles["error-text"]}>Заполните все поля</div> 
                    </div>
                }
            {/* {!isEmptyInputs&&message&&
                <div className={styles["error-text-block-step"]}>
                     <div className={styles["message-text"]}>{message}</div> 
                </div>
            } */}
            {!isEmptyInputs&&warningCheckbox&& 
                <div className={styles["error-text-block-step"]}>
                    <div className={[styles["error-text"], styles["warning-checkbox-text"]].join(" ")}>{warningCheckbox}</div> 
                </div>
            }
          
            <div className={styles["recapcha-block"]}>
                <ReCAPTCHA
                    className="g-recaptcha"
                    sitekey={SITE_KEY}
                    onChange={onChangeCaptcha}
                 //   size={widthCaptcha}
                    hl="ru"
                />
            </div>
            {recaptchaMessage&& 
             <div className={styles["error-text-block-step"]}>
                    <div className={styles["error-text-recapcha"]}>Подтвердите, что вы не робот</div> 
            </div>
            }
            <div className={styles["button-block-step"]}>
                <MainButton //disable button
                    title='Зарегистрироваться'
                    onClick={() => sendData()}
                    classNamesForButton={styles['styleBut']}
                    disabled={isDisabledButton}
                //disabled={isDisabled}
                />

              
            </div>
           
            <RulesModal showPopup={showPopupHome} setShowPopup={setShowPopupHome}  />
        </>
    )
}


const mapStateToProps = state => ({
    isRegisteredUser: isRegisteredUserSelector(state),
    responseMessage: responseMessageSelector(state),
    isRequest: isRequestAuthSelector(state),
    isConfirmedCode: isConfirmedCodeSelector(state),
    isConfirmedEmailAndCode: isConfirmedEmailAndCodeSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    signUP,
    setResponseMessageUndefined,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegistrationStep2);

