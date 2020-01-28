import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  nameSelector,
  positionSelector,
  citySelector
} from "../../../../selectors/authSelectors";
import styles from "../styles/index.module.scss";

const Name = ({name, position, city}) => {
  return (
    <>
      <div className={styles["name"]}>{name}</div>
    </>
  );
};

const mapStateToProps = state => ({
  name: nameSelector(state),
  position: positionSelector(state),
  city: citySelector(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Name);
