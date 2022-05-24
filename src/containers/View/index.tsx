import React, { PureComponent } from 'react';
import { inject } from 'mobx-react';
import { IStores } from '@/stores';
import appViewerStore from '@/stores/modules/appViewer';

interface IProps {
  className: string;
  appViewer?: IStores['appViewer'];
}

@inject((stores: IStores) => ({
  appViewer: stores.appViewer,
}))
class View extends PureComponent<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { setGeoJsonData } = this.props.appViewer!;
    import('@/data/geoJson/countries.json').then(({ default: pointGeoJson }) => {
      appViewerStore.setGeoJsonData(pointGeoJson);
    });

    return <div></div>;
  }
}

export default View;
