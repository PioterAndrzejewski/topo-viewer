import { useEffect, useState } from "react";
import { getRockData } from "../services/model";
import { RouteModelShortData } from "../types/types";

export const useRock = (id: string) => {
  const [modelUrl, setModelUrl] = useState("");
  const [materialUrl, setMaterialUrl] = useState("");
  const [routes, setRoutes] = useState<RouteModelShortData[] | null>(null);

  useEffect(() => {
    const handleGetRock = async () => {
      const rockData = await getRockData(id);
      setModelUrl(
        rockData.attributes.model_rock.data.attributes.model_main.data
          .attributes.url,
      );
      setMaterialUrl(
        rockData.attributes.model_rock.data.attributes.model_txt.data.attributes
          .url,
      );
      const routesShortData: RouteModelShortData[] =
        rockData.attributes.routes.data.map((route) => {
          return {
            uuid: route.attributes.uuid,
            name: route.attributes.display_name,
            pathUrl:
              route.attributes.model_route.data.attributes.route_model.data
                .attributes.url,
            ringsUrl:
              route.attributes.model_route.data.attributes.rings_model.data
                .attributes.url,
            outlineUrl:
              route.attributes.model_route.data.attributes.outline_model.data
                .attributes.url,
          };
        });
      setRoutes(routesShortData);
    };
    handleGetRock();
  }, [id]);

  return { modelUrl, materialUrl, routes };
};
