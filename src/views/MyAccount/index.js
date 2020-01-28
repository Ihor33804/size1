import React, { useState, useEffect, useLayoutEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { useHistory } from "react-router-dom";
import classnames from "classnames";
import { singOut, getProfile } from '../../actions/authActions';
import { toggleMenu } from '../../actions/userActions';
import { nameSelector } from '../../selectors/authSelectors';
import { isOpenMenuSelector } from '../../selectors/userSelectors';
import styles from "./styles/index.module.scss";
import "./styles/index.scss";
import "../../styles/index.scss";
import * as keys from "../../routers/keys";
import Header from '../../components/Header';
import Logo from '../../components/Header/Logo';
import Menu from '../../components/Header/Menu';
import MyAccountComponent from '../../components/MyAccountComponent';
import Profile from '../../components/MyAccountComponent/Profile';


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
  
const MyAccount = ({ name, singOut, getProfile, isOpenMenu,toggleMenu }) => {
    // const styleMenu = {
    //     position: 'fixed',
    //     left: '0',
    //     zIndex: '200',
    //     background: '#F5F3FA',
    // }
    const [styleMenu, setStyleMenu] = useState(false);
    const history = useHistory();
    const [width] = useWindowSize();

    const onExitClick = () => {
        if (name) {
            singOut();
            history.replace(keys.MAIN_PAGE);
        } 
    }

    useEffect(() => {

        // if(width>767) {
        //     toggleMenu(false);
        // }
    }, [width]);

    useEffect(() => {
        window.scrollTo(0, 0);
        getProfile();
        // if(isOpenMenu) {
        //     setStyleMenu(true);
        // }
        // else {
        //     setStyleMenu(false)
        // }
         
    }, []);

    return (  
        //    <div className={classnames( {"styledMenu": styleMenu}, styles["new-background-account"] )}>
        <div className={styles["new-background-account"]}>         
            <Container >
                <Row>
                    <Col xs="12" sm="12" md="12" lg="8" className={styles["adaptive-header-block"]}>
                        <Col xs="12"  className={styles["main-content-lg"]}>
                            <Logo />
                        </Col>
                        
                        <Col xs="12"  className={classnames( {"styledMenu" : isOpenMenu===true}, styles["main-content-md"] )}>    
                            <Header logIn={Boolean(name)} account={true} onExitClick={onExitClick} classNameLogo="account-content" classNameMenu="account-profile" />
                        </Col> 
                        <MyAccountComponent />
                    </Col>
                    <Col xs="12" sm="12" md="12" lg="4" className={styles["new-profile"]}>
                        <Menu />
                        <Profile />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}


const mapStateToProps = state => ({
    name: nameSelector(state),
    isOpenMenu: isOpenMenuSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    singOut,
    getProfile,
    toggleMenu,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyAccount);

