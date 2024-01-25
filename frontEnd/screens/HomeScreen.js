
import HomeView from './HomeViews/HomeView.js';

export default ({
    currentPage, setCurrentPage,
    setLoading,
    user, setUser
  }) => {

    return (
      <HomeView  {...{
        currentPage, setCurrentPage,
        setLoading,
        user, setUser
      }}/>
    );
};
