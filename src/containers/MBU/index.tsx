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
    let ws: WebSocket | undefined;

    setInterval(() => {
      ws = new WebSocket('ws://192.168.143.128:1235');
      ws!.onmessage = (evt: MessageEvent) => {
        try {
          const messageData = JSON.parse(evt.data)['__MESSAGE__'];
          this.setState({ data: JSON.parse(messageData) });
          appViewerStore.setMbuAirData(JSON.parse(messageData));
          appViewerStore.setWallAirEntities(JSON.parse(messageData));
        } catch (e) {
          console.log((e as Error).message);
        }
      };
    }, 6000);

    setInterval(() => {
      ws = new WebSocket('ws://192.168.143.128:1234');
      ws!.onmessage = (evt: MessageEvent) => {
        try {
          const messageData = JSON.parse(evt.data)['__MESSAGE__'];
          this.setState({ data: JSON.parse(messageData) });
          appViewerStore.setMbuEarthData(JSON.parse(messageData));
        } catch (e) {
          console.log((e as Error).message);
        }
      };
    }, 20000);
  }

  public componentDidMount() {
    this.describe();
  }

  render() {
    const _className = `${styles.toolbar} ${this.props.className ? this.props.className : ''} `;
    const { geoJsonData, destination, imageryProviders, threeDTileset } = this.props.appViewer!;

    return <div className={_className}></div>;
  }
}

export default Mbu;
