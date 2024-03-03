
import OpeningListView from './OpeningViews/OpeningListView.js';

export default ({
  setCurrentPage,
  setLoading,
  user
  }) => {

    return(
      <OpeningListView  {...{
        setCurrentPage,
        setLoading,
        user
      }}/>
    );
};