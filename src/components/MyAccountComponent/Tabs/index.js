import React, { useState, useEffect, useLayoutEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Container, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, } from "reactstrap";
import classnames from "classnames";
import styles from "../styles/index.module.scss";
import "../styles/index.scss";
import CopyText from "./CopyText.js";
import Steps from "./Steps.js";
import Statistic from "./Statistic";

function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }
  

const Tabs = () => {

    const [activeTab, setActiveTab] = useState("1");
    const toggle = (tab) => {  //переключение вкладок

        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    }

    const [width] = useWindowSize();

    const forFriend = (width >= 768) ? "подарок для друзей" : "конкурс"
    const statistic = (width >= 768) ? "статистика по друзьям" : "статистика"

    return (
        <div className="my-account-tabs">
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1' }, styles['navlink-style-point'])}
                        onClick={() => { toggle('1'); }}
                    >
                       {forFriend}
            </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { toggle('2'); }}
                    >
                       {statistic}

            </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <Row>
                        <Col sm="12">

                            <div className={styles["copy-text-block"]}>
                                <CopyText />
                            </div>
                           
                        </Col>
                        <Col sm="12">

                            <div className={styles["steps-block-content"]}>
                                <Steps />
                            </div>
                        
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="2">
                    <Row>
                        <Col sm="12">
                           <Statistic/>
                        </Col>
                      
                    </Row>
                </TabPane>
            </TabContent>
        </div>


    )
}

export default Tabs;
