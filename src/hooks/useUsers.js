import { useQuery } from '../OdevFetch/useQuery';
import { returnFetch } from '../OdevFetch/returnFetch';


export const useUsers = (userId) => {
  const endpoint = userId ? `users/${userId}` : 'users';
  const endpointTestDrive = `users/${userId}/test_drives`

  const { loading, payload, refetch } = useQuery({ endpoint })
  const { payload: payloadTest } = useQuery( { endpoint: endpointTestDrive } )

  const save = async (body) => {

    const method = body.id ? 'PUT' : 'POST';
    const saveEndpoint = body.id ? `user/${body.id}` : 'user';

    const data = await returnFetch({
      endpoint: saveEndpoint,
      method,
      body
    });
    return data;
  };

  const remove = async ({ id }) => {
    const data = await returnFetch({
      endpoint: `user/${id}`,
      method: 'DELETE',
    });
    return data;
  };

  return {
    loading,   
    payload, 
    payloadTest,  
    refetch,   
    save,      
    remove,   
  };
};


