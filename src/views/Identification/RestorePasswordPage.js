import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Container, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, } from "reactstrap";
import { useHistory } from "react-router-dom";
import classnames from "classnames";
import { setIsConfirmedEmailAndCode, setIsConfirmedEmailAndCodeUndefined } from '../../actions/authActions';
import { setIsResetPassword, } from '../../actions/userActions';
import { isConfirmedEmailSelector, isConfirmedEmailAndCodeSelector, } from '../../selectors/authSelectors';
import { isResetPasswordSelector, } from '../../selectors/userSelectors';
import styles from "./styles/index.module.scss";
import "./styles/index.scss";
import * as keys from "../../routers/keys";
import RegistrationStep1 from "../../components/Registration/RegistrationStep1.js";
import RegistrationStep2 from '../../components/Registration/RegistrationStep2.js';
import Auth from '../../containers/AuthModal/Auth.js';
import RestoreEmail from '../../containers/RestoreEmailModal/RestoreEmail.js';
import RestorePassword from '../../containers/RestorePasswordModal/RestorePassword.js';
const Identification = ({ }) => {



    return (
        <div className={styles["identification"]}>
    
                <Row>

                  <Col xs="12" sm="12" md="9" lg="5" className={styles["identification-content"]}>
                        <div className={styles["title"]}> Восстановление пароля </div>
                                 <Row>
                                    <Col xs="12" md="10">
                                        <RestorePassword/>
                                    </Col>
                                 </Row>
                    </Col>
                   

                    
                   
                </Row>
       
        </div>
    )
}


const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Identification);

