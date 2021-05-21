import React from 'react'

/* スタイルシート */
import './styles/main.css';

/* コンポーネント */
import Todo from './components/Todo';
import Login from './components/Login';

/* ライブラリ */
import { authentication, saveUser } from "./lib/firebase";

function App() {
  
  const [user, setUser] = React.useState([]);
  
  React.useEffect(() => {
    authentication.onAuthStateChanged(async (user) => {
      let newUser = null;
      if (user) newUser = await saveUser(user);
      setUser(newUser);
      setUser(user);
    });
  }, []);
  
  const NavBar = () => {
    if (user) {
      return (
        <div class="navbar-end">
          <div class="navbar-item">
            {user.name}
          </div>
          <div class="navbar-item">
            <button class="button is-danger is-light is-small" onClick={ authentication.signOut() } > Logout</button>
          </div>
        </div >
      )
    } else {
      return (<Login />)
    }
  }
  
  return (
    <div className="container is-fluid">
      <header class="navbar">
        <NavBar />
      </header>
      <div>  
        <Todo />
      </div>  
    </div>
  );
}

export default App;
