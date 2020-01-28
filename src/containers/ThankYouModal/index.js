import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import className from 'classnames';
import ContainerForMessage from "../../components/General/ContainerForMessage";
import styles from "./styles/index.module.scss";

const checkEmailHeaderText = "Спасибо!";
const checkEmailBodyText = "На вашу почту отправлено письмо со ссылкой на восстановление пароля";

const ThankYouModal = () => {

  return <ContainerForMessage>
    <div className={styles["check-email-popup"]}>
     <p className={className("main-text",styles["header"])}>{checkEmailHeaderText}</p>
     <p className={className("main-text",styles["body"])}>{checkEmailBodyText}</p>
    </div>

  </ContainerForMessage>;
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThankYouModal);
