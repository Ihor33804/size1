import React, { useEffect, useState, useRef } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    Container,
} from 'reactstrap';
import Scrollchor from 'react-scrollchor';
import { withRouter } from "react-router";
import { useHistory } from "react-router-dom";
import * as keys from '../../../routers/keys';
import { nameSelector, activeTabIdentificationSelector, isRegisteredUserSelector,} from '../../../selectors/authSelectors';
import {  isOpenMenuSelector } from '../../../selectors/userSelectors';
import { toggleMenu } from '../../../actions/userActions';
import { singOut, toggleActiveTabIdentification,  } from '../../../actions/authActions';
import { CLOSE_MENU } from "../../../styles/images";
import styles from './styles/index.module.scss';
import './styles/index.scss';
import Logo from '../Logo';
import RulesModal from "../../../containers/RulesModal";

const Menu = ({ logIn = false, name, openAuthPopup, location, toggleMenu, isOpenMenu, singOut, activeTabIdentification, toggleActiveTabIdentification,isRegisteredUser, ...props }) => { //logIn /name -- юзер авторизированый/неавторизированный
    const history = useHistory();
   // const [isOpen, setIsOpen] = useState(false);
    const [isAccountPage, setIsAccountPage] = useState(false);
    const [showPopupHome, setShowPopupHome] = useState(false);


 
  


    useEffect(() => {
     
        if(isOpenMenu){ //нельзя скроллить,если открыто меню
          //  document.body.style.overflow = 'hidden';
           // document.html.style.cssText = 'overflow:hidden;'; 
        //   document.getElementsByClassName("new-background-account")[0].style.display ='none'; 
        //   document.body.addEventListener('touchmove', function(e){ 
        //     document.getElementsByTagName('body')[0]. style .height = "100vh";
        //     document.getElementsByTagName('body')[0]. style. overflow = "hidden";
        //   });
        // document.addEventListener('touchmove', function(e) {
        //     e.preventDefault();
        // }, { passive: false });

        document.ontouchmove = function(e){ 
          
            e.preventDefault(); 
       }
          
        }  
        else {

            document.ontouchmove = function(e){ 
                return true; 
              }
          
            // document.removeEventListener('touchmove', function(e) {
            //     e.preventDefault();
            // }, { passive: true });

            // document.body.addEventListener('touchmove', function(e){ 
            //     document.getElementsByTagName('body')[0]. style .height = "100vh";
            //     document.getElementsByTagName('body')[0]. style. overflow = "hidden";
            //   });
          //  document.html.style.cssText = 'overflow: auto;'; 
         // document.getElementsByClassName("new-background-account")[0].style.display ='block'; 
          //  document.body.style.cssText = 'overflow: auto;'; 
          //  document.body.style.overflow = 'initial';
        }
   
    }, [isOpenMenu]);

    useEffect(() => {
     
        if (location.pathname === '/my_account') {
            setIsAccountPage(true);
        }
        else {
            setIsAccountPage(false);
        }
    }, []);

    const onExitClick = () => {
        if (name||isRegisteredUser) {
            singOut();
            history.replace(keys.IDENTIFICATION);
        }
    }


    const toggle = () => {
       // setIsOpen(!isOpen);
       toggleMenu();
    }
    const toAgree = () => {
        history.push(keys.I_AGREE);
    }
    const toMyAccount = () => {
        history.push(keys.MY_ACCOUNT);
    }

    const goToAuth = () => {
        toggleActiveTabIdentification("1");
        history.push(keys.IDENTIFICATION);
        
    }
    const goToRegistration = () => {
        toggleActiveTabIdentification("2");
        history.push(keys.IDENTIFICATION);
    }
    const getMenu = () => {
        return (
            <div className="mobile-menu">
                {/* <div className="top-menu">
                     <Logo /> 
                    <div className="close-block">
                        <img src={CLOSE_MENU} alt="close" onClick={toggle} />
                    </div>
                </div> */}
                {/* <NavItem onClick={() => {
                  toggleMenu();
                 setShowPopupHome(true);
                  
                }}>
                    <NavLink href="#">Условия участия </NavLink>
                </NavItem> */}
                {!isAccountPage&& <NavItem onClick={() => { 
                    toggleMenu();
                }}>
                    <Scrollchor to="friend">Подарок для друга </Scrollchor>
                    </NavItem>
                }

                {isAccountPage&& <NavItem onClick={() => { 
                    toggleMenu();
                   // history.push(keys.MAIN_PAGE); 
                    }}>
                     {/* <Scrollchor to="friend">Подарок для друга </Scrollchor> */}
                     <NavLink href="/#friend" >Подарок для друга</NavLink>
                    </NavItem>
                }
                 {!isAccountPage&&<NavItem onClick={() => {
                     toggleMenu();
                  }}>
                    <Scrollchor to="draw">Розыгрыш для тебя  </Scrollchor>
                </NavItem>}
                {isAccountPage&&<NavItem onClick={() => { 
                    toggleMenu();
                   // history.push(keys.MAIN_PAGE) 
                    }}>
                     <NavLink href="/#draw" >Розыгрыш для тебя</NavLink>
                    {/* <Scrollchor to="draw">Розыгрыш для тебя  </Scrollchor> */}
                </NavItem>}
            </div>
        );
    }
    return (

        <div className="menu">
        
            <div className="menu-block">
                <Navbar expand="md">
                    {!isOpenMenu&&<NavbarToggler onClick={toggle}  />}
                    {isOpenMenu&&<div className={styles["close-menu-icon-block"]}><img src={CLOSE_MENU} alt="close" onClick={toggle} className={styles["close-menu-icon"]}/></div>}
               
                     <Collapse isOpen={isOpenMenu} navbar>
                     <Container>
                        {/* {!name && (
                            <Nav navbar>
                                {getMenu()}
                                <div className="menu-bottom">
                                    <NavItem className="active mobile-item " onClick={toggle}>
                                         <NavLink href="#" onClick={()=>{ goToRegistration() }}>Регистрация </NavLink>
                                    </NavItem>

                                    <NavItem className="mobile-item" onClick={() => {
                                        toggleMenu();
                                        goToAuth();
                                    }}>
                                        <NavLink href="#">Войти</NavLink>
                                    </NavItem>
                                </div>
                            </Nav>
                        )} */}
                         
                            <Nav navbar>
                                {getMenu()}
                                <div className="menu-bottom bottom">
                                    {!isAccountPage && (
                                        <NavItem className="active mobile-item ">
                                            <NavLink className={styles[""]} onClick={() =>{
                                             toggleMenu()   
                                             toMyAccount()}}>Мой профиль</NavLink>
                                        </NavItem>)}
                                        <NavItem className="mobile-item ">
                                            <NavLink className={styles["exit-button"]} onClick={() =>{
                                            toggleMenu()
                                            onExitClick()
                                            } }>Выйти</NavLink>
                                        </NavItem>
                                </div>
                            </Nav>
                        
                 </Container>
                    </Collapse> 
                   
                  
                </Navbar>
            </div>
            <RulesModal showPopup={showPopupHome} setShowPopup={setShowPopupHome}  />
        </div>
    );

}

const mapStateToProps = (state) => ({
    name: nameSelector(state),
    isOpenMenu: isOpenMenuSelector(state),
    activeTabIdentification: activeTabIdentificationSelector(state),
    isRegisteredUser: isRegisteredUserSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        toggleMenu,
        singOut,
        toggleActiveTabIdentification,
    },
    dispatch
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu));
