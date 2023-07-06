import { NativeBaseProvider } from 'native-base';
import { Dashboard } from './components/Dashboard';

export default function App() {
  return (
    <NativeBaseProvider>
      <Dashboard />
    </NativeBaseProvider>
  );
}