import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ScrollToTopButton from './Components/ScrollToTopButton/ScrollToTopButton';
// import HomePage from './Components/HomePage/HomePage';
import Services from './Components/Services/Services';
import About from './Components/About/About';
import Blogs from './Components/Blogs/Blogs';
import Contacts from './Components/Contacts/Contacts';
import Login from './Components/Auth/Login/Login';
import Register from './Components/Auth/Register/Register';
import { useSelector } from 'react-redux';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import TogleTheme from './Components/Global/TogleTheme/TogleTheme';
import { settoggleDark } from './Redux/Reducers/GlobalSlice';
import Chat from './Components/Chat/Chat';
import SingleBlog from './Components/Blogs/SingleBlog';
import Home from './Components/Home/Home';
import UserAdminDashboard from './Components/AdminDashboard/UserAdminDashboard/AllUser/UserAdminDashboard';
import BlogsAdminDashboard from './Components/AdminDashboard/BlogsAdminDashboard/AllNewBlog/BlogsAdminDashboard';
import AddNewUserAdmin from './Components/AdminDashboard/UserAdminDashboard/AddUserAdmin/AddNewUserAdmin';
import AddNewBlogAdmin from './Components/AdminDashboard/BlogsAdminDashboard/AddNewBlogAdmin/AddNewBlogAdmin';
import SettingAdminDashboard from './Components/Global/Dashboard/SettingAdminDashboard/SettingAdminDashboard';
import ServicesUserDashboard from './Components/UserDashboard/ServicesUserDashboard/ServicesUserDashboard';
import PersonalPapersUser from './Components/UserDashboard/PapersUser/PersonalPapersUser/PersonalPapersUser';
import CompanyPapersUser from './Components/UserDashboard/PapersUser/CompanyPapersUser/CompanyPapersUser';
import AddNewServiesUser from './Components/UserDashboard/ServicesUserDashboard/AddNewServiesUser/AddNewServiesUser';
import ViewPapers from './Components/UserDashboard/PapersUser/CompanyPapersUser/ViewPapers';

import EditUserAdmin from './Components/AdminDashboard/UserAdminDashboard/EditUserAdmin/EditUserAdmin';
import ServicesAdminDashboard from './Components/AdminDashboard/ServicesAdminDashboard/AllServices/ServicesAdminDashboard';
import AddServicesAdminDashboard from './Components/AdminDashboard/ServicesAdminDashboard/AddNewServices/AddNewServices';
import AddNewServiesAdmin from './Components/AdminDashboard/ServicesAdminDashboard/AddNewServiesUser';
import PapersAdmin from './Components/AdminDashboard/PapersAdmin/CompanyPapersUser';

// import { ThemeProvider } from 'react-bootstrap';
// eos



