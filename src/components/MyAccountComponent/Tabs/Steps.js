import React from "react";
import { Container, Row, Col, } from "reactstrap";
import styles from "../styles/index.module.scss";
import "../styles/index.scss";
import { ELLIPSE_COPY, ICON_COPY_STEP1, ICON_COPY_STEP2, ICON_COPY_STEP3, ICON_COPY_ARROW, LINE, STEPS, } from "../../../styles/images";


const Steps = () => {


    return (
       <Row>
        <Col xs="3" sm="2" className={styles["steps-image-block"]}>
           <img src={STEPS} alt="next step" className={styles["steps-image-sm"]}/>
        </Col>
        <Col xs="9" sm="10" md="12" lg="12" className={styles["steps-content-block"]}>
            <Row>
            <Col xs="12" sm="12" md="4" lg="4" className={styles["steps-block"]}>
                <img src={ICON_COPY_STEP1} alt="step1" className={styles["steps-image"]}/>
                <div className={styles["title-block-step"]}>Разошли</div>
                <div className={[styles["text"], styles["first-block"]].join(' ')}>
                <span> Разошли свою </span>реферальную ссылку <span>10 друзьям</span> (используй личную почту <span>или мессенджеры)</span>
                </div>
            </Col>
            <img src={ICON_COPY_ARROW} alt="next step" className={styles["icon-arrow1"]}/>
        {/* <div> <img src={LINE} alt="next step" className={styles["image-line"]}/></div> */}
            <Col xs="12" sm="12" md="4" lg="4" className={styles["steps-block"]} >
                <img src={ICON_COPY_STEP2} alt="step2" className={styles["steps-image"]}/>
                <div className={styles["title-block-step"]}>Регистрируются</div>
                <div className={[styles["text"], styles["second-block"]].join(' ')}>друзья и получают промокод</div>
            </Col>
            <img src={ICON_COPY_ARROW} alt="next step" className={styles["icon-arrow2"]}/>
            {/* <div><img src={LINE} alt="next step" className={styles["image-line"]}/> </div> */}
            <Col xs="12" sm="12" md="4" lg="4" className={styles["steps-block"]}>
                <img src={ICON_COPY_STEP3} alt="step3" className={styles["steps-image"]}/>
                <div className={styles["title-block-step"]}>Друзья получают</div>
                <div className={[styles["text"], styles["third-block"]].join(' ')}>Logic Compact, а ты становишься участником розыгрыша призов!</div>
            </Col>
            </Row>
        </Col>
       </Row>


    )
}

export default Steps;
