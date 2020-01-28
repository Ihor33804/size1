import React from 'react';
import { Row, Col, } from 'reactstrap';
import styles from './styles/index.module.scss';
import MainButton from '../../components/General/MainButton/'
import { FRONT, FOR_FRIEND, HOME_IMAGE_GOLD_MD, FRONT_SM, } from "../../styles/images";

const TakingPartInProgram = () => {



  
    return (
        <div className={styles["taking-part-program"]} >

            <Row>
                <Col xs="12" sm="12" md="12" lg="12">
                    <div className={styles["title"]}>Условия участия <span className={styles["title-block"]}>в программе</span></div>
                </Col>
            </Row>
            <img src={HOME_IMAGE_GOLD_MD} alt="home image gold"  className={styles["image-gold-md"]} /> 
            <Row className={styles["content-block"]}>
                <Col xs="12" sm="12" md="5" lg="6">
                    <span className={styles["image-gold"]}></span>
                </Col>
                <Col xs="12" sm="12" md="7" lg="6">
                    <Row>
                        <Col xs="12" sm="12" md="12" lg="12">
                            <div className={styles["content-block-steps"]}>
                                <span className={styles["content-block-title-number"]}>01</span> 
                                <span className={styles["line"]}></span>  
                                <span className={styles["content-block-title"]}>регистрируйся</span>
                            </div>
                            <div className={[styles["content-block-text"],styles["first-block"]].join(" ")}><span className={styles["bold"]}>Зарегистрируйся </span>и участвуй в программе до 26 января.</div>
                            
                        </Col>
                        <Col xs="12" sm="12" md="12" lg="12">
                            <div className={styles["content-block-steps"]}>
                                <span className={styles["content-block-title-number"]}>02</span> 
                                <span className={styles["line"]}></span>  
                                <span className={styles["content-block-title"]}>пригласи друзей</span>
                            </div>
                            <div className={[styles["content-block-text"],styles["second-block"]].join(" ")}>После регистрации в программе пригласи максимум <span className={styles["bold"]}>10 друзей</span> и стань участником розыгрыша призов. 
                            Подробности участия ты увидишь после регистрации в своем личном кабинете.
                        </div>
                        </Col>
                        <Col xs="12" sm="12" md="12" lg="12">
                            <div className={styles["content-block-steps"]}>
                                <span className={styles["content-block-title-number"]}>03</span> 
                                <span className={styles["line"]}></span>  
                                <span className={styles["content-block-title"]}>жди результаты</span>
                            </div>
                            <div className={[styles["content-block-text"],styles["third-block"]].join(" ")}>Чем больше друзей используют твой персональный код и получат стартовый набор Logic Compact, тем интереснее приз! 
                            Результаты мы озвучим <span className={styles["bold"]}>31 января.</span></div>
                        </Col>
                      
                    </Row>
                </Col>
            </Row>

             <Row className={styles["content-block-present"]} id="friend">
             <Col xs="12" sm="12" md="12" lg="12">
          
                <div className={styles["for-friend-block"]}>
                     {/* <div className={styles["for-friend"]}>для друга</div>     */}
                     <img src={FOR_FRIEND} alt="for friend" className={styles["for-friend-image"]} /> 
                 </div>
                 </Col>
                 <Col xs="12" sm="12" md="12" lg="12">
                     {/* При адаптиве другое расположение блоков */}
                       <div className={styles["title-adaptive"]}>Подари другу стартовый набор <span className={styles["title-adaptive-logic-compact"]}>Logic Compact</span></div>  
                 </Col>  
                <Col xs="12" sm="12" md="6" lg="6">
                        <img src={FRONT} alt="present" className={styles["present-block-image"]}/>
                        <img src={FRONT_SM} alt="present" className={styles["present-block-image-sm"]}/>
                        {/* <span className={styles["present-image"]}></span>     */}
                </Col>
                <Col xs="12" sm="12" md="6" lg="6">
                        <div className={styles["title-program"]}>Подари другу стартовый набор Logic Compact</div>    
                        <div className={styles["list"]}>    
                             <ul>
                               <li> цветной электронный испаритель </li>
                               <li> 1 упаковку капсул "Ягодный фреш" 2.9% </li>
                            </ul>
                        </div>   
                        <div id="friend" className={styles["button"]}>     
                            <MainButton
                                title='Подарить другу'  
                                classNamesForButton={styles['styleBut']}
                                scroll="register"
                                route="/my_account"
                            /> 
                        </div> 
                </Col>
             </Row>
        </div>

    );

}

export default TakingPartInProgram;

