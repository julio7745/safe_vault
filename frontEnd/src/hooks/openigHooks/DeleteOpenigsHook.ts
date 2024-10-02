
import HttpRequestHook from '@/hooks/commonHooks/HttpRequestHook';

import { useLoading } from '@/contexts/LoadingContext';

export default () => {

  const httpRequestServices = HttpRequestHook()

  const { setLoading } = useLoading();

  const DeleteOpenigsHook = {

    DeleteOpenig: async ({
      _id,
    }:{
      _id: string,
    }) => {

      setLoading(true);

      const url = _id === 'all' ? 'opening/clear' : `opening/delete/${_id}`

      await httpRequestServices.get(url)
      setLoading(false);
          
    }
  }

  return DeleteOpenigsHook

};



