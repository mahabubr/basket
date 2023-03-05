import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import route from './router/route';

function App() {
  return (
    <div className='container mx-auto overflow-x-hidden'>
      <RouterProvider router={route} />
      <Toaster />
    </div>
  );
}

export default App;
