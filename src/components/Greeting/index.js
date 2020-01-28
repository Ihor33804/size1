import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col,  } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { nameSelector,isRegisteredUserSelector, } from '../../selectors/authSelectors';
import {  toggleActiveTabIdentification,  } from '../../actions/authActions';
import styles from './styles/index.module.scss';
import Header from '../Header'
import { LOGIC_AMBASSADOR_TEXT, LOGIC_AMBASSADOR_TEXT_MD, LOGIC_AMBASSADOR_TEXT_SM,  } from "../../styles/images";

import MainButton from '../../components/General/MainButton/';
import * as keys from '../../routers/keys';


const Greeting = ({openAuthPopup = () => {}, name, toggleActiveTabIdentification, ...props}) => { 
    
    /* главная после входа - давайте поднимем выделенную часть на скрине  */
        const [styleTop, setStyleTop] = useState("styleTop");
        const [styleBottom, setStyleBottom] = useState("styleBottom");
        const history = useHistory();

        useEffect(()=>{
            // if(name) {
            //     setStyleTop("styleTop");
            //     setStyleBottom("styleBottom");
            // }  
            // else {
            //     setStyleTop("");
            //     setStyleBottom("");
            // }
            
         }, [name]);


        const goToAuth = () => {
            toggleActiveTabIdentification("1");
            history.push(keys.IDENTIFICATION);
        }   
        const goToRegister = () => {
            toggleActiveTabIdentification("2");
             history.push(keys.IDENTIFICATION);
        }   
        return (
            <div className={styles["greeting"]} >
                {/* <Header openAuthPopup={openAuthPopup}  /> */}
                <Row>
                    <Col xs="12" sm="12" md="12" lg="6">
                        <div className={[styles["greeting-block"],styles[styleTop]].join(" ")}>
                        
                              <img src={LOGIC_AMBASSADOR_TEXT} alt="LOGIC ambassador" className={styles["logic-ambassador-text"]}/> 
                              <img src={LOGIC_AMBASSADOR_TEXT_MD} alt="LOGIC ambassador" className={styles["logic-ambassador-text-md"]}/> 
                              <img src={LOGIC_AMBASSADOR_TEXT_SM} alt="LOGIC ambassador" className={styles["logic-ambassador-text-sm"]}/> 
                              
                        </div>
                       
                        <div className={[styles["text"],styles[styleBottom]].join(" ")}>Мы приглашаем тебя стать амбассадором Logic Compact и рассказать своим друзьям о новом продукте!</div>
                        {/* {!name&&(<div className={styles["greeting-button-block"]}>
                            <MainButton
                                title='Зарегистрироваться'
                                disabled={false}
                                classNamesForButton={styles["styleBut"]}
                                //scroll="register"
                               // route = '/identification'
                                onClick = {()=>{goToRegister()}}
                            />
                  
                            <div className={styles["greeting-auth"]}>
                                 <div className={styles["greeting-account"]}>Уже есть аккаунт?</div>
                                 <div  onClick={()=>{
                                        goToAuth()
                                }} className={styles["sign-in"]}>Войти</div>
                            </div>
                        </div>)} */}

                        <div className={styles["greeting-button-block"]}></div>
                      
                    </Col>
                </Row> 
            </div>

        );
    
}

// export default Greeting;


const mapStateToProps = (state) => ({
    name: nameSelector(state),
  });
  
  const mapDispatchToProps = dispatch => bindActionCreators(
    {
        toggleActiveTabIdentification
    },
    dispatch
  );
  
  export default connect(mapStateToProps, mapDispatchToProps)(Greeting);