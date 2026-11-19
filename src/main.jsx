import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/global.css';
import './styles/portfolio.css';
import App from './App.jsx';

const root = document.getElementById('root');
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
// Static files represent the default view. A filtered gallery, fragment handoff,
// restored history state or a contextual 404 can have a different initial tree.
if (root.dataset.page === location.pathname && !location.search && !location.hash && !history.state?.usr) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
