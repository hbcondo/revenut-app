import { NativeBaseProvider } from 'native-base';
import { RevenutDashboard } from './components/Dashboard';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
	return (
		<NativeBaseProvider>
			<RevenutDashboard />
		</NativeBaseProvider>
	);
}