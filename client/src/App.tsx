import { Route, Routes, useLocation } from "react-router-dom";

import { AnimatePresence } from "framer-motion";
import "./index.css";
import Layout from "./Shared/Components/Layout";
import { LandingPage } from "./Shared/Pages";
import DashBoard from "./Shared/Pages/Dashboard";
import Error from "./Shared/Pages/Error";
function App() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" key={location.key}>
      <Routes location={location} key={location.key}>
        <Route path="/Kaspi/" element={<Layout />}> {/* Protected Routes */}
          <Route index element={<LandingPage />} />

          <Route path=":accId/dashboard" element={<DashBoard />} />

          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
