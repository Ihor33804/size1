import React  from 'react';
import { Row, Col, } from 'reactstrap';
import styles from './styles/index.module.scss';
import MobileSlider from './MobileSlider.js'
import { FOR_YOU} from "../../styles/images";

const TakingPartInDraw = () => {



    return (
        <div>
           <div  className={styles["for-you-block"]}>
             {/* <div className={styles["for-you"]}>для тебя</div>     */}
                <img src={FOR_YOU} className={styles["for-you-image"]} alt="for you"  /> 
            </div>     
        <div className={styles["taking-part-draw"]} >

            <Row>
                <Col xs="12" sm="12" md="12" lg="12">
              
                 </Col>
               <Col xs="12" >
                    <div className={styles["title"]} >
                        Прими участие <div className={styles["title-block-part"]}>в розыгрыше <span className={styles["title-drifts"]} >супер призов </span>  </div>    
                    </div>
                </Col>
                <Col xs="12" >
                    <div className={styles["text"]} >
                        В зависимости от количества друзей, которые получат наборы Logic Compact, ты попадаешь 
                        в ту или иную группу по розыгрышу призов. Победитель в каждой группе будет определен случайным образом.
                    </div>
                </Col>
                </Row>
               
            <div className={styles["slider-lg"]}> 
                <MobileSlider/>
            </div>
        </div>
        </div>
    );

}

export default TakingPartInDraw;

