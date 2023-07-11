import { NativeBaseProvider } from 'native-base';
import { RevenutDashboard } from './components/Dashboard';
import * as WebBrowser from 'expo-web-browser';

import * as serviceWorkerRegistration from "./src/serviceWorkerRegistration";

/* https://docs.expo.dev/guides/authentication/ */
WebBrowser.maybeCompleteAuthSession();

export default function App() {
	return (
		<NativeBaseProvider>
			<RevenutDashboard />
		</NativeBaseProvider>
	);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();