function App() {

  const { isAuthenticated: login } = useSelector((state) => state.user);
  const userRole = useSelector((state) => state.user?.user?.role);

  // const login = useSelector((state) => state.UserSlice.login);
  // const userRole = useSelector((state) => state.UserSlice.userRole);
  const toggleDark = useSelector((state) => state.GlobalSlice.toggleDark);


  const myTheme = createTheme({
    palette: {
      mode: toggleDark ? "dark" : "light",
      primary: { main: '#018dff' },
      text: { disabled: '#018dff' }
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "linear-gradient( rgba(255, 255, 255, 0.16), rgb(1 141 255 / 43%), rgba(255, 255, 255, 0.16))"
          },
        },
      },
    },
  });


  return (
    <ThemeProvider theme={myTheme}>
      <CssBaseline />
      <TogleTheme toggleDark={toggleDark} settoggleDark={settoggleDark} />

      {/* ------------------------- Gobal -----------------------------------------*/}
      <ScrollToTopButton />
      <ToastContainer />
      {/* ------------------------- Gobal -----------------------------------------*/}
      <Routes>
        {/* ------------------------- Common routes -----------------------------------------*/}

        {/* <Route path="/*" element={<HomePage />} /> */}
        <Route path="/*" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/contact us" element={<Contacts />} />
        <Route path="/singleblog/:id" element={<SingleBlog />} />
        <Route path="/chat" element={<Chat />} />

        {/* ------------------------- /Common routes -----------------------------------------*/}


        {/* ----------------------------------- Auth -----------------------------------------*/}

        {!login && <Route path="/login" element={<Login />} />}
        {!login && userRole == null && <Route path="/register" element={<Register />} />}
        {/* ----------------------------------- Auth -----------------------------------------*/}


        {/* ------------------------- Dashboard -----------------------------------------*/}
        {/* {login && userRole === 'Admin' && <Route path="/admindashboard" element={<AdminDashboard />} />} */}

        {login && <Route path="/settingsdashboard" element={<SettingAdminDashboard />} />}
        {/* ------------------------ /Dashboard -----------------------------------------*/}

        {/* ------------------------ Admin Dashboard -----------------------------------------*/}

        {login && userRole === 'Admin' && <Route path="/useradmindashboard" element={<UserAdminDashboard />} />}
        {login && userRole === 'Admin' &&  <Route path="/addnewuseradmindashboard" element={<AddNewUserAdmin />} />}
        {login && userRole === 'Admin' &&  <Route path="/edituseradmindashboard" element={<EditUserAdmin />} />}


        {login && userRole === 'Admin' && <Route path="/servicesadmindashboard" element={<ServicesAdminDashboard />} />}
        {login && userRole === 'Admin' && <Route path="/addnewservicesadmindashboard" element={<AddServicesAdminDashboard type = 'new'/>} />}
        {login && userRole === 'Admin' && <Route path="/editourservicesadmindashboard/:id" element={<AddServicesAdminDashboard type = 'edit' />} />}
        {login && userRole === 'Admin' && <Route path="/showOurservicesadmindashboard" element={< AddNewServiesAdmin />} />}
        
        {login && userRole === 'Admin' && <Route path="/showpapersdmindashboard" element={< PapersAdmin />} />}
        {/* {login && userRole === 'Admin' && <Route path="/showpapersdmindashboard" element={< PersonalPapersUser />} />} */}

        {login && userRole === 'Admin' && <Route path="/blogsadmindashboard" element={<BlogsAdminDashboard />} />}
        {login && userRole === 'Admin' && <Route path="/addnewblogsadmindashboard" element={<AddNewBlogAdmin />} />}
        {login && userRole === 'Admin' && <Route path="/editblogsadmindashboard/:id" element={<AddNewBlogAdmin type={'edit'} />} />}
        
        {/* ------------------------- /Admin Dashboard -----------------------------------------*/}

        {/* ------------------------- User Dashboard -----------------------------------------*/}
        {login && userRole === 'User' && <Route path="/servicesuserdashboard" element={<ServicesUserDashboard />} />}
        {/* {login && userRole === 'User' && <Route path="/personalpapersuser" element={< PersonalPapersUser />} />} */}
        {login && userRole === 'User' && <Route path="/personalpapersuser" element={<CompanyPapersUser type='personal' />} />}
        {login && userRole === 'User' && <Route path="/companypapersuser" element={<CompanyPapersUser type='company' />} />}
        {login && userRole === 'User' && <Route path="/addnewserviesuser" element={< AddNewServiesUser />} />}
        {login && userRole === 'User' && <Route path="/viewpapers" element={< ViewPapers />} />}

        {/* ------------------------ /User Dashboard -----------------------------------------*/}


{/*
1- conditions for routes 
2- logout for user dashboard and admin dashboard
3- create new folder in admin dashoard (AllServices) and move old folders and file for it ---> and Edit paths in there files and App.js file
4- create new servies for admin dashboard
5-  edit title header for BlogsAdminDashboard file from (all blogs) to (add new blog)
6- pass pram (display={'display'}) to DashboardHeader component (as hide sort and search inputs for add new) in BlogsAdminDashboard file
7- pass pram (display={'display'}) to DashboardHeader component in AddNewServiesUser file
8- change this condition (${toggleDark ? 'bg-dark text-light' : 'bg-light text-light'}`)
                      to (${toggleDark ? 'bg-dark text-light' : 'bg-light text-dark'}`)
9- move the curly bracket to validate the previous condation 
10- selected options for services for user dashboard 

*/}
        
      </Routes>
    </ThemeProvider>
  );
}

export default App;
