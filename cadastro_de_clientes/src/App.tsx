import GlobalStyle from "./style/global.style";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./style/theme.styled";
import AllRoutes from "./routes/route.routes";

function App() {
  return (
    <>
      <AllRoutes />
      <GlobalStyle />
    </>
  );
}

export default App;
