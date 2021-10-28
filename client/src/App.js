import Signup from './component/page/Signup'
import Container from './component/page/Container'

function App() {
  let login = localStorage.login

  return (
    <>
      {login ? <Container /> : <Signup />}
    </>
  );
}

export default App;
