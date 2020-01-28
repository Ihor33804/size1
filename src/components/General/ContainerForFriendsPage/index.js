import React from 'react';
import styles from './styles/index.module.scss';

const ContainerForMessage = ({children}) => {
  return (
    <div className={styles["container-background"]}>
      {children}
    </div>
  )
};

export default ContainerForMessage;