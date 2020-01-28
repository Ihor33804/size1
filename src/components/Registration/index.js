import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col, Label, Input, CustomInput } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { useHistory } from 'react-router-dom';
import ReactPasswordStrength from 'react-password-strength';
import * as keys from "../../routers/keys";
import { signUP , setEmpEmailUndefined, setRegisteredUserUndefined, setResponseMessageUndefined, } from '../../actions/authActions';
import { userRegisterDataSelector, isConfirmedEmailSelector, responseMessageSelector, isRequestAuthSelector, isRegisteredUserSelector, nameSelector, } from '../../selectors/authSelectors';
import styles from './styles/index.module.scss';
import CheckEmailEmployee from '../../containers/CheckEmailEmployee';
import MainButton from '../../components/General/MainButton/';
import InputComponent from '../../components/General/InputComponent';
import { confirmEmpEmail } from '../../actions/authActions';
import { toggleEmailCheckEmpModal, setLg } from '../../actions/userActions.js';
import { showEmailCheckEmpModalSelector, lgSelector, } from '../../selectors/userSelectors';

const Registration = ({ signUP, 
                        userRegisterData, 
                        confirmEmpEmail, 
                        isConfirmedEmail,
                        setEmpEmailUndefined,
                        responseMessage, 
                        setResponseMessageUndefined, 
                        isRequest, 
                        isRegisteredUser, 
                        toggleEmailCheckEmpModal,
                        setRegisteredUserUndefined, 
                        showEmailCheckEmpModal,
                        name,
                        ...props}) => {

    const history = useHistory();
    const styleInput = {
  
    };

    const [checkData, setCheckData] = useState({ //объект с регистрационными данными
        workEmail: '',
        password: '',
        name: '',
        surname: '',
       // position: '',
    //    city: '',
    });

    const [confirmPassword, setConfirmPassword] = useState(""); //пароль для подтверждения
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(''); //класс для подсветки красным,в случае ошибки подтверждения пароля
    const [checkbox, setCheckbox] = useState(false);   //чекбокс для подтверждения согласия
    const [code, setCode] = useState("");   //код с е-мейла
    const [isSentCode, setIsSentCode] = useState(false); //для проверки был ли отправлен код на е-мейл
    const [isCompletedInputCode, setIsCompletedInputCode] = useState(false); //"галочка",которая появляется,когда код и е-мейл подтвержден
    const [errorInputCode, setErrorInputCode] = useState(''); //для подсветки инпута с КОДОМ красным,если введен неправильный код  
    const [isConfirmedEmpEmail, setIsConfirmedEmpEmail] = useState(true); //кнопка "подтвердить" в инпуте е-мейла
    const [errorPassword, setErrorPassword] = useState(''); //если ошибка введенного значения в password input 
    const [errorWorkEmail, setWorkEmail] = useState(''); //если ошибка введенного значения в e-mail input 
    const [isEmptyInputs, setIsEmptyInputs] = useState(undefined); //для проверки не пустые ли поля 
    const [isDisabled, setIsDisabled] = useState(true); //для того,чтобы все инпуты,кроме двух первых (е-мейла и кода) были disabled до того,как  юзер подтвердит свой е-мейл
    const [isDisabledStartInputs, setIsDisabledStartInputs] = useState(false); //для того,чтобы после подтверждения е-мейла и кода, эти два инпута стали disabled
    const [isDisabledButtonConfirmEmail, setIsDisabledButtonConfirmEmail] = useState(true); //кнопка подтвердить вначале disabled
    const [lg, setLg] = useState('12'); //для того,чтобы в первоначальном виде инпут с е-мейлом был на всю ширину блока, а после ввода мейла, стал по ширине на половину блока
    const [warning, setWarning] = useState(''); //для предупреждений, в связи с ошибками введенных данных (отображается между чекбоксом и кнопкой "Зарегистрироваться")
    const [showButtonConfirm, setShowButtonConfirm] = useState(true); //отвечает за вывод/исчезновения кнопки Подтвердить в зависимости от того был ли уже подтвержден мейл
    const [isValidPassword, setIsValidPassword] = useState(undefined);


    

    const emailValidation = email => { //валидация введенного е-мейла
        const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return regex.test(email);
      };

    useEffect(()=>{ //сбрасываем все данные 
        refreshData();
        
    },[])

 
    const refreshData = () => { //сброс всех значений 
        setEmpEmailUndefined(); 
        setIsDisabledStartInputs(false); 
        setWorkEmail("");
        setErrorConfirmPassword("");
        setIsDisabled(true);
        setIsEmptyInputs(undefined);
        setIsCompletedInputCode(false);
        setRegisteredUserUndefined();
        setResponseMessageUndefined();
        setLg('12');
        toggleEmailCheckEmpModal(false);
        setIsSentCode(false);
        setIsConfirmedEmpEmail(true);
        setWarning("");
        setErrorInputCode("");
        setShowButtonConfirm(true);
        setIsDisabledButtonConfirmEmail(true);
        setIsValidPassword(undefined);
      //  setMessage("");
       // setShowEmailCheckEmpModal(false);
    }

    useEffect(()=>{ 
        if(isRegisteredUser) { //если пользователь успешно зарегистрировался
            history.replace(keys.MY_ACCOUNT); //перенаправляем его на страницу профиля
            refreshData(); //скидываем все данные
        }
  
    },[isRegisteredUser])




    useEffect(()=>{ 
        setIsDisabled(true); //
        setIsDisabledStartInputs(false); //
        setIsCompletedInputCode(false); //
        if(!isRequest&&responseMessage&&responseMessage.status===200) { //если код и е-мейл подтвержден
            setIsDisabled(false); //оставшиеся инпуты становятся доступными
            setIsCompletedInputCode(true); //ставим галочку в инпуте кода
            setIsDisabledStartInputs(true); //делаем инпуты е-мейла и кода недоступными
            setIsConfirmedEmpEmail(false); //исчезает кнопка "Подтвердить" в инпуте е-мейл
            setWorkEmail(''); //сбрасываем ошибки (на всякий случай,если ошибки были сделаны до этого)
            setErrorInputCode(""); //сбрасываем ошибка
           // setCode("Код подтвержден");  
            //setMessage("E-mail уже подтвержден");
       }
       else if(!isRequest&&responseMessage&&responseMessage.status===202)  {//если на е-мейл успешно отправлен код
            toggleEmailCheckEmpModal(true); //появляется попап 
            setIsSentCode(true); //отмечаем что код был успешно отправлен
            setWorkEmail(''); //сбрасываем ошибки 
            setErrorInputCode(""); //сбрасываем ошибки
           // setLg("6"); //появляется инпут с кодом
       }
       else if(!isRequest&&responseMessage&&responseMessage==='Проверочный код был отправлен совсем недавно, попробуйте повторить запрос чуть позже')  {//если проверочный код был отправлен совсем недавно
            setWarning("Проверочный код был отправлен совсем недавно, попробуйте повторить запрос чуть позже");
           // setCode("");
           setWorkEmail('');
            setErrorInputCode(""); //сбрасываем ошибки
            setIsDisabledButtonConfirmEmail(true); //блокируем на это время кнопку подтверждения мэйла
        }
        else if(!isRequest&&responseMessage&&responseMessage==='Неверный проверочный код')  {//если Неверный проверочный код
            setWarning("Неверный проверочный код");
            setWorkEmail(''); //сбрасываем ошибки инпута е-мейла
            setErrorInputCode("error-input"); //подсвечиваем инпут с кодом - красным бордером
           
         //   setCode("");
        }
        else if(!isRequest&&responseMessage&&responseMessage==='Этот Email уже зарегистрирован')  {
            setWarning("Такой пользователь уже зарегистрирован");
            setWorkEmail('error-input'); //устанавливаем,что ошибка допущена в инпуте е-мейла
            setErrorInputCode(""); 
        
         //   setCode("");
        }
       else {
            setWarning("");

       }
      
    },[responseMessage, isRequest])

//responseMessage, isRequest, setIsDisabled, setIsCompletedInputCode, setIsDisabledStartInputs, setShowEmailCheckEmpModal,
    useEffect(() => {
      
       if(isConfirmedEmail===false) { //если почта указана неверно, инпут становится красным
         //   setWorkEmail("error-input");
         setErrorInputCode("");
         setShowButtonConfirm(true);
         setLg("12"); //
       }
       else if(isConfirmedEmail===true){ //если почта был выслан код
           setShowButtonConfirm(false);
           setLg("6"); //появляется инпут с кодом
       } 
       else if(isConfirmedEmail===undefined) {
          setWorkEmail("");
          setShowButtonConfirm(true);
          setLg("12"); //
       }

    }, [isConfirmedEmail,setWorkEmail,setLg]);

    const checkInput = e => { //ввод значений в поля регистрации
        if(e.target.name==="workEmail") {
            setWorkEmail(""); //если после ошибки мейла начинают вводить заново значения в инпут мейла, снимаем красную рамку с инпута
        }

        setCheckData({ ...checkData, [e.target.name]: e.target.value });
        setIsDisabledButtonConfirmEmail(false);
    }
    
   
    const checkInputCode = e => { //ввод значений в input code
     
        let code = e.target.value.trim();
        setCode(code);
        if (code.length === 4) {  
            confirmEmpEmail(checkData["workEmail"],code);
        }
  
        setErrorInputCode("");
    }
    const checkConfirmPassword = e => { //ввод пароля для подтверждения
        setConfirmPassword(e.target.value );
        setErrorConfirmPassword(""); //если после ошибки в подтверждении пароля начинают вводить заново значения в инпут , снимаем красную рамку с инпута
        setErrorPassword("");
    }
    const onChangeCheckbox = e => { //отметка чекбокса     
        setCheckbox(!checkbox);
    }
    const comparePasswords = () => { //проверка совпадают ли пароли
        if(confirmPassword===checkData["password"]) {
            setErrorPassword("");
            return true;
        }
        else {
            setErrorConfirmPassword("error-input");
            setErrorPassword("Пароли должны совпадать");
            return false;
        }
    } 

    const onClickAgree = () => { //отправка мейла для получения кода
        const { workEmail } = checkData;
        setCode("");
        const isValidatedEmail= emailValidation(workEmail);
        if(isValidatedEmail) {
            confirmEmpEmail(workEmail);
        }

        if(!isValidatedEmail) {
           setWorkEmail("error-input");
        }
        else  {
           setWorkEmail("");
        }
    }
  
    const sendData = () => { //отправка данных для регистрации
        let isCompleted=true;
        let isValidedSpecialSymbol=false;
        let isCheckedPasswords=false;

        Object.values(checkData).map((item,index) => { //проверяем заполнены ли все поля
            if(item.length===0)   {
                // if(isConfirmedEmpEmail&&index===0) {
                //     index++;
                // }
                isCompleted=false;
            }

        });
        isValidedSpecialSymbol = validSpecialSymbol(checkData["password"]);
        isCheckedPasswords = comparePasswords(); //проверяем совпадают ли пароли


        if(!isCompleted)
            setIsEmptyInputs(true);
        else 
            setIsEmptyInputs(false);

        if(checkbox===false) {
            setWarning("Подтвердите согласие на обработку своих персональных данных");
        }
     

        if(checkbox&&isCompleted&&isCheckedPasswords&&checkData&&isValidedSpecialSymbol) { //&&isValidPassword
            signUP(checkData["workEmail"],checkData["password"],checkData["name"]+" "+checkData["surname"],"noname","noname" );
        }
       
    }
    const getLg = () => {
        return lg;
    }
   
    const validSpecialSymbol = str => {
     
        let password_str = str.toString();
        if(password_str.length>=8) { //если длина пароля минимум 8 символов
            setWarning("");
            let capitalLetters = /[A-ZА-Я]+/.test(str);
          
            if(capitalLetters) { //если в пароле есть заглавные буквы
                setWarning("");
                let letters = /[a-zа-я]+/.test(str);
                if(letters) { //если в пароле есть строчные буквы
                    setWarning("");
                    let digits = /[0-9]+/.test(str);
                    if(digits) { //если в пароле есть цифры
                        setWarning("");
                        //let special_symbols = /\W+/.test(str); 
                        let special_symbols = /@+|:+|,+|'+|"+|;+|-+|_+|=+|<+|>+|%+|#+|~+|`+|&+|!+|\/+|\$+|\^+|\.+|\*+|\{+|\}+|\[+|\]+|\(+|\)+|\|+|\++/.test(str); 
                        // 
                        if(special_symbols) { //если в пароле есть не алфавитно-цифровой символы
                            setWarning("");
                            return true;
                        }
                        else {
                            setWarning("В пароле должен находится минимум один не алфавитно-цифровой символ");
                        }
                    }
                    else {
                        setWarning("В пароле должна находится минимум одна цифра");
                    }
                }
                else {
                    setWarning("В пароле должна находится минимум одна строчная буква");
                }
            }
            else {
                setWarning("В пароле должна находится минимум одна заглавная буква");
            }
         
        }
        else {
            setWarning("Пароль должен состоять не менее, чем из 8 символов");
           
        }
       // const validation = '^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/';

      return false; //
    }

    const checkInputPassword = (score, password, isValid ) => { //записываем пароль
       setIsValidPassword(score.isValid);
       setCheckData({ ...checkData, ['password']: score.password });

    }
    return (

        <div className={styles["registration"]} >
       
            <Row>
                <Col xs="12" sm="12" md="12" lg="7">
                    <div className={styles["note"]} >Регистрируйся и приглашай друзей </div>
                    <div className={styles["title"]} >Подтверди свою рабочую почту и заполни простую форму, чтобы закончить регистрацию. </div>
 

                    <Row>
                        <Col xs="12" className={styles["step-block"]}>
                           <div className={styles["step"]}> шаг 1 </div>
                        </Col>
                        <Col xs="12" sm="12" md={getLg()} lg={getLg()} className={styles["input-block"]}>
                            <InputComponent //disable input подтвердить
                                onChangeInput={checkInput} 
                                value={checkData['workEmail']}  
                                name='workEmail'
                                placeholder="Рабочая почта"    
                                style={styleInput}
                                onClickAgree={onClickAgree}
                                confirm={isConfirmedEmpEmail}   
                                classNamesForInput={styles[errorWorkEmail]}
                                disabled={isDisabledStartInputs}
                            />
                     
                        </Col>
                        {showButtonConfirm && <Col xs="12" sm="12" md="4" lg="5">
                             <MainButton //disable button
                                title='Подтвердить'                               
                                onClick={()=>onClickAgree()}
                                classNamesForButton={styles['styleBut']}
                                disabled={isDisabledButtonConfirmEmail}
                            />
                        </Col>}
                     
                    {/*isConfirmedEmail - показываем инпут с кодом,толькор если мейл подтвержден*/}
                        {(isConfirmedEmail&&isSentCode)&&(<Col xs="12" sm="12" md="6" lg={lg} className={styles["input-block"]}>
                            <InputComponent //disable input подтвердить
                                type="number"
                                onChangeInput={checkInputCode}  
                                name='code'
                                value={code}
                                placeholder="Проверочный код"    
                                style={styleInput}
                                complete={isCompletedInputCode}
                                disabled={isDisabledStartInputs}
                                classNamesForInput={styles[errorInputCode]}
                            />
                       
                        </Col>)}
                        
                        <Col xs="12" className={styles["step-block-second"]}>
                           <div className={styles["step"]}> шаг 2 </div>
                        </Col>
                        {/* <Col xs="12" sm="12" md="6" lg="6" className={styles["input-block"]}>
                            <ReactPasswordStrength    
                                minLength={8}
                                minScore={1}
                                scoreWords={['слабый', 'средний', 'нормальный', 'надежный', 'очень надежный']}
                                tooShortWord='слишком короткий'           
                                inputProps={{  placeholder: "Пароль",disabled: isDisabled, className: styles["input-password"], name: 'password', autoFocus: false, value: checkData['password']}}
                                changeCallback={checkInputPassword}
                            />
                        </Col> */}
                        <Col xs="12" sm="12" md="6" lg="6" className={styles["input-block"]}>
                            <InputComponent //default input
                                type='password'
                                onChangeInput={checkInput} 
                                value={checkData['password']}
                                name='password'
                                placeholder="Пароль"
                                style={styleInput}
                                disabled={isDisabled}
                                errorText={errorPassword}
                               // classNamesForInput={styles[errorConfirmPassword]}
                            />
                        </Col>
                        <Col xs="12" sm="12" md="6" lg="6" className={styles["input-block"]}>
                            <InputComponent //default input
                                type='password'
                                onChangeInput={checkConfirmPassword}
                                value={confirmPassword}
                                name='confirmPassword'
                                placeholder="Повторите пароль"
                                style={styleInput}
                                disabled={isDisabled}
                                invalid={true}
                                errorText={errorPassword}
                                classNamesForInput={styles[errorConfirmPassword]}
                            />
                        </Col>
                        <Col xs="12" sm="12" md="6" lg="6" className={styles["input-block"]}>
                            <InputComponent //default input
                                onChangeInput={checkInput} 
                                value={checkData['name']}
                                name='name'
                                placeholder="Имя"
                                style={styleInput}
                                disabled={isDisabled}
                            />
                        </Col>
                        <Col xs="12" sm="12" md="6" lg="6" className={styles["input-block"]}>
                            <InputComponent //default input
                                onChangeInput={checkInput} 
                                value={checkData['surname']}
                                name='surname'
                                placeholder="Фамилия"
                                style={styleInput}
                                disabled={isDisabled}
                            />
                        </Col>
                      
                        <Col xs="12" sm="12" md="12" lg="12" className={styles["input-block"]}>
                            <CustomInput 
                                type="checkbox" 
                                id="exampleCustomCheckbox" 
                                label="  Даю согласие на обработку своих персональных данных" 
                                required
                                onChange={onChangeCheckbox} 
                                
                            />
                        </Col>
                        <Col xs="12">
                        {isEmptyInputs&&<div className={styles["error-text"]}>Заполните все поля</div>}
                        {!isEmptyInputs&&warning&&<div className={styles["error-text"]}>{warning}</div>}
                       </Col>
                        <Col xs="12" sm="12" md="4" lg="5" className={styles["button-block"]}>
                            <MainButton //disable button
                                // route={'/my_account'}
                                title='Зарегистрироваться'                               
                                onClick={()=>sendData()}
                                classNamesForButton={styles['styleBut']}
                                disabled={isDisabled}
                            />
                        </Col>


                    </Row>

                </Col>
                <Col xs="12" sm="12" md="12" lg="5">
                     <div className={styles["image-block-background"]}></div>
              
                </Col>
            </Row> 
            <CheckEmailEmployee showPopup={showEmailCheckEmpModal} setShowPopup={toggleEmailCheckEmpModal} />
        </div>
    );

}

const mapStateToProps = (state) => ({
    userRegisterData: userRegisterDataSelector(state),
    isConfirmedEmail: isConfirmedEmailSelector(state),
    responseMessage: responseMessageSelector(state),
    isRequest: isRequestAuthSelector(state),
    isRegisteredUser: isRegisteredUserSelector(state),
    showEmailCheckEmpModal: showEmailCheckEmpModalSelector(state),
    name: nameSelector(state),
    lg: lgSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(
    { 
        signUP,
        confirmEmpEmail,
        setEmpEmailUndefined,
        setRegisteredUserUndefined,
        setResponseMessageUndefined,
        toggleEmailCheckEmpModal,
        setLg,
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
