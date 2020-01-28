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

const CopyToClipBoard = ({showPopup, setShowPopup}) => {
  return (
    <Popup 
      show={showPopup}
      headerTitle="Ссылка скопирована"
      closefunc={() => {setShowPopup(false);}}
    >

      <p className={className("main-text",styles["text-body"])}>Вы можете отправить эту ссылку другу  </p>
      
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
)(CopyToClipBoard);
