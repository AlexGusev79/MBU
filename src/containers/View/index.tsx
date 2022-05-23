import React from 'react';
import styles from './index.module.css';
import { observer, MobXProviderContext } from 'mobx-react';
import { IStores } from '@/stores';

const View = ({ className }: { className: string }) => {
  const _className = `${styles.locationbar} ${className} `;
  const {
    appViewer: { mbuData },
  } = React.useContext(MobXProviderContext) as IStores;
  return (
    <div className={_className}>
      <div></div>
    </div>
  );
};

export default observer(View);
