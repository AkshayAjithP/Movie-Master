import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./stylesheets/alignments.css";
import "./stylesheets/sizes.css";
import "./stylesheets/custom.css";
import "./stylesheets/form-elements.css";
import "./stylesheets/theme.css";
import ProductetedRoute from "./components/ProductetedRoute";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import TheatresForMovie from "./pages/TheatresForMovie";
import BookShow from "./pages/BookShow";

function App() {
  const { loading } = useSelector((state) => state.loaders);

  return (
    <div>
      {loading && (
        <div className="loader-parent">
          <div className="loader"></div>
        </div>
      )}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProductetedRoute>
                <Home />
              </ProductetedRoute>
            }
          />
          <Route
            path="/movie/:id"
            element={
              <ProductetedRoute>
                <TheatresForMovie />
              </ProductetedRoute>
            }
          />
          <Route
            path="/book-show/:id"
            element={
              <ProductetedRoute>
                <BookShow />
              </ProductetedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProductetedRoute>
                <Profile />
              </ProductetedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProductetedRoute>
                <Admin />
              </ProductetedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
