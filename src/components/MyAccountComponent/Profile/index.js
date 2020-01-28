import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Container, Row, Col, } from "reactstrap";
import classnames from "classnames";
import { toggleActive } from '../../../actions/userActions';
import { emailSelector } from '../../../selectors/authSelectors';
import { toggleActiveProfileContentSelector } from '../../../selectors/userSelectors';
import { ARROW_BACK, ARROW_GO,ARROW_BACK_ACCOUNT, } from "../../../styles/images";
import styles from "./styles/index.module.scss";
import InputComponent from '../../General/InputComponent/'
import Name from './Name'
import ProfileMobile from './ProfileMobile'

const Profile = ({ toggleActive, emailEmp, toggleActiveProfileContent,...props }) => { //toggleActive = false, setToggleActive = () => {},
    const styleInput = {
        
        //  padding: '18px 20px',
    }
    const [value, setValue] = useState("");
    //const [toggleActive, setToggleActive] = useState(false);

    useEffect(() => {
        // setToggleActive(false); //!!!!!!!!
    }, []);

    const toggle = () => {

        return (
            <Row className={styles["toggle-lg-md"]}>
                <Col xs="12" sm="12" md="12" lg="12" >
                    <div className={styles["title"]}>Рабочая почта</div>
                </Col>
               
                <Col xs="12" sm="12" md="12" lg="12" >
                    <InputComponent //edit input
                        onChangeInput={setValue}
                        value={emailEmp}
                        placeholder="Рабочая почта"
                        style={styleInput}
                        disabled={true}

                    />
                </Col>
            </Row>
        );
    }

    const toggleSm = () => {

        return (

            <Row className={styles["toggle-sm"]}>
                <Col xs="12" sm="12" md="12" lg="12" >
                    <div className={styles["title"]}>Рабочая почта</div>
                </Col>

                <Col xs="12" sm="12" md="12" lg="12" >
                    <InputComponent //edit input
                        onChangeInput={setValue}
                        value={emailEmp}
                        placeholder="Рабочая почта"
                        style={styleInput}
                        disabled={true}
                    />
                </Col>
            </Row>
        );
    }
    return (
        <div className={styles["profile-block"]}>
          
               
                    <div className={styles["toggle-block"]}>
                        <div className={styles["profile"]}>
                            <Name />
                        </div>
                        {/* {!toggleActiveProfileContent &&
                            <div>
                                <img src={ARROW_GO} alt="go" className={styles["toggle-image"]} onClick={() => { toggleActive(); }} />
                            </div>
                        }
                        {toggleActiveProfileContent &&
                            <div>
                                <img src={ARROW_BACK_ACCOUNT} alt="back" className={styles["toggle-image"]} onClick={() => { toggleActive(); }} />
                            </div>
                        } */}
                        {/*toggleActiveProfileContent&&
                            <div>
                                <img src={ARROW_BACK} alt="back" className={styles["toggle-image"]} onClick={()=>{toggleActive();  }} /> 
                            </div>*/}



                    </div>
               
                    <div className={styles["emails"]}>
                        <div className={styles["toggle-lg-md"]}>{!toggleActiveProfileContent && toggle()}</div>
                        <div className={styles["toggle-sm"]}>{ toggleSm()}</div>
                    </div>
                
         
        </div>
    )
}



const mapStateToProps = (state) => ({
 toggleActiveProfileContent: toggleActiveProfileContentSelector(state),
 emailEmp: emailSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        toggleActive
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);