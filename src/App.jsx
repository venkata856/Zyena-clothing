import Home from "./routes/home/home.component";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";

import Authentication from "./routes/authentication/authentication.component";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="auth" element={<Authentication />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
