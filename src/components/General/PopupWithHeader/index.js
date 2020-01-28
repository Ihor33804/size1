import React from "react";
import { Modal } from "reactstrap";
import styles from "./styles/index.module.scss";
import { CLOSE_ICON } from '../../../styles/images';

export default ({ children, show, closefunc = () => {} , modalClassName, headerTitle='', ...props }) => {
  return (
    <div>
      <Modal isOpen={show} toggle={()=>closefunc()} className={styles["popup"]}>
        <img onClick={()=>closefunc()} src={CLOSE_ICON} className={styles["close-icon"]} alt="close" />
        <div className={styles["popap-header"]}>
          <p className="main-headline m-0">{headerTitle}</p>
        </div>
        <div className={styles["popup-body"]}>
        {React.cloneElement(children, { closefunc, ...props })}
        </div>
      </Modal>
    </div>
  );
};
