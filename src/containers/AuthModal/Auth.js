import React, { useState, useEffect, useLayoutEffec, useRef } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink, Form } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import classnames from 'classnames';
import {
	signInFinishedSelector,
	signInFinishedErrorSelector,
	isRequestAuthSelector
} from '../../selectors/authSelectors';
import { setIsResetPassword } from '../../actions/userActions';
import { isResetPasswordSelector } from '../../selectors/userSelectors';
import { clearSignInFinished } from '../../actions/authActions';
import Popup from '../../components/General/PopupWithHeader';
import Input from '../../components/General/InputComponent';
import MainButton from '../../components/General/MainButton';
import { auth } from '../../actions/authActions';
import * as keys from '../../routers/keys';
import styles from './styles/index.module.scss';
import './styles/index.scss';
import { SHOW_PASSWORD, EYE } from '../../styles/images.js';

const Auth = ({
	auth,
	showPopup,
	isRequest,
	setShowPopup,
	clearSignInFinished,
	signInFinishedError,
	signInFinished,
	showRestorePasswordEmail,
	isResetPassword,
	setIsResetPassword
}) => {
	const history = useHistory();
	// const [showPopup, setShowPopup] = useState(true);
	const [personalMail, setPersonalMail] = useState('');
	const [password, setPassword] = useState('');
	const [invalidEmail, setInvalidEmail] = useState(false);
	const [invalidPassword, setInvalidPassword] = useState(false);
	const [invalidEmailText, setInvalidEmailText] = useState(false);
	const [invalidPasswordText, setInvalidPasswordText] = useState(false);
	const [disabledBut, setDisabledBut] = useState(true);
	const [warning, setWarning] = useState('');
	const [recaptchaValue, setRecaptchaValue] = useState('');
	const [recaptchaMessage, setRecaptchaMessage] = useState(false);
	const [showImagePassword, setShowImagePassword] = useState('password'); //показ-скрытие пароля по клике на иконку;
	const [imageIconPassword, setImageIconPassword] = useState(SHOW_PASSWORD);

	const SITE_KEY = '6LeoLcEUAAAAACjXuvYLDxFnn-aFQ3WU8Ab13E_L';

	const emailValidation = (email) => {
		const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		return regex.test(email);
	};

	const enter = () => {
		const isEmailValid = emailValidation(personalMail);
		const isPasswordValid = password.length === 0 ? false : true;
		if (isEmailValid && isPasswordValid && recaptchaValue) {
			clearErrors();
			send();
			setDisabledBut(true);
		} else {
			if (!isEmailValid) {
				setInvalidEmail(true);
				setInvalidEmailText('Email неверный');
			} else {
				setInvalidEmail(false);
			}
			if (!isPasswordValid) {
				setInvalidPassword(true);
				setInvalidPasswordText('Пароль не может быть пустым');
			} else {
				setInvalidPassword(false);
			}
		}

		if (!recaptchaValue) {
			setRecaptchaMessage(true);
		} else {
			setRecaptchaMessage(false);
		}
	};

	const clearErrors = () => {
		setInvalidEmail(false);
		setInvalidPassword(false);
		setInvalidPasswordText('');
		setInvalidEmailText('');
		setRecaptchaMessage(false);
		setImageIconPassword(SHOW_PASSWORD);
	};

	const forgotPasswordClick = () => {
		setIsResetPassword(true);
	};

	const send = () => {
		//send data
		if (recaptchaValue) auth(personalMail, password, recaptchaValue);
	};

	const onChangeCaptcha = (value) => {
		onBlurInput();
		setRecaptchaValue(value);
	};

	const toggleImagePassword = () => {
		if (showImagePassword === 'password') {
			setShowImagePassword('text');
			setImageIconPassword(EYE);
		} else if (showImagePassword === 'text') {
			setShowImagePassword('password');
			setImageIconPassword(SHOW_PASSWORD);
		}
	};

	// useEffect(() => {
	//   if (signInFinished) {
	//     history.push(keys.MY_ACCOUNT);
	//     clearSignInFinished();

	//   } else if (signInFinished === false) {
	//     setInvalidEmail(true);
	//     setInvalidEmailText(signInFinishedError);
	//    }
	//  else {
	//     setInvalidEmail(false);
	//     setInvalidEmailText(false);

	//   }
	// }, [signInFinished, history, signInFinishedError, clearSignInFinished])

	useEffect(
		() => {
			// alert(signInFinished);
			// alert(signInFinishedError);
			//setWarning("");

			if (personalMail.length !== 0 && password.length !== 0 && recaptchaValue) {
				setDisabledBut(false);
			}

			clearSignInFinished();
			if (!isRequest && signInFinished) {
				window.dataLayer.push({
					"event": "custom_event",
					"category": "Logic For You Identification",
					"action": "Authorisation",
					"label": "User authorised"

				});

				history.push(keys.MAIN_PAGE);
				setWarning('');
			}
			if (signInFinishedError && signInFinished === false) {
				setWarning('Неверный email и/или пароль');
				resetCaptcha();
			} else {
				// setWarning("");
			}
		},
		[signInFinished, signInFinishedError, history, clearSignInFinished, personalMail, password, recaptchaValue]
	);

	const onBlurInput = (e) => {
		if (personalMail && password && recaptchaValue) {
			setDisabledBut(false);
		} else {
			setDisabledBut(true);
		}
	};

	const emailStyle = {
		height: '60px'
	};

	const passwordStyle = {
		height: '60px'
	};

	const mainButtonStyle = {
		backgroudColor: '#7F7D80!important'
	};
	const inputTmp = {
		opacity: '0',
		position: 'absolute'
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
	}

	return (
		<div>
			<div className={styles['email-container']}>
				{/* <input style={inputTmp}/> */}
				<Input
					type="email"
					placeholder="Рабочая почта"
					name="email"
					style={emailStyle}
					required
					onFocus={() => {
						setInvalidEmail(false);
						setInvalidEmailText('');
						setDisabledBut(true);
					}}
					onChangeInput={(e) => setPersonalMail(e.target.value)}
					value={personalMail}
					invalid={invalidEmail}
					errorText={invalidEmailText}
					onBlur={() => {
						onBlurInput();
					}}
					autoСomplete="off"
				/>
			</div>
			<div className={'show-password-image-block-auth'}>
				<img
					src={imageIconPassword}
					alt="пароль"
					className={classnames(
						{ 'show-password-image-auth ': showImagePassword === 'password' },
						{ 'show-password-image-text-auth': showImagePassword === 'text' }
					)}
					onClick={() => {
						toggleImagePassword();
					}}
				/>
			</div>
			<div className={styles['phone-container']}>
				<Input
					type={showImagePassword}
					placeholder="Пароль"
					name="password"
					style={passwordStyle}
					required
					onFocus={() => {
						setInvalidPassword(false);
						setInvalidPasswordText('');
						setDisabledBut(true);
					}}
					onBlur={() => {
						onBlurInput();
					}}
					// onBlur = {()=>{
					//   setDisabledBut(false);
					// }}
					onChangeInput={(e) => setPassword(e.target.value)}
					value={password}
					invalid={invalidPassword}
					errorText={invalidPasswordText}
					autoСomplete="off"
				/>
			</div>


			{warning && (
				<div className={styles['warning-block']}>
					<div className={styles['warning']}>{warning}</div>
				</div>
			)}
			<div className={styles['recapcha-block']}>
				<ReCAPTCHA
					ref={(r) => setCaptchaRef(r)}
					className="g-recaptcha_auth"
					sitekey={SITE_KEY}
					onChange={onChangeCaptcha}
					hl="ru"
				// size={widthCaptcha}
				/>
			</div>

			{recaptchaMessage && (
				<div className={styles['error-text-block-step']}>
					<div className={styles['error-text-recapcha']}>Подтвердите, что вы не робот</div>
				</div>
			)}
			<MainButton title="Войти" disabled={disabledBut} onClick={enter} classNamesForButton={styles['styleBut']} />
			<NavLink href="#" onClick={forgotPasswordClick} className={styles['forgot-password']}>
				Забыли пароль?
			</NavLink>
		</div>
	);
};

const mapStateToProps = (state) => ({
	signInFinished: signInFinishedSelector(state),
	signInFinishedError: signInFinishedErrorSelector(state),
	isRequest: isRequestAuthSelector(state)
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			auth,
			clearSignInFinished,
			setIsResetPassword
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
