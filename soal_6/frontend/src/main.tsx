import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import { ConfigProvider } from 'antd'
import AddProduct from './AddProduct.tsx'
import EditProduct from './EditProduct.tsx'

const client = new ApolloClient({
  uri: 'http://127.0.0.1:8080/query',  // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <ConfigProvider theme={{ token: { colorError: '#FF748B' } }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </ApolloProvider>
  </StrictMode>,
)
