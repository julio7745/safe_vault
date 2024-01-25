
import OpeningListView from './OpeningViews/OpeningListView.js';

export default ({
  setCurrentPage,
  setloading,
  user
  }) => {

    return(
      <OpeningListView  {...{
        setCurrentPage,
        setloading,
        user
      }}/>
    );
};