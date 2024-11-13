import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import MovieList from "./pages/MovieList";
import MovieDetails from "./pages/MovieDetails";
import NotFound from "./pages/NotFound";
import Layout from "./Components/Layout";
import { CircularProgress } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PersonDetails from "./pages/PersonPage";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Layout>
        <Suspense fallback={<CircularProgress />}>
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/person/:id" element={<PersonDetails />} />

            {/* Redirecting unknown url to 404 page */}
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
