import { useEffect, useState } from 'react'
import { getModelData } from '../services/model';

export const useModel = (id: string) => {
  const [modelUrl, setModelUrl] = useState("");
  const [materialUrl, setMaterialUrl] = useState("");

  useEffect(()=>{
    const handleGetModel = async () => {
      const modelData = await getModelData(id)
      setModelUrl(modelData.data.attributes.model_main.data.attributes.url);
    };

    handleGetModel();
  }, [])

  return {modelUrl, materialUrl}
}