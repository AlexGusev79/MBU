import { observable, action } from 'mobx';
import { Cartesian3, Rectangle, Resource, WebMapTileServiceImageryProvider } from 'cesium';
import { td_img_imageryProvider, td_cia_imageryProvider } from '@/helpers/tdt-service';

type CesiumResource = string | object | Resource | Document | undefined;

type Destination = Cartesian3 | Rectangle | undefined;
interface IPosition {
  long: number | string;
  lat: number | string;
  elevation: number;
}

interface IMbu {
  UID: string;
  B: number;
  L: number;
  H: number;
  Q: number;
  name: string;
  description: string;
  color: number;
}

type MbuResource = Array<object> | undefined;
type MbuAirWallResource = Map<string, number[]> | undefined;

export interface IAppViewerState {
  imageryProviders: WebMapTileServiceImageryProvider.ConstructorOptions[];
  geoJsonData: CesiumResource;
  destination: Destination;
  positionData: IPosition;
  mbuAirData: MbuResource;
  mbuEarthData: MbuResource;
  wallAirEntities: MbuAirWallResource;
}

export class AppViewer implements IAppViewerState {
  public imageryProviders = [td_img_imageryProvider, td_cia_imageryProvider];
  public threeDTileset = 'https://earthsdk.com/v/last/Apps/assets/dayanta/tileset.json';
  public terrain = 'https://data.marsgis.cn/terrain';
  public checkPosEntities: MbuAirWallResource;

  @observable.ref public geoJsonData: CesiumResource;
  @observable.deep public destination: Destination;
  @observable public positionData: IPosition;
  @observable.ref public mbuAirData: MbuResource;
  @observable.ref public mbuEarthData: MbuResource;
  @observable.ref public wallAirEntities: MbuAirWallResource;

  constructor() {
    this.positionData = {
      long: 0,
      lat: 0,
      elevation: 0,
    };

    this.wallAirEntities = new Map<string, number[]>();
    this.checkPosEntities = new Map<string, number[]>();
  }

  @action
  setDestination = (destination: Destination): void => {
    this.destination = destination;
  };

  @action
  setGeoJsonData = (geoJsonData: CesiumResource): void => {
    this.geoJsonData = geoJsonData;
  };

  @action
  setPositionData = (positionData: IPosition): void => {
    this.positionData = positionData;
  };

  @action
  setMbuAirData = (mbuData: MbuResource): void => {
    this.mbuAirData = mbuData;
  };

  @action
  setMbuEarthData = (mbuData: MbuResource): void => {
    this.mbuEarthData = mbuData;
  };

  @action
  setWallAirEntities = (mbuData: MbuResource): void => {
    if (mbuData as Array<object>) {
      mbuData?.forEach((item) => {
        let mbu = item as IMbu;

        const id = mbu!.UID ?? 0;
        const lon = mbu!.L ?? 0;
        const lat = mbu!.B ?? 0;
        const alt = mbu!.H ?? 0;

        let coordinates = [] as number[];

        if (this.wallAirEntities!.has(id)) {
          if (
            JSON.stringify(this.checkPosEntities!.get(id)) !==
            JSON.stringify([(lon * 180) / Math.PI, (lat * 180) / Math.PI, alt])
          ) {
            coordinates = this.wallAirEntities!.get(id) as number[];
            coordinates.push.apply(coordinates, [(lon * 180) / Math.PI, (lat * 180) / Math.PI, alt]);
          }
        } else {
          coordinates = [(lon * 180) / Math.PI, (lat * 180) / Math.PI, alt];
        }
        if (coordinates.length) {
          this.wallAirEntities!.set(id, coordinates);
          this.checkPosEntities!.set(id, coordinates);
        }
      });
    }
  };
}

export default new AppViewer();
