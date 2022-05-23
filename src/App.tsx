import * as React from 'react';
import { hot } from 'react-hot-loader/root';

import AppViewer from './containers/AppViewer';
import Mbu from './containers/MBU';
import View from './containers/View';
import LocationBar from './containers/LocationBar';
import styles from './App.module.css';

interface Props {}

class App extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.state = {};
    //<View className={styles.toolbar} />
  }

  render() {
    return (
      <>
        <LocationBar className={styles.locationbar} />
        <Mbu className={styles.toolbar} />
        <AppViewer />
      </>
    );
  }
}

export default hot(App);
