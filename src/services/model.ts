import { urlConfig } from './config';
import { authService } from './auth';
import { Coordinates } from '../types/types';



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

enum RouteTypes {
  Trad = "trad",
  Sport = "sport",
  Boulder = "boulder",
}

type ApiCoordinates = {
  latitude: number;
  longtitude: number;
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

type RouteModelData = {
  id: string;
  attributes: {
    createdAt: string;
    publishedAt: string;
    route_name: string;
    updatedAt: string;
    rings_model: {
      data: MediaData;
    };
    route_model: {
      data: MediaData;
    }
    outline_model: {
      data: MediaData;
    }
  }
}

type ModelRockData  = {
  attributes: {
    created_at: string;
    published_at: string;
    rock: {
      data: RockData,
    },
    uuid: string;
    model_main: {data: MediaData};
    model_txt: {data: MediaData};
  },
  id: number;
}

type RouteData = {
  attributes: {
    Grade: number;
    Name: string;
    Type: RouteTypes;
    createdAt: string;
    display_name: string;
    publishedAt: string;
    updatedAt: string;
    uuid: string;
    model_route: {
      data: RouteModelData;
    }
  },
  id: number;
}

type AreaData = {
  id: number;
  attributes: {
    cover: {
      data: MediaData
    };
    createdAt: string;
    location: ApiCoordinates;
    name: string;
    publishedAt: string;
    updatedAt: string;
    uuid: string;
  }
}

type SectorData = {
  id: number;
  attributes: {
    area: {
      data: AreaData
    };
    createdAt: string;
    location: ApiCoordinates;
    name: string;
    publishedAt: string;
    updatedAt: string;
    uuid: string;
  }
}

type RockData = {
  attributes: {
    coordinates: ApiCoordinates;
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
    model_rock: {
      data: ModelRockData
    }
    routes: {
      data: RouteData[];
    };
    sector: {
      data: SectorData;
    }
    updatedAt: string;
    uuid: string;
    walk_distance: number;
  },
  id: number,
}

export const getRockData = async (id: string) => {
  const { data: {data} } = await authService.get(
    urlConfig.rock.info(id)
  );
  return data[0] as RockData;
}