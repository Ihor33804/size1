import React, {useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styles from "../styles/index.module.scss";
import "../styles/index.scss";
import { NavLink } from "reactstrap";
import Copy from 'copy-to-clipboard';
import { ELLIPSE_COPY, COPY_IMAGE_ADAPT, } from "../../../styles/images";
import { SMALL_TEXT } from '../../../constants/textComponentConstants';
import TextComponent from '../../General/TextComponent';
import CopyToClipBoardModal from '../../../containers/CopyToClipBoardModal'
import { LINK_FOR_FRIENDS } from '../../../constants/linkForFriends';
import { codeSelector } from "../../../selectors/authSelectors";
import MainButton from '../../../components/General/MainButton/';


const CopyText = ({code, ...props}) => {

    const [copied, setCopied] = useState(false);
    const timer=null;
    useEffect(() => {
      //  setCopied(false);
        return () => clearTimeout(timer);
    }, []);

    const copyTextFunc = () => {
        const TEXT_MESSAGE = `Привет, друг! \n У меня есть для тебя подарок. Чтобы его получить, тебе нужно пройти по ссылке \nhttps://${LINK_FOR_FRIENDS}/friend/code=${code} и зарегистрироваться`;
        setCopied(true);
        const timer = setTimeout(() => setCopied(false), 1000);
        Copy(TEXT_MESSAGE);
    }
    const copyLink = () => {
        const LINK = `${LINK_FOR_FRIENDS}/friend/code=${code}`;
        Copy(LINK);
    }

    return (
        <div className={styles["copy-text"]}>
            <img src={ELLIPSE_COPY} alt="copy" className={styles["copy-image"]} />
            <div  className={styles["copy-image-block"]} >
                <img src={COPY_IMAGE_ADAPT} alt="copy" className={styles["copy-image-adapt"]} />
            </div>
            <div className={styles["title-block"]}>Скопируй текст и ссылку</div>

            <div className={styles["note"]}>
                <TextComponent typeText={SMALL_TEXT} text="Привет, друг!  " />
                <TextComponent typeText={SMALL_TEXT} text="У меня есть для тебя подарок. Чтобы его получить, тебе нужно пройти по ссылке  " />
            </div>
            <div className={styles["link-block"]}><NavLink onClick={()=>{copyLink()}} className={styles["url"]}>{`${LINK_FOR_FRIENDS}/friend/code=${code}`}</NavLink></div>
           
            <MainButton
               title='Скопировать текст и ссылку'
               disabled={false}
               classNamesForButton={styles["styleBut"]}
               onClick={()=>{copyTextFunc()}}                 
            />
            {copied&& 
                <div className={styles["copied-block"]}>
                    <div className={styles["copied"]}>
                        <div className={styles["copied-text"]}>Текст и ссылка скопированы </div>
                    </div>
                </div>
            }
        </div>


    )
}

const mapStateToProps = state => ({
    code: codeSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CopyText);
