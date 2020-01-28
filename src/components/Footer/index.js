import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col, Label, Input, CustomInput, NavLink } from 'reactstrap';
import { useHistory } from "react-router-dom";
import * as keys from "../../routers/keys";
import styles from './styles/index.module.scss';
import MainButton from '../../components/General/MainButton/'
import InputComponent from '../../components/General/InputComponent'
import { FRAME, ICON_18, INSTAGRAM_ICON, YOUTUBE_ICON, } from "../../styles/images";


const Footer = () => {

    const history = useHistory();
    const goHome = () => {
        history.replace(keys.MAIN_PAGE); 
    }
    return (

        <div className={styles["footer"]} >

            <Row>
                
                <Col xs="6" sm="6" md="2" lg="2">
                    <a href=""  onClick = {()=>{goHome()}}><img src={FRAME} alt="logic" className={styles["logic-logo"]}/>  </a>             
                </Col>
                <Col xs="12" sm="12" md="5" lg="5"  className={styles["text"]}>
                     <div> <img src={ICON_18} alt="Logic ambassador" className={styles["icon"]}/></div>  
                     <div>Электронный испаритель. Содержит никотин, вызывающий привыкание. </div>  
                </Col>
                <Col xs="12" sm="12" md="12" lg="3"  className={styles["site-block"]}>
                    <NavLink href="https://logicvapes.ru/" className={styles["site"]} target="_blank"> Официальный сайт Logic </NavLink>
                </Col>
                <Col xs="6" sm="6" md="5" lg="2"  className={styles["social"]}>
                    <NavLink className={styles["link-logicvapes"]} href="https://www.instagram.com/logicvapes_ru/" target="_blank">
                    <img src={INSTAGRAM_ICON} alt="instagram" className={styles["social-icon"]}/>
                    </NavLink>
                    {/* <img src={YOUTUBE_ICON} alt="youtube" className={styles["social-icon"]}/> */}
                </Col>
                
                 <Col xs="12" sm="12" md="12" lg="2"  className={styles["site-adaptive"]}>
                   <NavLink className={styles["site"]} href="https://logicvapes.ru/" target="_blank"> Официальный сайт Logic</NavLink>
                </Col>
                

                <Col xs="12" sm="12" md="5" lg="5"  className={styles["text-adaptive"]}>
                     <div> <img src={ICON_18} alt="Logic ambassador" className={styles["icon"]}/></div>  
                     <div>Электронный испаритель. Содержит никотин, вызывающий привыкание. </div>  
                </Col>
            </Row>

        </div>
    );

}

export default Footer;

