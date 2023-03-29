import GlobalStyle from "./style/global.style";
import AllRoutes from "./routes/route.routes";
import { ToastContainer } from "react-toastify";
import AutorizationContext from "./context/authorization.context";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <AutorizationContext>
        <AllRoutes />
        <GlobalStyle />
      </AutorizationContext>
    </>
  );
}

export default App;
