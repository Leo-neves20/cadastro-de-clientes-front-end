import RegisterUserPage from "./pages/registerUser/registerUser.page"
import GlobalStyle from "./style/global.style"
import { ChakraProvider} from '@chakra-ui/react'
import theme from "./style/theme.styled"
import LoginUserPage from "./pages/loginUser/loginUser.psge"

function App() {
  return (
    <ChakraProvider theme={theme}>
      <GlobalStyle />
        <LoginUserPage />
      {/* <RegisterUserPage /> */}
    </ChakraProvider>
  )
}

export default App
