
import OpeningListView from './OpeningViews/OpeningListView.js';

export default ({
  setCurrentPage,
  setLoading,
  user,
  setImagesLoading,
  imagesLoading
  }) => {

    return(
      <OpeningListView  {...{
        setCurrentPage,
        setLoading,
        user,
        setImagesLoading,
        imagesLoading
      }}/>
    );
};