import React, { useState, useEffect, useLayoutEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Container, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, } from "reactstrap";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router";
import classnames from "classnames";
import { setIsConfirmedEmailAndCode, setIsConfirmedEmailAndCodeUndefined, toggleActiveTabIdentification, } from '../../actions/authActions';
import { setIsResetPassword, } from '../../actions/userActions';
import { isConfirmedEmailSelector, isConfirmedEmailAndCodeSelector, nameSelector, activeTabIdentificationSelector } from '../../selectors/authSelectors';
import { isResetPasswordSelector, } from '../../selectors/userSelectors';
import styles from "./styles/index.module.scss";
import "./styles/index.scss";
import * as keys from "../../routers/keys";
import RegistrationStep1 from "../../components/Registration/RegistrationStep1.js";
import RegistrationStep2 from '../../components/Registration/RegistrationStep2.js';
import Auth from '../../containers/AuthModal/Auth.js';
import RestoreEmail from '../../containers/RestoreEmailModal/RestoreEmail.js';


function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }

const Identification = ({   isConfirmedEmail, 
                            isResetPassword, 
                            isConfirmedEmailAndCode,
                            setIsConfirmedEmailAndCode , 
                            setIsConfirmedEmailAndCodeUndefined, 
                            name, 
                            activeTabIdentification,
                            toggleActiveTabIdentification
                        }) => {

    const history = useHistory();
    const [height] = useWindowSize();
    const heightPage = (height >= 1200) ? "height-lg" : "height-sm";   
               
   // const [heightPage, setHeightPage] =  useState("height: 1000px;");  

    const [checkData, setCheckData] = useState({ //объект с регистрационными данными
        workEmail: '',
        password: '',
        name: '',
    });

    
    useEffect(() => {
        setIsConfirmedEmailAndCode(undefined);
        setIsConfirmedEmailAndCodeUndefined();
        toggleActiveTabIdentification('1');
        if(name) {
            history.push(keys.MAIN_PAGE);
        }

        
    }, []);

   // const [activeTab, setActiveTab] = useState("1");
    const [isSentCode, setIsSentCode] = useState(false); //для проверки был ли отправлен код на е-мейл
   // const [isResetPassword, setIsResetPassword] = useState(false);
    const toggle = (tab) => {  //переключение вкладок

        if (activeTabIdentification !== tab) {
            toggleActiveTabIdentification(tab);
        }
    }

    
    return (
        <div className={styles["identification"]}>
    
                <Row>
                
                   {!isResetPassword&& <Col xs="12" sm="12" md="9" lg="5" className={[styles["identification-content"], heightPage].join(" ")}>
                        {/* <div className={styles["title"]}> Добро пожаловать на сайт <span  className={styles["title-row-sm"]}>амбассадоров!</span></div> */}
                        <div className={styles["title"]}> Добро пожаловать <span  className={styles["title-row"]}>на сайт</span> амбассадоров!</div>
                        <div className="identification-tabs">
                            <Nav tabs >
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: activeTabIdentification === '1' }, styles['navlink-style-point'])}
                                        onClick={() => { toggle('1'); }}
                                    >
                                        Вход
                                </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: activeTabIdentification === '2' })}
                                        onClick={() => { toggle('2'); }}
                                    >
                                        Регистрация

                                </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={activeTabIdentification}>
                                <TabPane tabId="1">
                                    <Row>
                                        <Col xs="12" >

                                            <div className={styles["copy-text-block"]}>
                                                <Auth   />
                                        </div>

                                        </Col>

                                    </Row>
                                </TabPane>
                                <TabPane tabId="2">
                                    <Row>
                                        <Col xs="12" >
                                            <div className={styles["notes"]}>
                                                Подтверди свою рабочую почту и заполни простую форму, чтобы закончить регистрацию
                                            </div>
                                            {!isConfirmedEmailAndCode&&
                                                <RegistrationStep1
                                                    checkData={checkData}
                                                    setCheckData={setCheckData}
                                                    isSentCode = {isSentCode}
                                                    setIsSentCode={setIsSentCode}
                                                />
                                                }
                                            {isConfirmedEmailAndCode&&
                                                <RegistrationStep2
                                                    checkData={checkData}
                                                    setCheckData={setCheckData}
                                                />
                                            }
                                        </Col>

                                    </Row>
                                </TabPane>
                            </TabContent>
                        </div>
                    </Col>
                   }

                     {isResetPassword&& 
                        <Col xs="12" sm="12" md="9" lg="5" className={styles["identification-content"]}>
                            <div className={styles["title"]}> Восстановление пароля</div>
                            <Row>
                                 <Col xs="12" >
                                    <RestoreEmail/>
                                </Col>
                            </Row>
                        </Col>
                     }
                    <Col xs="12" sm="12" md="12" lg="7" className={styles[""]}>

                    </Col>
                </Row>
          
        </div>
    )
}


const mapStateToProps = state => ({
    isConfirmedEmail: isConfirmedEmailSelector(state),
    isResetPassword: isResetPasswordSelector(state),
    isConfirmedEmailAndCode: isConfirmedEmailAndCodeSelector(state),
    name: nameSelector(state),
    activeTabIdentification: activeTabIdentificationSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setIsResetPassword,
  setIsConfirmedEmailAndCode,
  setIsConfirmedEmailAndCodeUndefined,
  toggleActiveTabIdentification,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Identification);

