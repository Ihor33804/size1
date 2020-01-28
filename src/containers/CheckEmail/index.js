import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import className from 'classnames';
import ContainerForMessage from "../../components/General/ContainerForMessage";
import styles from "./styles/index.module.scss";

const checkEmailHeaderText = "Проверь почту";
const checkEmailBodyText = "Мы отправили тебе на почту письмо с промокодом и дальнейшей инструкцией";

const IAgree = () => {

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
)(IAgree);
