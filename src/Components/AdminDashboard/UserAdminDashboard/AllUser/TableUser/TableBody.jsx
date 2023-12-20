// import React ,{useState , useEffect}from 'react'  
// import { UsersData } from '../../../../DummyData/DummyData'; 
// import { infoMsg } from '../../../../Global/Toastify/Toastify';
// import { useTranslation } from 'react-i18next';
// import { getAllUsers, getUser , deleteUser} from '../../../../../Redux/Reducers/user';
// import { useDispatch, useSelector } from "react-redux";
// import { Link,useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const TableBody = () => {
//   const dispatch = useDispatch();
//   const navigate =useNavigate()
//   const [queries, setQueries] = useState({
//     page: 1,
//     fieldValue: "",
//     fieldName: "",
//     searchBy: "userId",
//     searchValue: "",
//   });
//   const handlePageChange = (page) => {
//     setQueries((prevQueries) => ({ ...prevQueries, page }));
//   };

//   const [search, setSearch] = useState("");

//   const handleSearch = () => {
//     setQueries({
//       ...queries,
//       page:1,
//       searchValue: search,
//     });
//   }; 

//   useEffect(() => {
//     dispatch(getAllUsers(queries));
//   }, [dispatch, queries]);

//   const { users ,pagination } = useSelector((state) => state.user);
//   const {total, limit, page, pages}=pagination
//   // let allUsers = users.map((user) =>(user.userName))
//   let allUsers = users 

//   console.log(allUsers);

// const handleEditUser=(userId)=>{
//   dispatch(getUser(userId)).unwrap()
//   .then(() => {
//     navigate("/adminPanel/edit-user")
//   })
// }
// const handleDeleteUser = async (userId) => {
//   try {
//     await dispatch(deleteUser({ _id: userId })).unwrap();
//     toast.info("User Successfully Deleted");
//     dispatch(getAllUsers(queries));
//   } catch (backendError) {
//     toast.error(backendError.error);
//   }
// };
// //////////////////////////////////////
//   const sortData = useSelector((state) => state.GlobalSlice.sortData);
//   const searchQuery = useSelector((state) => state.GlobalSlice.searchQuery);
//   const UsersData = useSelector((state) => state.AdminSlice.users); 
//   const { t, i18n } = useTranslation();
//   const mutableUsersData = [...UsersData];

//   const DataLang = mutableUsersData.map((data) => {


//     if (i18n.language === 'ar') {
//       return ({
//         'id': data.id,
//         'title': data.titleAr,
//         'username': data.usernameAr,
//         'email': data.email,
//         'company': data.companyAr,
//         'date': data.date,
//         'action': data.actionAr
//       })
//     }
//     return data;
//   })

//   const handleDelete = (index) => {
//     dispatch(deleteUser(index))
//     infoMsg(`User of id =${index}  is Deleted`)
//   }

//     DataLang.sort((a, b) => {
//       if (sortData === 'asc') {
//         return new Date(a.date) - new Date(b.date);
//       } else {
//         return new Date(b.date) - new Date(a.date);
//       }
//     });


//   return   allUsers.filter((item) =>
//     item.username.toLowerCase().includes(searchQuery.toLowerCase())
//   ).map(user => (
//     <tr key={user.id} >
//       <td> </td>
//       {/* <td>{user.id}</td> */}
//       <td> </td>
//       <td>{user.userName}</td>
//       <td>{user.userEmail}</td>
//       {/* <td>{user.company}</td> */}
//       {/* <td>{user.date}</td> */}
//       <td className="d-flex">
//         <Link className="py-1 text-decoration-none text-primary me-2"
//              onClick={()=>handleEditUser(user._id)}
//         >{user.action[0]}</Link>
//         <Link className="py-1 text-decoration-none text-danger"
//     onClick={() => handleDeleteUser(user._id)}
//         >{user.action[1]}</Link>
//       </td>
//     </tr>
//   ));
// }

// export default TableBody



import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate directly
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllUsers, getUser, deleteUser } from '../../../../../Redux/Reducers/user';
import moment from 'moment';

const TableBody = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [queries, setQueries] = useState({
    page: 1,
    fieldValue: '',
    fieldName: '',
    searchBy: 'userId',
    searchValue: '',
  });

  const [search, setSearch] = useState('');

  const handlePageChange = (page) => {
    setQueries((prevQueries) => ({ ...prevQueries, page }));
  };

  const handleSearch = () => {
    setQueries({
      ...queries,
      page: 1,
      searchValue: search,
    });
  };

  useEffect(() => {
    dispatch(getAllUsers(queries));
  }, [dispatch, queries]);

  const { users, pagination } = useSelector((state) => state.user);
  const { total, limit, page, pages } = pagination;

  // Use map directly if you need to transform the data
  const allUsers = users.map((user) => ({
    id: user._id,
    userName: user.userName,
    userEmail: user.userEmail,
    useNumber:user.useNumber, 
    company:user.company, 
    date:moment(user.date).format('YYYY-MM-DD'),
    
  }));

  console.log(allUsers);

  const handleEditUser = (userId) => {
    dispatch(getUser(userId))
      .unwrap()
      .then(() => {
        navigate('/edituseradmindashboard');
      });
  };

  const handleDeleteUser = async (userId) => {
    try {
      await dispatch(deleteUser({ _id: userId })).unwrap();
      toast.info('User Successfully Deleted');
      dispatch(getAllUsers(queries));
    } catch (backendError) {
      toast.error(backendError.error);
    }
  };

  return allUsers
    .filter((item) =>
      item.userName.toLowerCase().includes(search.toLowerCase())
    )
    .map((user) => (
      <tr key={user.id}>
        <td> </td>
        <td>{user.useNumber}</td>
        <td> </td>
        <td>{user.userName}</td>
        <td>{user.userEmail}</td>
        <td>{user.company}</td>
        <td>{user.date}</td>
        <td className="d-flex">
          <Link
            className="py-1 text-decoration-none text-primary me-2"
            onClick={() => handleEditUser(user.id)} // Assuming 'id' is the correct property for user id
          >
        Edit
          </Link>
          <Link
            className="py-1 text-decoration-none text-danger"
            onClick={() => handleDeleteUser(user.id)} // Assuming 'id' is the correct property for user id
          >
          Delete
          </Link>
        </td>
      </tr>
    ));
};

export default TableBody;
