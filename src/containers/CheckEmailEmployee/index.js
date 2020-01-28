import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Container, Row, Col, NavLink } from "reactstrap";
import className from 'classnames';
import { toggleEmailCheckEmpModal } from '../../actions/userActions.js';
import { showEmailCheckEmpModalSelector } from '../../selectors/userSelectors';
import Popup from "../../components/General/PopupWithHeader";
import Input from "../../components/General/InputComponent";
import MainButton from "../../components/General/MainButton";
import styles from "./styles/index.module.scss";

const CheckEmailEmployee = ({showPopup, setShowPopup, showEmailCheckEmpModal, toggleEmailCheckEmpModal }) => {
  return (
    <Popup 
      show={showEmailCheckEmpModal}
      headerTitle="Проверь почту"
      closefunc={() => {toggleEmailCheckEmpModal(false);}}
    >
      <div className={className("main-text",styles["text-body"])}>Мы отправили письмо на твой e-mail для подтверждения</div>
      
    </Popup>
  );
};

const mapStateToProps = state => ({
  showEmailCheckEmpModal: showEmailCheckEmpModalSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleEmailCheckEmpModal
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckEmailEmployee);
