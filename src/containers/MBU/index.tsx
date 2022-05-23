import React, { PureComponent } from 'react';
import { Menu, Dropdown, Button, Icon } from 'antd';
import { inject } from 'mobx-react';

import { observable, computed, action } from 'mobx';

import styles from './index.module.css';
import { IStores } from '@/stores';
import appViewerStore from '@/stores/modules/appViewer';

import { options } from './options';

import { Data } from './types';

interface IProps {
  className: string;
  appViewer?: IStores['appViewer'];
}

@inject((stores: IStores) => ({
  appViewer: stores.appViewer,
}))
class Mbu extends PureComponent<IProps, {}> {
  constructor(props: any) {
    super(props);
    this.state = { data: [] };
  }

  describe() {
    const ws = new WebSocket('ws://192.168.143.128:1234');

    ws.onmessage = (evt: MessageEvent) => {
      //const data: Data = JSON.parse(evt.data);

      try {
        const messageData = JSON.parse(evt.data)['__MESSAGE__'];
        this.setState({ data: JSON.parse(messageData) });

        console.log(JSON.parse(messageData));
        appViewerStore.setMbuData(JSON.parse(messageData));
      } catch (e) {
        console.log((e as Error).message);
      }
    };
  }

  public componentDidMount() {
    this.describe();
  }

  render() {
    const _className = `${styles.toolbar} ${this.props.className ? this.props.className : ''} `;
    const { geoJsonData, czmlData, destination, imageryProviders, threeDTileset } = this.props.appViewer!;

    return <div className={_className}></div>;
  }
}

export default Mbu;
