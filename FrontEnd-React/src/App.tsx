import { Route, Routes } from "react-router-dom";
import ShowBoard from "./board/ShowBoard";
import BoardHome from "./board/BoardHome";
import AppContainer from "./components/AppContainer";
import SnackbarComponent from "./components/SnackBar";
import Login from "./user/Login";
import Register from "./user/Register";

import { getOptions } from "./utils/utils";

function App() {
  return (
    <>
      <AppContainer navigation={getOptions()}>
        <Routes>
          <Route path="/test" element={<h1>Test</h1>} />
          <Route path="/board/:board_id" element={<ShowBoard />} />
          <Route path="/board" element={<BoardHome />} />
          <Route path="/register-user" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<h1>Welcome To Ta Te Ti</h1>} />
        </Routes>
      </AppContainer>
      <SnackbarComponent />
    </>
  );
}

export default App;
