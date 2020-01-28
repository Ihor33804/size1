import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Container, Row, Col, } from "reactstrap";
import { useHistory } from "react-router-dom";
import classnames from "classnames";
import { confirmEmpEmail, setResponseMessageUndefined, setIsConfirmedEmailAndCode, setIsConfirmedEmailAndCodeUndefined, } from '../../actions/authActions';
import { isRequestAuthSelector, responseMessageSelector, isConfirmedEmailSelector, isConfirmedEmailAndCodeSelector, isConfirmedCodeSelector} from '../../selectors/authSelectors';
import { toggleEmailCheckEmpModal} from '../../actions/userActions.js';
import { showEmailCheckEmpModalSelector } from '../../selectors/userSelectors';
import CheckEmailEmployee from '../../containers/CheckEmailEmployee';
import InputComponent from '../../components/General/InputComponent';
import MainButton from '../../components/General/MainButton/';
import RegistrationStep2 from './RegistrationStep2.js';
import styles from "./styles/index.module.scss";


const RegistrationStep1 = ({ checkData,
    setCheckData,
    confirmEmpEmail,
    isRequest,
    responseMessage,
    setResponseMessageUndefined,
    isConfirmedEmail,
    setIsSentCode,
    isSentCode,
    setIsConfirmedEmailAndCode,
    isConfirmedEmailAndCode,
    setIsConfirmedEmailAndCodeUndefined,
    showEmailCheckEmpModal,
    toggleEmailCheckEmpModal,
    isConfirmedCode,
}) => {

    const [errorWorkEmail, setWorkEmail] = useState(''); //если ошибка введенного значения в e-mail input 
    const [isDisabledButtonConfirmEmail, setIsDisabledButtonConfirmEmail] = useState(true); //кнопка подтвердить вначале disabled
    const [isDisabledButtonConfirmCode, setIsDisabledButtonConfirmCode] = useState(true); //кнопка подтвердить вначале disabled
    const [isDisabledStartInputs, setIsDisabledStartInputs] = useState(false); //для того,чтобы после подтверждения е-мейла и кода, эти два инпута стали disabled
    const [code, setCode] = useState("");   //код с е-мейла
    const [errorInputCode, setErrorInputCode] = useState(''); //для подсветки инпута с КОДОМ красным,если введен неправильный код  
    const [warning, setWarning] = useState(''); //для предупреждений, в связи с ошибками введенных данных
    const [warningEmail, setWarningEmail] = useState(''); //для предупреждений, в связи с ошибками введенных данных 
    const [isCompletedInputCode, setIsCompletedInputCode] = useState(false); //"галочка",которая появляется,когда код и е-мейл подтвержден
    const [message, setMessage] = useState(''); //для предупреждения о том,что введенный мейл уже был подтвержден

    const [flag, setFlag] = useState(0); //

    useEffect(() => {
        setIsDisabledStartInputs(false); //
        setIsConfirmedEmailAndCode(false);
        setIsConfirmedEmailAndCodeUndefined();
        setMessage("");
        if (!isRequest && responseMessage && responseMessage.status === 200) { //если код и е-мейл подтвержден
            // setIsDisabled(false); //оставшиеся инпуты становятся доступными
            setIsDisabledStartInputs(true); //делаем инпуты е-мейла и кода недоступными
            //   setIsConfirmedEmpEmail(false); //исчезает кнопка "Подтвердить" в инпуте е-мейл
            setWorkEmail(''); //сбрасываем ошибки (на всякий случай,если ошибки были сделаны до этого)
            setErrorInputCode(""); //сбрасываем ошибка
            setIsConfirmedEmailAndCode(true);
            if(flag!==202)
                alert("Email уже был успешно подтверждён ранее");
            setMessage("Email успешно подтверждён");
        }
        else if (!isRequest && responseMessage && responseMessage.status === 202) {//если на е-мейл успешно отправлен код
            setIsSentCode(true); //отмечаем что код был успешно отправлен
            toggleEmailCheckEmpModal(true); //появляется попап 
            setWorkEmail(''); //сбрасываем ошибки 
            setErrorInputCode(""); //сбрасываем ошибки
            setIsDisabledStartInputs(true); //делаем инпут е-мейла недоступным
            setFlag(202);
        }
        else if (!isRequest && responseMessage && responseMessage === 'Проверочный код был отправлен совсем недавно, попробуйте повторить запрос чуть позже') {//если проверочный код был отправлен совсем недавно
            setWarningEmail("Проверочный код был отправлен совсем недавно, попробуйте повторить запрос чуть позже");
            // setCode("");
            setWorkEmail('');
            setErrorInputCode(""); //сбрасываем ошибки
            setIsDisabledButtonConfirmEmail(true); //блокируем на это время кнопку подтверждения мэйла
            
        }
        else if (!isRequest && responseMessage && responseMessage === 'Неверный проверочный код') {//если Неверный проверочный код
            setWarning("Введен не правильный код");
            setWorkEmail(''); //сбрасываем ошибки инпута е-мейла
            setErrorInputCode("error-input"); //подсвечиваем инпут с кодом - красным бордером

            //   setCode("");
        }
        else if (!isRequest && responseMessage && responseMessage === 'Этот Email уже зарегистрирован') {
            setWarningEmail("Такой пользователь уже зарегистрирован");
            setWorkEmail('error-input'); //устанавливаем,что ошибка допущена в инпуте е-мейла
            setErrorInputCode("");

            //   setCode("");
        }
        else if (!isRequest && responseMessage && responseMessage === 'Укажите свою рабочую почту') {
            setWarningEmail("Укажите свою рабочую почту");
            setWorkEmail('error-input'); //устанавливаем,что ошибка допущена в инпуте е-мейла
            setErrorInputCode("");

            //   setCode("");
        }
        else {
            setWarning("");
            setWarningEmail("");

        }

    }, [responseMessage, isRequest]);

    useEffect(() => { //сбрасываем все данные 
        refreshData();

    }, [])

    const refreshData = () => { //сброс всех значений 
        setIsConfirmedEmailAndCodeUndefined();
        setIsConfirmedEmailAndCode(undefined);
        setIsDisabledStartInputs(false);
        setWorkEmail("");
        setResponseMessageUndefined();
        setIsSentCode(false);
        setErrorInputCode("");
        setIsDisabledButtonConfirmEmail(true);
        setIsDisabledButtonConfirmCode(true);
        setWarning("");
        setWarningEmail("");
        setIsCompletedInputCode(false);
        setMessage("");
        toggleEmailCheckEmpModal(false);
        setFlag(0);
    }
    const emailValidation = email => { //валидация введенного е-мейла
       const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
     // const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@eanok.com$/i;
     
       
        return regex.test(email);
    };

    const checkInput = e => { //ввод значений в поля регистрации
   
        if (e.target.name === "workEmail") {
            setWorkEmail(""); //если после ошибки мейла начинают вводить заново значения в инпут мейла, снимаем красную рамку с инпута

        }
        
        setCheckData({ ...checkData, [e.target.name]: e.target.value });
        
        if(e.target.value.length===0) {
            setIsDisabledButtonConfirmEmail(true);
           
        }
        else {
            setIsDisabledButtonConfirmEmail(false);
         
        }
    }


    const checkInputCode = e => { //ввод значений в input code
        if (e.target.name === "code") {
            e.target.value = e.target.value = e.target.value.replace(/[^0-9\.]/g, '').split(/\./).slice(0, 2).join('.');
        }
       
        let code = e.target.value.trim();
        setCode(code);

        setErrorInputCode("");
       
        if(e.target.value.length===0) {
          
            setIsDisabledButtonConfirmCode(true);
        }
        else {
           
            setIsDisabledButtonConfirmCode(false);
        }
    }

    const onClickAgreeEmailAndCode = () => {
        if (code.length === 4) {
            confirmEmpEmail(checkData["workEmail"], code);
        }
        else {
            setErrorInputCode("error-input"); //подсвечиваем инпут с кодом - красным бордером
            setWarning("Введен не правильный код");
        }
    }
    const onClickAgree = () => { //отправка мейла для получения кода
      
        const { workEmail } = checkData;
        //setCode("");
        const isValidatedEmail = emailValidation(workEmail);
        if (isValidatedEmail) {
            confirmEmpEmail(workEmail);
        }
        

        if (!isValidatedEmail && workEmail.length === 0) {
            setWorkEmail("error-input");
            setWarningEmail("Введите email");
        } else if (!isValidatedEmail) {
            setWorkEmail("error-input");
            setWarningEmail("Почта указана некорректно");
        }
        else {
            setWorkEmail("");
            setWarningEmail("");
        }
    }
 


    return (
        <>

            <div className={styles["step-block"]}>
                <div className={styles["step"]}> шаг 1 </div>
            </div>
            <div className={styles["input-block-step"]}>

                <InputComponent //disable input подтвердить
                    onChangeInput={checkInput}
                    value={checkData['workEmail']}
                    name='workEmail'
                    placeholder="Рабочая почта"
                    classNamesForInput={styles[errorWorkEmail]}
                    disabled={isDisabledStartInputs}
                    onBlur={()=>{!checkData['workEmail']&&setIsDisabledButtonConfirmEmail(true)}}
                //    onFocus={()=>{setIsDisabledButtonConfirmEmail(true)}}
                />

            </div>
            {warningEmail && 
                    <div className={styles["error-text-block-step"]}>
                            <div className={styles["error-text"]}>{warningEmail}</div>
                    </div>
                }
            {!isSentCode && <div className={styles["button-block-step"]}>
                <MainButton //disable button
                    title='Подтвердить'
                    onClick={() => onClickAgree()}
                    classNamesForButton={styles['styleBut']}
                    disabled={isDisabledButtonConfirmEmail}
                />
            </div>}
            {/*isConfirmedEmail - показываем инпут с кодом,толькор если мейл подтвержден*/}
            { isSentCode && 
            <>
                <div className={styles["code-sent"]}> Мы выслали тебе на почту письмо с кодом!</div>
                <InputComponent //disable input подтвердить
                    type="text"
                    onChangeInput={checkInputCode}
                    name='code'
                    value={code}
                    placeholder="Проверочный код"
                    //       complete={isCompletedInputCode}
                    //    disabled={isDisabledStartInputs}
                    classNamesForInput={styles[errorInputCode]}
                    onBlur={()=>{!code&&setIsDisabledButtonConfirmCode(true)}}
                  //  onFocus={()=>{setIsDisabledButtonConfirmCode(true)}}
                />
                {warning && 
                    <div className={styles["error-text-block-step"]}>
                            <div className={styles["error-text"]}>{warning}</div>
                    </div>
                }
                 {/* {message&&
                    <div className={styles["error-text-block-step"]}>
                        <div className={styles["message-text"]}>{message}</div> 
                    </div>
                 } */}
                <div className={styles["button-block-step"]}>
                    <MainButton //disable button
                        title='Продолжить'
                        onClick={() => onClickAgreeEmailAndCode()}
                        classNamesForButton={styles['styleBut']}
                        disabled={isDisabledButtonConfirmCode}
                    />
                </div>
            </>

            }


       <CheckEmailEmployee showPopup={showEmailCheckEmpModal} setShowPopup={toggleEmailCheckEmpModal} />
        </>
    )
}


const mapStateToProps = state => ({
    responseMessage: responseMessageSelector(state),
    isRequest: isRequestAuthSelector(state),
    isConfirmedEmail: isConfirmedEmailSelector(state),
    isConfirmedEmailAndCode: isConfirmedEmailAndCodeSelector(state),
    isConfirmedCode: isConfirmedCodeSelector(state),
    showEmailCheckEmpModal: showEmailCheckEmpModalSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    confirmEmpEmail,
    setResponseMessageUndefined,
    setIsConfirmedEmailAndCode,
    setIsConfirmedEmailAndCodeUndefined,
    toggleEmailCheckEmpModal,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegistrationStep1);

