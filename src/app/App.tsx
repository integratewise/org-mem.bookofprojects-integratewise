import { RouterProvider } from 'react-router';
import { router } from './routes';
import { seedRuntimeData } from '../runtime/storage/local-store';

// Initialize canonical knowledge on first boot
seedRuntimeData();

export default function App() {
  return <RouterProvider router={router} />;
}
