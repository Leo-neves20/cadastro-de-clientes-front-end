import RegisterUserPage from "./pages/registerUser/registerUser.page"
import GlobalStyle from "./style/global.style"
import { ChakraProvider} from '@chakra-ui/react'
import theme from "./style/theme.styled"

function App() {
  return (
    <ChakraProvider theme={theme}>
      <GlobalStyle />
      <RegisterUserPage />
    </ChakraProvider>
  )
}

export default App
