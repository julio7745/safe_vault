
import LoginView from './LoginViews/LoginView.js'

export default ({
    setCurrentPage,
    setloading,
    setUser
  }) => {
    
    return (
      <LoginView {...{
        setCurrentPage,
        setloading,
        setUser
      }}/>
    );
}
