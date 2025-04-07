import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {SignUp, Login, Dashboard, Todo, StopWatch, Calculator, QRCodeGenerator} from '../src/Screens';
import { ProtectedRouting } from '../src/Route/ProtectedRouting/ProtectedRouting';
import { PublicRouting } from '../src/Route/PublicRouting/PublicRouting';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PublicRouting />}>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<ProtectedRouting />}>
        <Route path="/home" element={<Dashboard />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/stopwatch" element={<StopWatch />} />
          <Route path="/simple-calculator" element={<Calculator />} />
          <Route path="/qr" element={<QRCodeGenerator />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;