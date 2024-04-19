import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import {BrowserRouter} from "react-router-dom";
import GlobalProvider from "./store/global/GlobalProvider";
import { ToastContainer } from "react-toastify";

const colors = {
    brand: {
        900: "#1a365d",
        800: "#153e75",
        700: "#2a69ac",
    },
    xususisari: {
        700: "#f321",
    },
};
const theme = extendTheme({ colors });

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
      <ChakraProvider theme={theme}>
          <GlobalProvider>
              <BrowserRouter>
                  <App />
                  <ToastContainer />
              </BrowserRouter>
          </GlobalProvider>
      </ChakraProvider>
  // </React.StrictMode>,
)
