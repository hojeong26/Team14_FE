import { fetchInstance } from '@api/instance';
import { useQuery } from '@tanstack/react-query';

export interface StoreListParams {
  id: number;
  category: string;
  minimumOrderAmount: number;
  deadlineTime: string;
  pickUpLocation: string;
  storeName: string;
  lat: number;
  lng: number;
}

interface RequestParams {
  lat: number;
  lng: number;
}

const getPath = ({ lat, lng }: RequestParams) => {
  return `http://3.34.191.43:8080/api/v1/spot/${lat}/${lng}`;
};

const getSpotInfo = async ({ lat, lng }: RequestParams) => {
  const response = await fetchInstance.get<StoreListParams[]>(
    getPath({ lat, lng }),
  );
  return response.data;
};

export const useGetSpotInfo = ({ lat, lng }: RequestParams) => {
  return useQuery({
    queryKey: [{ lat, lng }],
    queryFn: () => getSpotInfo({ lat, lng }),
  });
};
