import React from 'react';
import { Button, } from "reactstrap";
import { Link, NavLink } from 'react-router-dom';
import Scrollchor from 'react-scrollchor';
import className from 'classnames';

import styles from './styles/index.module.scss';

const MainButton = ({ onClick = () => { }, scroll="",route = null, title = 'Перейти', styleBut = {}, classNamesForButton="", disabled= false, ...props }) => {
    if (route) {
        return <NavLink onClick={onClick} to={route} >
            <button className={className(styles["button"],classNamesForButton)} disabled={disabled} style={styleBut}>{title}</button>
        </NavLink>
    } 
    else if(scroll) {
        return (
            <Scrollchor to={scroll} >
                <button className={className(styles["button"],classNamesForButton)} disabled={disabled} style={styleBut}>
                    {title}
                </button>
            </Scrollchor>
        )
    }
    else {
        return (
            <button onClick={onClick} className={className(styles["button"],classNamesForButton)} style={styleBut} disabled={disabled} >{title}</button>
        )
    }
}

export default MainButton;


