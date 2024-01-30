
import ProfileView from './ProfileViews/ProfileView.js'

export default ({
  setCurrentPage,
  setLoading,
  user
  }) => {

    return(
      <ProfileView  {...{
        setCurrentPage,
        setLoading,
        user
      }}/>
    );
};