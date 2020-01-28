import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import classnames from "classnames";

import { useHistory } from 'react-router-dom';

import * as keys from '../../../routers/keys';

import { CLOSE_ICON1 } from '../../../styles/images';

import styles from "./styles/index.module.scss";

const Rules = ({...props}) => {
  const history = useHistory();
  const onCloseIconClick = () => {
    history.goBack();
  }

  return (<div className={styles["container"]}>
    <div className={styles["close-icon-container"]} onClick={onCloseIconClick}><img src={CLOSE_ICON1} alt=""/></div>
    <div className={styles["main-text-container"]}>
    <h3 className={classnames("second-headline", styles["h3"])}>Правила</h3>
    <p className={styles["container1-text"]}>Принимая предложение, я подтверждаю, что являюсь совершеннолетним гражданином РФ и потребителем никотиносодержащей продукции, а также добровольно, своей волей и в своем интересе даю согласие ООО «Дж. Т.И. Инновационные продукты», расположенного по адресу: 123112, г.Москва, 1-й Красногвардейский проезд, д. 15, этаж 29, пом I ком. 25 офис 29-42, («Компания»), и уполномоченным им лицам право осуществлять обработку, включая сбор, хранение, использование, уничтожение, систематизацию, уточнение (обновление, изменение) смешанным способом моих персональных данных: Ф.И.О., дата рождения, пол, мобильный телефон, адрес email (если указано), почтовый адрес (если указано), основная и вторая марки электронных испарителей и/или сигарет, в целях формирования базы данных потребителей, составления статистической отчетности, проведения опросов, исследований, направления мне специальных предложений, информации о новых товарахи маркетинговых программах, осуществления прямых контактов со мной, в том числе, по сетям электросвязи, включая направление SMS-сообщений и электронной почты, до отмены мной такого согласия.</p>
      
      <p className={styles["container2-text"]}>Я уведомлен, что имею право отозвать свое согласие следующими способами: 1) направив письмо с указанием Ф.И.О. и адреса, указанных при регистрации, на адрес электронной почты _адрес 2) направив письмо в адрес Компании. Я согласен с тем, что предоставленные мной персональные данные будут удалены по моему требованию в течение 60 дней с даты получения требования об их уничтожении"</p>
      </div>
  </div>);
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Rules)