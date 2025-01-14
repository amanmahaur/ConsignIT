import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { AuthLayout, Login } from './components/index.js'
import Notifications from './pages/Notifications.jsx'
import Results from './pages/Results'
import AddPost from "./pages/AddPost";
import Signup from './pages/SignUp'
import EditPost from "./pages/EditPost";
import MyPosts from './pages/MyPosts.jsx'
import Post from "./pages/Post";
import BuyPost from './pages/BuyPost.jsx'
import Buyers from './pages/Buyers.jsx'
import AllPosts from "./pages/AllPosts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AllPosts />
                </AuthLayout>
            ),
        },
        
        {
            path: "/notifications",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <Notifications />
                </AuthLayout>
            ),
        },
        {
            path: "/my-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <MyPosts />
                </AuthLayout>
            ),
        },
        {   path:"/results",
            element:(
                <AuthLayout authentication>
                    {" "}
                    <Results/>
                </AuthLayout>
            )

        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/buy-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <BuyPost />
                </AuthLayout>
            ),
        },
        {
            path: "/buyers/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <Buyers />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)