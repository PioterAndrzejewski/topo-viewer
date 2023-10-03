import { urlConfig } from './config';
import { authService } from './auth';

export const getModelData = async (id: string) => {
  const { data } = await authService.get(
    urlConfig.model.info(id),
  );
  return data;
}