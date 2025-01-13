import './index.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import AdminNavbar from '../Components/pages/ADMIN/AdminNavbar'; // Admin Navbar
import Footer from '../Components/Footer';
import OurFood from '../Components/pages/OurFood';
import Home from '../Components/pages/Home';
import About from '../Components/pages/About';
import SignIn from '../Components/pages/SignIn';
import { ViewProvider } from '../Components/Context/Context_view';
import ViewReceipe from '../Components/pages/ViewReceipe';
import UserProfile from '../Components/pages/UserProfile';
import Register from '../Components/pages/Register';
import AdminLogin from '../Components/pages/ADMIN/AdminLogin';
import AdminHome from '../Components/pages/ADMIN/AdminHome';
import AdminRecipe from '../Components/pages/ADMIN/AdminRecipe';
import AdminUsers from '../Components/pages/ADMIN/AdminUsers';
import AdminFeedback from '../Components/pages/ADMIN/AdminFeedback';
import AdminComplaint from '../Components/pages/ADMIN/AdminComplaint';
import AdminAdd from '../Components/pages/ADMIN/AdminAdd';

function AppContent() {
  const location = useLocation();

  // Routes where neither navbar nor footer should be displayed
  const noNavbarFooterRoutes = ['/admin'];

  // Routes for admin-related pages
  const adminRoutes = ['/admin', '/admin/homepage','/admin/recipes','/admin/users','/admin/feedback','/admin/complaints','/admin/adminadd'];

  // Determine which layout components to show
  const isNoNavbarFooter = noNavbarFooterRoutes.includes(location.pathname);
  const isAdminPage = adminRoutes.includes(location.pathname);

  return (
    <ViewProvider>
      {/* Render AdminNavbar for admin pages except login */}
      {!isNoNavbarFooter && (isAdminPage ? <AdminNavbar /> : <Navbar />)}

      {/* Application Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/OurFood" element={<OurFood />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/ViewReceipe" element={<ViewReceipe />} />
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/homepage" element={<AdminHome />} />
        <Route path="/admin/recipes" element={<AdminRecipe />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/feedback" element={<AdminFeedback />} />
        <Route path="/admin/complaints" element={<AdminComplaint />} />
        <Route path="/admin/adminadd" element={<AdminAdd />} />
      </Routes>

      {/* Footer */}
      {!isNoNavbarFooter && <Footer />}
    </ViewProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
