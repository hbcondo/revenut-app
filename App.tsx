import { NativeBaseProvider } from 'native-base';
import { RevenutDashboard } from './components/Dashboard';

export default function App() {
	return (
		<NativeBaseProvider>
			<RevenutDashboard />
		</NativeBaseProvider>
	);
}