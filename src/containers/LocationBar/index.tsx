import React from 'react';
import styles from './index.module.css';
import { observer, MobXProviderContext } from 'mobx-react';
import { IStores } from '@/stores';

const LocationBar = ({ className }: { className: string }) => {
  const _className = `${styles.locationbar} ${className} `;
  const {
    appViewer: { positionData },
  } = React.useContext(MobXProviderContext) as IStores;
  const { long, lat, elevation } = positionData;

  return (
    <div className={_className}>
      <div>
        {elevation ? <span className={styles.locationcamera}>Высота: {elevation}м</span> : null}
        {long ? <span className={styles.locationcamera}>Долгота：{long}</span> : null}
        {lat ? <span className={styles.locationcamera}>Широта:{lat}</span> : null}
      </div>
    </div>
  );
};

export default observer(LocationBar);
