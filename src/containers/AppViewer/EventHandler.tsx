import React, { PureComponent } from 'react';
import { inject } from 'mobx-react';
import {
  Camera,
  Cartesian2,
  Cartesian3,
  ScreenSpaceEventType,
  Ellipsoid,
  defined,
  Math as CesiumMath,
  Globe,
} from 'cesium';
import { ScreenSpaceEventHandler, ScreenSpaceEvent, withCesium } from 'resium';
import { IStores } from '@/stores';

/**
 * @param {*} camera
 * @param {*} globe
 * @param {*} Cartesian2
 * @param {*} [ellipsoid=Ellipsoid.WGS84]
 * @returns
 */
const getMousePointPosition = (
  camera: Camera,
  globe: Globe,
  Cartesian2: Cartesian2,
  ellipsoid: Ellipsoid = Ellipsoid.WGS84
) => {
  const cartesian = camera.pickEllipsoid(Cartesian2) as Cartesian3;
  if (!defined(cartesian)) return;

  const cartographic = ellipsoid.cartesianToCartographic(cartesian);
  const longitude = CesiumMath.toDegrees(cartographic.longitude).toFixed(6);
  const latitude = CesiumMath.toDegrees(cartographic.latitude).toFixed(6);
  const elevation = Math.ceil(globe.getHeight(cartographic) as number);
  const height = Math.ceil(camera.positionCartographic.height) - elevation;

  return {
    long: longitude,
    lat: latitude,
    height: height,
    elevation: elevation,
  };
};

interface EventHandlerProps {
  appViewer?: IStores['appViewer'];
}

interface EventHandlerContext {
  camera?: Camera;
  globe?: Globe;
}

type props = EventHandlerProps & { cesium: EventHandlerContext };

@inject('appViewer')
class EventHandler extends PureComponent<props, {}> {
  constructor(props: props) {
    super(props);
    this.state = {};
  }

  _handleEvent(e: Event) {
    console.log(e);
  }

  _handleMouseMoveEvent = (e: { position: Cartesian2; endPosition?: Cartesian2 }): void => {
    const { camera, globe } = this.props.cesium!;
    const { setPositionData } = this.props.appViewer!;
    if (!e.endPosition || !camera || !globe) return;
    const positionData = getMousePointPosition(camera, globe, e.endPosition);
    if (!positionData) return;
    setPositionData(positionData);
  };

  render() {
    console.log('EventHandler render');
    return (
      <ScreenSpaceEventHandler>
        <ScreenSpaceEvent action={this._handleMouseMoveEvent} type={ScreenSpaceEventType.MOUSE_MOVE} />
      </ScreenSpaceEventHandler>
    );
  }
}

export default withCesium<EventHandlerProps, EventHandlerContext>(EventHandler);
