import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Container, Row, Col, } from "reactstrap";
import styles from "../styles/index.module.scss";
import Name from '../Name'
import InputComponent from '../../../General/InputComponent/'

const ProfileName = () => {
	 const [value, setValue] = useState("");
    return (    
        <div>
        	    <Row>
	                <Col xs="12" sm="12" md="12" lg="12" >
	                    <div className={styles["toggle-block"]}>
	                        <div className={styles["profile"]}>
	                           <Name/>
	                        </div>
	                    </div>
	                </Col>
                 </Row>  
        	    <Row className={styles["toggle-sm"]}>
                  <Col xs="12" sm="12" md="12" lg="12" >
                      <div className={styles["title"]}> Почта</div>
                    </Col>
                            <Col xs="12" sm="12" md="6" lg="12" >
                                <div className={styles["label"]}> Личная</div>
                                <InputComponent //edit input
                                    onChangeInput={setValue}
                                    inputVal={value}
                                    placeholder="Личная почта"
                                    edit={true}
                                />
                            </Col>
                            <Col xs="12" sm="12" md="6" lg="12" >
                                <div className={styles["label"]}>рабочая</div>
                                <InputComponent //edit input
                                    onChangeInput={setValue}
                                    inputVal={value}
                                    placeholder="Рабочая почта"
                                />
                           </Col>
               </Row>
        </div>
    )
}

export default ProfileName;
