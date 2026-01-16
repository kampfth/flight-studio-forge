/**
 * Application Entry Point
 * Responsibility: Mount React application to DOM
 */
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(<App />);
