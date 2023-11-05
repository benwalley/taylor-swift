import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Header from "./components/Header/Header";
import RightSidebar from "./components/RightSidebar/RightSidebar";
import MainPage from "./components/Pages/MainPage";
import AdminPage from "./components/Pages/AdminPage";
import './App.css'
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage/>,
    },
    {
        path: "/admin",
        element: <AdminPage/>,
    },
]);

const contentStyles = {
    display: 'grid',
    gridTemplateColumns: '1fr 400px',
    gridTemplateRows: '65px 1fr',
    height: '100vh',
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RecoilRoot>
          <div style={contentStyles}>
              <Header/>
              <RouterProvider router={router} />
          </div>
      </RecoilRoot>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
