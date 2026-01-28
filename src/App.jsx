import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import EventsListPage from "./pages/events/EventsListPage";
import EventDetailsPage from "./pages/events/EventDetailsPage";
import EventCreatePage from "./pages/events/EventCreatePage";
import EventEditPage from "./pages/events/EventEditPage";
import ArtistsListPage from "./pages/artists/ArtistsListPage";
import ArtistDetailsPage from "./pages/artists/ArtistDetailsPage";
import ArtistCreatePage from "./pages/artists/ArtistCreatePage";
import ArtistEditPage from "./pages/artists/ArtistEditPage";
import PromotersListPage from "./pages/promoters/PromotersListPage";
import PromoterDetailsPage from "./pages/promoters/PromoterDetailsPage";
import PromoterCreatePage from "./pages/promoters/PromoterCreatePage";
import PromoterEditPage from "./pages/promoters/PromoterEditPage";

function App() {
  return (
    <>
      <Navbar />
      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/edit"
            element={
              <ProtectedRoute>
                <EditProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/events" element={<EventsListPage />} />
          <Route path="/events/new" element={<EventCreatePage />} />
          <Route path="/events/:id" element={<EventDetailsPage />} />
          <Route path="/events/:id/edit" element={<EventEditPage />} />
          <Route path="/artists" element={<ArtistsListPage />} />
          <Route path="/artists/new" element={<ArtistCreatePage />} />
          <Route path="/artists/:id" element={<ArtistDetailsPage />} />
          <Route path="/artists/:id/edit" element={<ArtistEditPage />} />
          <Route path="/promoters" element={<PromotersListPage />} />
          <Route path="/promoters/new" element={<PromoterCreatePage />} />
          <Route path="/promoters/:id" element={<PromoterDetailsPage />} />
          <Route path="/promoters/:id/edit" element={<PromoterEditPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
