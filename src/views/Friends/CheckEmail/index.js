import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import classnames from "classnames";
import styles from "./styles/index.module.scss";
import ContainerForFriendsPage from "../../../components/General/ContainerForFriendsPage";
import CheckEmail from "../../../containers/CheckEmail";

const IAgreeWithRules = ({ ...props }) => {
  return (
    <ContainerForFriendsPage>
      <CheckEmail/>
    </ContainerForFriendsPage>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IAgreeWithRules);
