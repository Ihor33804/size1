import React from "react";
import classnames from "classnames";

import styles from "./styles/index.module.scss";
import * as typesText from "../../../constants/textComponentConstants";

//type text oneOf[
//   "mainHeadLine", "secondHeadline"  mainTtext, subtitle, smalltext
    // 
// ]

// .second-headline {
// .main-text {
// .subtitile {
// .small-text{


const TextComponent = ({typeText= typesText.MAIN_TEXT, text= "", ...props}) => {

  const mainHeadLineRender = () => {
    return (<p className={[styles[classnames('main-headline')]]}> {text} </p>)
  }
  const secondHeadLineRender = () => {
    return (<p className={styles[classnames('second-headline')]}> {text} </p>)
  }
  const mainTextRender = () => {
    return (<p className={styles[classnames('main-text')]}> {text} </p>)
  }
  const smallTextRender = () => {
    return (<p className={styles[classnames('small-text')]}> {text} </p>)
  }
  const subTitleRender = () => {
    return (<p className={styles[classnames('subtitile')]}> {text} </p>)
  }
  
  switch(typeText) {
    case typesText.MAIN_HEAD_LINE:  {
      return mainHeadLineRender();
    }
    case typesText.SECOND_HEAD_LINE:  {
      return secondHeadLineRender();
    }
    case typesText.MAIN_TEXT:  {
      return mainTextRender();
    }
    case typesText.SMALL_TEXT:  {
      return smallTextRender();
    }
    case typesText.SUBTITLE:  {
      return subTitleRender();
    }
    default : {
      return mainTextRender();
    }
  } 
};

export default TextComponent;
