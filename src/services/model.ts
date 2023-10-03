import { urlConfig } from './config';
import { authService } from './auth';

enum ExhibitionType {
  North = "north",
  South = "south",
  East = "east",
  West = "west",
  Trees = "trees",
}

enum FormationType {
  Slab = "slab",
  Vertical = "vertical",
  Overhang = "overhang",
  Roof = "roof",
}

enum PopularityType {
  High = "high",
  Medium = "medium",
  Low = "low",
}

type RockData = {
  attributes: {
    climbing_restricted: boolean;
    createdAt: string;
    exhibition: ExhibitionType;
    formation: FormationType;
    height: number;
    loose_rocks: boolean;
    name: string;
    popularity: PopularityType;
    published_at: string;
    recommented: boolean;
    updatedAt: string;
    uuid: string;
    walk_distance: number;
  },
  id: number,
}

type ImageFormat = {
  ext: string;
  hash: string;
  height: number;
  mime: string;
  name: string;
  path: any;
  size: number;
  url: string;
  width: string;
}

type ImageFormats = {
  large: ImageFormat;
  medium: ImageFormat;
  small: ImageFormat;
  thumbnail: ImageFormat;
}

type MediaData = {
  attributes: {
    alternativeText: any;
    caption: any;
    createdAt: string | any;
    ext: string | any;
    formats: ImageFormats | any;
    hash: string | any;
    height: number | any;
    mime: string | any;
    name: string | any;
    previewUrl: any;
    provider: string | any;
    provider_metadata: any;
    size: number | any;
    updatedAt: string | any;
    url: string | any;
    width: any;
  },
  id: number;
}

type ModelData  = {
  attributes: {
    created_at: string;
    published_at: string;
    rock: {
      data: RockData,
    },
    uuid: string;
    model_main: {data: MediaData};
    model_txt: {data: MediaData};
    routes: MediaData[];
  },
  id: number;
}

export const getModelData = async (id: string) => {
  const { data: {data} } = await authService.get(
    urlConfig.model.info(id),
  );
  console.log(data)
  console.log(ExhibitionType.North)
  return data as ModelData;
}