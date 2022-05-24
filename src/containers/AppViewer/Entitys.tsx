import React from 'react';
import * as Cesium from 'cesium';
import { GeoJsonDataSource, Context, useCesium } from 'resium';
import { air, earth } from './glb';

interface Iprops {
  mbuAirData: Array<object> | undefined;
  mbuEarthData: Array<object> | undefined;
  wallAirEntities: Map<string, number[]> | undefined;
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

function MColor(color: number, arg: number): Cesium.Color | Cesium.Property | undefined {
  const map = new Map([
    [0, Cesium.Color!.RED.withAlpha(arg)],
    [1, Cesium.Color!.GREEN.withAlpha(arg)],
    [2, Cesium.Color!.BLUE.withAlpha(arg)],
    [3, Cesium.Color!.PURPLE.withAlpha(arg)],
    [4, Cesium.Color!.BROWN.withAlpha(arg)],
  ]);
  return map.get(color);
}

const Entitys: React.FunctionComponent<Iprops> = ({ mbuAirData, mbuEarthData, wallAirEntities }) => {
  const context: Context = useCesium();

  if (mbuAirData as Array<object>) {
    mbuAirData?.forEach((item) => {
      let mbu = item as IMbu;

      let sEntity: Cesium.Entity | undefined;
      sEntity = (context.viewer as Cesium.Viewer).entities.getById(mbu.UID) ?? undefined;

      const heading = Cesium.Math.toRadians(mbu.Q + 270) as number;
      const pitch = 0 as number;
      const roll = 0 as number;
      const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);

      let position = Cesium.Cartesian3.fromDegrees(
        mbu!.L * Cesium.Math.DEGREES_PER_RADIAN,
        mbu!.B * Cesium.Math.DEGREES_PER_RADIAN,
        mbu!.H
      ) as Cesium.Cartesian3;

      let orientation = Cesium.Transforms.headingPitchRollQuaternion(
        position as Cesium.Cartesian3,
        hpr
      ) as unknown as Cesium.Ellipsoid;

      if (sEntity) {
        let orientation = Cesium.Transforms.headingPitchRollQuaternion(
          position as Cesium.Cartesian3,
          hpr
        ) as unknown as Cesium.Ellipsoid;

        sEntity!.model!.color = (MColor(mbu.color, 1) as Cesium.Property) ?? undefined;
        sEntity!.position = position as unknown as Cesium.PositionProperty;
        sEntity!.orientation = orientation as unknown as Cesium.Property;
        sEntity!.name = mbu!.name ?? undefined;
        sEntity!.description = mbu!.description as unknown as Cesium.Property;

        sEntity.wall = new Cesium.WallGraphics({
          material: (MColor(mbu.color, 0.1) as Cesium.MaterialProperty) ?? undefined,
          outline: true,
          outlineColor: Cesium.Color.GREY,
          positions: new Cesium.CallbackProperty(() => {
            let points = (wallAirEntities!.get(mbu!.UID) as unknown as number[]) ?? undefined;
            return Cesium.Cartesian3.fromDegreesArrayHeights(points);
          }, false),
        });
      }

      if (sEntity === undefined) {
        let model = new Cesium.ModelGraphics({
          uri: air,
          minimumPixelSize: 128,
          maximumScale: 20,
          scale: 0.5,
          color: MColor(mbu.color, 1),
        });

        let wall = new Cesium.WallGraphics({
          material: (MColor(mbu.color, 0.1) as Cesium.MaterialProperty) ?? undefined,
          outline: true,
          outlineColor: Cesium.Color.GREY,
          positions: new Cesium.CallbackProperty(() => {
            let points = (wallAirEntities!.get(mbu!.UID) as unknown as number[]) ?? undefined;
            return Cesium.Cartesian3.fromDegreesArrayHeights(points);
          }, false),
        });

        let entity = new Cesium.Entity({
          id: mbu.UID,
          name: mbu.name,
          description: mbu.description,
          position: Cesium.Cartesian3.fromDegrees(
            mbu!.L * Cesium.Math.DEGREES_PER_RADIAN,
            mbu!.B * Cesium.Math.DEGREES_PER_RADIAN,
            mbu!.H
          ) as Cesium.Cartesian3,
          orientation: new Cesium.CallbackProperty(() => {
            return orientation;
          }, false),
          wall: wall,
          model: model,
        });

        (context.viewer as Cesium.Viewer).entities.add(entity);
      }
    });
  }

  if (mbuEarthData as Array<object>) {
    mbuEarthData?.forEach((item) => {
      let mbu = item as IMbu;

      let sEntity: Cesium.Entity | undefined;
      sEntity = (context.viewer as Cesium.Viewer).entities.getById(mbu.UID) ?? undefined;

      const heading = Cesium.Math.toRadians(mbu.Q + 270) as number;
      const pitch = 0 as number;
      const roll = 0 as number;
      const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);

      let position = Cesium.Cartesian3.fromDegrees(
        mbu!.L * Cesium.Math.DEGREES_PER_RADIAN,
        mbu!.B * Cesium.Math.DEGREES_PER_RADIAN,
        mbu!.H
      ) as Cesium.Cartesian3;

      if (sEntity) {
        sEntity!.model!.color = (MColor(mbu.color, 1) as Cesium.Property) ?? undefined;
        sEntity!.position = position as unknown as Cesium.PositionProperty;
        sEntity!.name = mbu!.name ?? undefined;
        sEntity!.description = mbu!.description as unknown as Cesium.Property;
      }

      if (sEntity === undefined) {
        let model = new Cesium.ModelGraphics({
          uri: earth,
          minimumPixelSize: 128,
          maximumScale: 10,
          scale: 0.5,
          color: MColor(mbu.color, 1),
        });

        let entity = new Cesium.Entity({
          id: mbu.UID,
          name: mbu.name,
          description: mbu.description,
          position: Cesium.Cartesian3.fromDegrees(
            mbu!.L * Cesium.Math.DEGREES_PER_RADIAN,
            mbu!.B * Cesium.Math.DEGREES_PER_RADIAN,
            mbu!.H
          ) as Cesium.Cartesian3,
          model: model,
        });

        (context.viewer as Cesium.Viewer).entities.add(entity);
      }
    });
  }

  return <div />;
};

export default React.memo(Entitys);
