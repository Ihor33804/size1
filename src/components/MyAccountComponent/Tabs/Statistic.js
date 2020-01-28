import React, { useState, useEffect, useRef } from "react";
import { Row, Col, } from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styles from "../styles/index.module.scss";
import "../styles/index.scss";
import { PRESENT, PRESENT_MOBILE, } from "../../../styles/images";
import {SECOND_HEAD_LINE, } from '../../../constants/textComponentConstants';
import TextComponent from '../../../components/General/TextComponent';
import { friendsSelector } from '../../../selectors/authSelectors';


const Statistic = ({friends = [], ...props}) => { //got_gift - был подарок/не было
  
    const [presentFriend, setPresentFriend] = useState(false);

    useEffect(() => {

             
        if(friends==true) {
            setPresentFriend(true);
        }
        else {
            setPresentFriend(false);
        }

    }, [friends])

    const renderFriends = () => {
       
     
        return friends.map((item) =>{
            return getFriend(item)
        });
    } 

    const getFriend = ({email, got_gift, id}) => {
     if(got_gift){
            return (
                <div key={id}  className={styles["friend"]} > 
                    <Row>
                    <Col xs="10" sm="11" md="5" lg="6" >
                      <div >{email}</div>
                    </Col>
                    <Col xs="12" sm="12" md="5" lg="5" className={styles["get-present-block"]} >
                    <div className={styles["get-present"]}>ваш друг уже забрал подарок </div>
                    </Col>
                    <Col xs="2" sm="1" md="2" lg="1" >
                    {(<div><img src={PRESENT} alt="present" className={styles["present"]}/> </div>)}
                    </Col>
                    </Row>
                </div>
            );
        } else {
          return  (<div key={id} className={styles["friend"]}>{email}</div>);
        }
        
    }
    return (
       <Row>
        <Col xs="12" sm="12" md="12" lg="12" className={styles["statistics"]}>
                <TextComponent typeText={SECOND_HEAD_LINE} text="Статистика по твоим друзьям"/>
                {friends.length>0&&<div className={styles["present-info-block"]}>
                  <span className={styles["present-info-block-image"]}><img src={PRESENT_MOBILE} alt="present"/></span>
                  <span className={styles["present-info-block-text"]}>Если ваш друг уже получил свой набор, возле его почты появится значок подарка, чтобы вы могли следить за статистикой</span>
                </div>}
                {friends.length===0&&<div className={styles["no-friends-block"]} >
                            <div className={styles["no-friends-block-title"]} >Никто из твоих друзей пока не зарегистрировался по твоей ссылке.</div>
                            <div  className={styles["no-friends-block-note"]} >После регистрации друзей информация появится здесь.</div>
                     </div>
                }
                <div className={styles["list-friends"]}>
                    {renderFriends()}     
                </div>
        </Col>
        
       </Row>


    )
}

const mapStateToProps = state => ({
    friends: friendsSelector(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Statistic);

 