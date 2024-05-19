import React from 'react';
import styles from './HowTo.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';

export const HowTo: React.FC = () => {
  const pathname = useLocation().pathname.slice(1);
  const navigate = useNavigate();
  const handleOpen = () => {
    navigate('/howto');
  };

  console.log(pathname);

  if (['howto', 'setting', 'asct', 'terms', 'account', 'plan', 'success'].includes(pathname))
    return null;

  return (
    <button onClick={handleOpen} className={`${styles.howto}`}>
      <FontAwesomeIcon icon={faQuestionCircle as IconProp} className={styles.howto_icon} />
      How to App
    </button>
  );
};
