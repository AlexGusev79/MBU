// import 'cesium-tdt/dist/cesiumTdt.js';
import { UrlTemplateImageryProvider, WebMercatorTilingScheme } from 'cesium';

const token = 'e60679f6e9718d3426f745fd8cd94cbd';
const tdtUrl = 'https://t{s}.tianditu.gov.cn/';
const subdomains = ['0', '1', '2', '3', '4', '5', '6', '7'];

export const td_img_imageryProvider = {
  url: 'giswebservice/GISWebServiceSE/service.php?',
  layer: 'BlueMarble3857',
  style: 'default',
  format: 'image/png',
  tileMatrixSetID: 'urn:ogc:def:wkss:OGC:1.0:GoogleMapsCompatible',
  maximumLevel: 20,
};
export const td_cia_imageryProvider = {
  url: 'giswebservice/GISWebServiceSE/service.php?',
  layer: 'BlueMarble3857',
  style: 'default',
  format: 'image/png',
  tileMatrixSetID: 'urn:ogc:def:wkss:OGC:1.0:GoogleMapsCompatible',
  maximumLevel: 20,
};

const imgMap = new UrlTemplateImageryProvider({
  url: tdtUrl + 'DataServer?T=img_w&x={x}&y={y}&l={z}&tk=' + token,
  subdomains: subdomains,
  tilingScheme: new WebMercatorTilingScheme(),
  maximumLevel: 18,
});
const imgAnnoMap = new UrlTemplateImageryProvider({
  url: tdtUrl + 'DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=' + token,
  subdomains: subdomains,
  tilingScheme: new WebMercatorTilingScheme(),
  maximumLevel: 18,
});

const iboMap = new UrlTemplateImageryProvider({
  url: tdtUrl + 'DataServer?T=ibo_w&x={x}&y={y}&l={z}&tk=' + token,
  subdomains: subdomains,
  tilingScheme: new WebMercatorTilingScheme(),
  maximumLevel: 10,
});

const terrainUrls = subdomains.map((item) => tdtUrl.replace('{s}', item) + 'mapservice/swdx?tk=' + token);
// const provider = new Cesium!.GeoTerrainProvider({
//   urls: terrainUrls,
// });
