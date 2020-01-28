import React, { useState, useEffect, useRef } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { singOut } from '../../actions/authActions';
import { nameSelector} from '../../selectors/authSelectors';
import { isOpenMenuSelector } from '../../selectors/userSelectors';
import * as keys from "../../routers/keys";

import AuthModal from '../../containers/AuthModal';
import RestorePasswordModal from '../../containers/RestorePasswordModal';
import RestoreEmailModal from '../../containers/RestoreEmailModal';
import CheckEmailEmployee from '../../containers/CheckEmailEmployee';
import styles from "./styles/index.module.scss";
import "../../styles/index.scss";

import Header from '../../components/Header';
import Greeting from '../../components/Greeting';
import TakingPartInProgram from '../../components/TakingPartInProgram';
import TakingPartInDraw from '../../components/TakingPartInDraw';
import MobileSlider from '../../components/TakingPartInDraw/MobileSlider.js';
import Registration from '../../components/Registration';
import Footer from '../../components/Footer';

const Home = ({ name, singOut, isOpenMenu, ...props }) => {
  const [showPopupHome, setShowPopupHome] = useState(false);
  const [showPopupRestorePassword, setShowPopupRestorePassword] = useState(false);
  const [shomEmailModal, setShowEmailModal] = useState(false);
  const [showEmailCheckEmpModal, setShowEmailCheckEmpModal] = useState(false);



  const [scrollY, setScrollY] = useState(0);
  const [headerStyle, setHeaderStyle] = useState("");
  const history = useHistory();

  function logit() {
    setScrollY(window.pageYOffset);
  }

  useEffect(() => {
    function watchScroll() {
      window.addEventListener("scroll", logit);
    }
    watchScroll();
    // Remove listener (like componentWillUnmount)
    return () => {
      window.removeEventListener("scroll", logit);
    };
  });



  const onExitClick = () => {
    if (name) {
      singOut();
      history.replace(keys.MAIN_PAGE);
    }
  }

  useEffect(() => {
    const { location: { pathname } } = history;
    if (pathname === "/password-change") {
      setShowPopupRestorePassword(true);
    };


  }, []);

  const getSize = () => {
    if(!isOpenMenu) {
      return 400;
    }
    else {
      return 20;
    }
  } 
  return (
    <div>



      <div className={styles["greeting-container"]}>
      <Container >
        <Header onExitClick={onExitClick}
          openAuthPopup={() => {
            setShowPopupHome(true)
          }}
        />
         </Container >
        <Container >

          <Greeting openAuthPopup={() => {
            setShowPopupHome(true)
          }} />
        </Container>
      </div>
      {/*style='fixed-header' фиксированное меню 400*/}
      {scrollY >= getSize() &&
     
            <Header onExitClick={onExitClick}
              openAuthPopup={() => {
                setShowPopupHome(true)
              }}
              style={true}
            /> 

      }
      <div  className={styles["taking-part-program-container"]}>
        <Container>

          <TakingPartInProgram />
        </Container>
      </div>

      <div id="draw" className={styles["taking-part-draw-container"]}>
        <Container>
          <TakingPartInDraw />
        </Container>
        <div className={styles["slider-md"]}>
          <MobileSlider />
        </div>
      </div>
      {/* !name - если пользователь не авторизированный,показываем ему блок регистрации*/}
      {/* {!name && (<div id="register" className={styles["registration-container"]}>
        <Container>
          <Registration />
        </Container>
      </div>)} */}

      <div className={styles["footer-container"]} >
        <Container>
          <Footer />
        </Container>
      </div>

      <AuthModal showPopup={showPopupHome} setShowPopup={setShowPopupHome} showRestorePasswordEmail={() => {
        setShowPopupHome(false);
        setShowEmailModal(true);
      }} />
      <RestorePasswordModal showPopup={showPopupRestorePassword} setShowPopup={setShowPopupRestorePassword} sendButtonClick={() => {
        setShowEmailModal(true);
        setShowPopupRestorePassword(true);
      }}
      />
      <RestoreEmailModal showPopup={shomEmailModal} setShowPopup={setShowEmailModal} sendButtonClick={() => {
        setShowEmailModal(false);
        setShowEmailCheckEmpModal(true);
      }}
        onClickBackFunc={() => {

          setShowEmailModal(false);
          setShowPopupHome(true);
        }
        } />
      <CheckEmailEmployee showPopup={showEmailCheckEmpModal} setShowPopup={setShowEmailCheckEmpModal} />



    </div>
  )
}



const mapStateToProps = (state) => ({
  name: nameSelector(state),
  isOpenMenu: isOpenMenuSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    singOut,
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
