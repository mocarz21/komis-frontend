import { useQuery } from '../OdevFetch/useQuery';
import { returnFetch } from '../OdevFetch/returnFetch';

export const useTestDrives = (testDriveId) => {

  const endpoint = testDriveId ? `drives/${testDriveId}` : 'drives';
  const endpointCarsTestData = `drives/car/${testDriveId}`;

  const { loading, payload, refetch } = useQuery({ endpoint });
  const { payload: payloadCarsTestData } = useQuery({ endpoint: endpointCarsTestData });
  console.log('testDriveId',testDriveId)

  const save = async (body) => {
    // Zwraca nam utworzony obiekt (w tym np. id, user_first_name, car_brand, itp.)
    const data = await returnFetch({
      endpoint: 'drives',   // POST idzie na listę
      method: 'POST',
      body,
    });
    return data;
  };

  /**
   * remove - funkcja do usunięcia wybranej jazdy próbnej (DELETE).
   * Przyjmuje obiekt { id }, który wskazuje jazdę do usunięcia.
   */
  const remove = async (id) => {
    const data = await returnFetch({
      endpoint: `drives/${id}`, 
      method: 'DELETE',
    });
    return data;
  };

  return {
    payloadCarsTestData,
    loading,
    payload,
    refetch,
    save,
    remove,
  };
};