import { useState } from "react";
import Data from "./Data";
import { auth, provider } from "./firebase";
import Header from "./Header";
import Sidebar from "./Sidebar";

function App() {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("My Drive");

  const signIn = () => {
    auth.signInWithPopup(provider).then(({ user }) => {
      setUser(user);
    }).catch(error => {
      alert(error.message);
    });
  };

  return (
    <>
      {
        user ? (
          <>
            <Header photoURL={user.photoURL} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div className="App">
              <Sidebar onOptionSelect={setSelectedOption} />
              <Data searchTerm={searchTerm} selectedOption={selectedOption} />
            </div>
          </>
        ) : (
          <div className="loginWrap">
            <img src="https://logodownload.org/wp-content/uploads/2020/04/google-drive-logo-0-1.png" width="500" height="500" />
            <button onClick={signIn}>Login</button>
          </div>
        )
      }
    </>
  );
}

export default App;
