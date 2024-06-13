

import httpRequestService from '../commonSevices/httpRequestService';

export default async ({
    setCurrentPage,
    setLoading,
  }) => {

    setLoading(true);

    await httpRequestService.get(`login/verify`)
    .then( () => setCurrentPage('profile'))
    .catch( () => { 
      setCurrentPage('login')
    })
    .finally(() => {
      setLoading(false);
    });

    return;

};
