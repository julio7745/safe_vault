
import HomeView from './HomeViews/HomeView.js';

export default ({
    currentPage, setCurrentPage,
    setloading,
    user, setUser
  }) => {

    return (
      <HomeView  {...{
        currentPage, setCurrentPage,
        setloading,
        user, setUser
      }}/>
    );
};
