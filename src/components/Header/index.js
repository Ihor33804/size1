import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col, } from 'reactstrap';
import classnames from "classnames";
import styles from './styles/index.module.scss';
import './styles/index.scss';
import Logo from './Logo';
import Menu from './Menu';

const Header = ({openAuthPopup = () => {},style=false, logIn = false, onExitClick, account = false, classNameLogo = "", classNameMenu = "",  ...props }) => {  
 //logIn - юзер авторизированый/неавторизированный
 //account - страница аккаунта

   
    return (
    // <div className={!account&&styles['fixed-header']}>
    //classNames( { "logo-account": account })
    //{styles[style]}    <div className={classnames("d-flex flex-column",styles["label-block"])}>
    <div className={classnames( {"fixed-header": style}, styles["header-block"] )}>
       
        {style&&(<Container>     
                <Row>         
                
                   <Col xs="9" sm="5" md="5" lg="6" className={[styles[classNameLogo], styles[" header"]].join(' ')} >
                        <Logo account = {account} />
                    </Col>
                    <Col xs="3" sm="7" md="7" lg="6" className={styles["menu-header-block"]}>
                        <Menu openAuthPopup={openAuthPopup} logIn={logIn} onExitClick={onExitClick} />   
                   </Col>
            </Row>
         </Container>)}
         {!style&&(   
                <Row>         
                
                   <Col xs="9" sm="5" md="5" lg="6" className={[styles[classNameLogo], styles[" header"]].join(' ')} >
                        <Logo account = {account} />
                    </Col>
                    <Col xs="3" sm="7" md="7" lg="6" className={styles["menu-header-block"]}>
                        <Menu openAuthPopup={openAuthPopup} logIn={logIn} onExitClick={onExitClick} />  

                   </Col>
            </Row>

         )}
         
        </div>

    );

}

export default Header;

