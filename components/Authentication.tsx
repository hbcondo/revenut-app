import { STRIPE_CLIENT_ID, STRIPE_AUTH_URL } from '@env';
import { RevenutData } from '../types/revenut';

import { Dispatch, SetStateAction, useCallback } from 'react';
import { Image, TouchableHighlight } from 'react-native';
import { Avatar, HStack, Heading, Box } from 'native-base';

import { useAuthRequest, AuthSessionResult } from 'expo-auth-session';

const appURL = window.location.host;

export function RevenutAuthentication({
    toggleSettings
    , userId
	, rData }: {
		toggleSettings: Dispatch<SetStateAction<boolean>>
		, userId: string | null
		, rData: RevenutData
}) {
	const [request, response, promptAsync] = useAuthRequest(
		// https://docs.expo.dev/versions/latest/sdk/auth-session/#useauthrequestconfig-discovery
		{
			clientId: STRIPE_CLIENT_ID,
			responseType: 'code',
			scopes: ['read_write'],
			redirectUri: appURL
			//, state: ''
		},
		// https://docs.expo.dev/versions/latest/sdk/auth-session/#authrequestconfig
		{
			authorizationEndpoint: STRIPE_AUTH_URL
		}
	);
	
	// https://github.com/expo/expo/issues/20183
	const promptCompleted = useCallback(
		(codeResponse: AuthSessionResult) => {
			if (request && codeResponse?.type === 'success') {
				console.log(codeResponse);
				// TODO: get account id from stripe
			} else {
				console.error(codeResponse);
			}
		},
		[STRIPE_CLIENT_ID, appURL, request]
	);

	return (
		<HStack>
			<Box w={"50%"}>
				{!userId ?
					<TouchableHighlight disabled={!request} onPress={() => {
						// https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionoptions
						// https://github.com/expo/expo/issues/5975
						promptAsync({showInRecents: true}).then(promptCompleted);
					}}>
						<Image
							source={require('../assets/stripe-connect.png')}
							style={{ width: 150, height: 32 }}
						/>
					</TouchableHighlight>
					:
					<HStack space={2} alignItems={'center'}>
						<Avatar source={{ uri: rData.AccountIconURL }} style={{ width: 40, height: 40 }}></Avatar>
						<Heading style={{ width: 150, height: 32 }} color={'white'}>{rData.AccountName}hi</Heading>
					</HStack>
				}
			</Box>
			<Box w={"50%"} alignItems={'end'}>
				<TouchableHighlight onPress={() => toggleSettings(true)}><Heading color={'white'}>&#9881;</Heading></TouchableHighlight>
			</Box>
		</HStack>
	)
}