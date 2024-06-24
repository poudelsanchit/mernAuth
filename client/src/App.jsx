import RoutesPage from "./RoutesPage";
import axios from "axios";

import {ToastContainer} from 'react-toastify'
import {UserContextProvider} from '../context/userContext'

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;
function App() {
  return (
    <UserContextProvider>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <RoutesPage />
    </UserContextProvider>
  );
}

export default App;
