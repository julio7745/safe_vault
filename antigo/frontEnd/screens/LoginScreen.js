
import LoginView from './LoginViews/LoginView.js'

export default ({
    setCurrentPage,
    setLoading,
    setUser
  }) => {
    
    return (
      <LoginView {...{
        setCurrentPage,
        setLoading,
        setUser
      }}/>
    );
}
