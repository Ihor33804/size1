import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom'
import classNames from 'classnames';
import * as keys from '../../../routers/keys'
import { toggleActive } from '../../../actions/userActions';
import { toggleActiveProfileContentSelector } from '../../../selectors/userSelectors';
import styles from './styles/index.module.scss';
import './styles/index.scss';
import { ARROW_BACK, LOGOTYPE, LOGO_SM} from "../../../styles/images";

const Logo = ({account = false, toggleActive, toggleActiveProfileContent,...props }) =>  {  //account - страница аккаунта
    const history = useHistory();
    const toHome = () => {
       history.push(keys.MAIN_PAGE);
     }
        return (
        	<div className={styles["logo-block"]}>
	           <span className={classNames( { "logo-account": account })}>
	                <a href="/" onClick={()=>{toHome()  }}>
                        <img src={LOGOTYPE} alt="logotype" className={[styles["logo"], styles["logo-md"]].join(' ')}/>
                        <img src={LOGO_SM} alt="logotype" className={[styles["logo"], styles["logo-sm"]].join(' ')}/> 
                    </a> 
            
	            </span>
	              {account&&<span className={classNames( { "to_home-block": account })}>
	            
	                <a href="#" onClick={()=>{toHome() }} className={styles["to_home"]}><img src={ARROW_BACK} alt="back" /> на главную</a> 
	            </span>}

	             {/* {toggleActiveProfileContent&&
                   <div className={styles["back"]} onClick={()=>{toggleActive();  }}>
                      <img src={ARROW_BACK} alt="back" className={styles["toggle-image"]} />  назад 
                  </div>} */}

            </div>
        );
    
}

const mapStateToProps = (state) => ({
 toggleActiveProfileContent: toggleActiveProfileContentSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {
       toggleActive
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Logo);