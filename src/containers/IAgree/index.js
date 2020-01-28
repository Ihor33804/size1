import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import className from "classnames";
// import { Container, Row, Col, NavLink } from "reactstrap";

import { useHistory, useLocation, useParams } from "react-router-dom";
import ContainerForMessage from "../../components/General/ContainerForMessage";
// import Input from "../../components/General/InputComponent";
import * as keys from "../../routers/keys";
import MainButton from "../../components/General/MainButton";
import styles from "./styles/index.module.scss";

const yesButton = {
  backgroundColor: "#131313!important",
  width: "100%",
  borderRadius: 0,
  marginRight: "30px"
};

const noButton = {
  border: "1px solid #131313",
  boxSizing: "border-box",
  background: "rgb(255, 255, 255)!important",
  // backgroundColor: "#ffffff",
  backgroundColor: "rgb(255, 255, 255)!important",
  width: "100%",
  color: "#000000",
  borderRadius: 0
};

const IAgree = () => {
  let history = useHistory();
  let params = useParams();

  return (
    <ContainerForMessage>
      <div className={styles["agreement"]}>
      <p className={className("main-text", styles["text-align"])}>
        Я подтверждаю, что мне исполнилось{" "}
        <span className={styles["span-text"]}>18 или более лет</span>, и я
        являюсь потребителем никотиносодержащей продукции.
      </p>
      <div className={styles["main-button-container"]}>
        <MainButton
          title="Да"
          onClick={()=>history.replace(`/registration_friend_employee/${params.code}`)}
          classNamesForButton={styles["yes-button"]}
        />
        <a href="https://www.google.ru">
          <MainButton title="Нет"
           classNamesForButton={styles["no-button"]} 
           />
        </a>
      </div>
      </div>
    </ContainerForMessage>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IAgree);
