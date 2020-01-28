import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, NavLink, } from "reactstrap";
import * as keys from '../../routers/keys'
import { ARROW_BACK, } from "../../styles/images";
import styles from "./styles/index.module.scss";
import Tabs from './Tabs';
import Profile from './Profile';
import ProfileMobile from './Profile/ProfileMobile';

const MyAccountComponent = () => {
    const history = useHistory();
 
    //    const [toggleActive, setToggleActive] = useState(false);
    // useEffect(() => {
    //    //setToggleActive(false);

    //  },[toggleActive]);

    const toHome = () => {
       history.push(keys.MAIN_PAGE);
    }
    return (

        <>
            
                
                <Col xs="12" sm="12" md="12" lg="8" className={styles[""]}>
                    <NavLink onClick={()=>{toHome()  }} className={styles["to_home"]}><img src={ARROW_BACK} alt="back" /> на главную</NavLink> 
                
                </Col>
                <Col xs="12" sm="12" md="12" lg="8" className={styles[""]}>
                    <div className={styles["title"]}>
                        <div className={styles["main-headline"]}>Добро пожаловать</div>
                    </div>
                </Col>
              {/* account-profile  for md*/}
                <Col xs="12" sm="12" md="12" lg="4" className={styles["adapt-md"]}>
                    <div className={styles["back-profile"]}>
                        <Profile 
                        
                        />
                    </div>
                </Col>


                <Col xs="12" sm="12" md="12" lg="12" className={styles["my-account-tabs-content"]}>
                
                    <Tabs />
                </Col>
                
            
        
        
        </>
    )
}

 export default MyAccountComponent;
