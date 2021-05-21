import React from 'react'

/* スタイルシート */
import './styles/main.css';

/* コンポーネント */
import Todo from './components/Todo';
import Login from './components/Login';
import Image from './components/Image';

/* ライブラリ */
import { authentication, saveUser, updateUser } from "./lib/firebase";

function App() {
  
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState([]);
  
  React.useEffect(() => {
    authentication.onAuthStateChanged(async (user) => {
      setLoading(false);
      let newUser = null;
      if (user) newUser = await saveUser(user);
      setUser(newUser);
      setUser(user);
    });
  }, []);
  
  const logout = () => {
    authentication.signOut();
  };
  
  const NavBar = () => {
    if (user) {
      return (
        <div class="navbar-end">
          <div class="navbar-item">
            <Image userImage={user.image} onSelectedImage={handleImageChanged} />
            {user.name}
          </div>
          <div class="navbar-item">
            <button class="button is-danger is-light is-small" onClick={logout} > Logout</button>
          </div>
        </div >
      )
    } else {
      return (<Login />)
    }
  }
  
  const handleImageChanged = async imageUrl => {
    await updateUser(user, imageUrl);
  }
  
  return (
    <div className="container is-fluid">
      <header class="navbar">
        {loading ? (
          <p>
            LOADING.....
          </p>
        ) : (
          <NavBar />
        )}
      </header>
      <div> 
        {user && <Todo />}
      </div>  
    </div>
  );
}

export default App;
