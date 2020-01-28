import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import classnames from "classnames";

import ContainerForFriendsPage from "../../../components/General/ContainerForFriendsPage";
import Promocode from "../../../containers/Promocode";
import styles from "./styles/index.module.scss";

const RegistrationFriend = ({ ...props }) => {
  return (<ContainerForFriendsPage>
    <Promocode />
  </ContainerForFriendsPage>);
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationFriend);
