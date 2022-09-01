import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
const theme = extendTheme({
  // colors: {
  //   brand: {
  //     black: "#16161a",
  //     white: "#fffffe",
  //     lightgray: "#94a1b2",
  //     violet: "#7f5af0",
  //     gray: "#242629",
  //     blue: "#3182CE"
  //   }
  // },
  fonts: {
    heading: "Nunito",
    body: "Montserrat Alternates"
  }
})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
