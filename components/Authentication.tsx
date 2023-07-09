import { REVENUT_API_BASE, STRIPE_AUTH_URL, STRIPE_CLIENT_ID } from '@env';
import { RevenutData } from '../types/revenut';
import * as api from '../utils/api';
import * as storage from '../utils/storage';

import { Dispatch, SetStateAction, useCallback } from 'react';
import { Image, TouchableHighlight } from 'react-native';
import { Avatar, HStack, Heading, Box } from 'native-base';

import * as Linking from 'expo-linking';
import { useAuthRequest, AuthSessionResult } from 'expo-auth-session';

/**
 * Storage Key for identifying stripe account
 */
const REVENUT_ACCOUNTID_STRIPE = 'REVENUT_USER_IDENTIFIER_STRIPE';

export function RevenutAuthentication({
    toggleUserID
	, toggleData
	, toggleLoading
	, toggleSettings
    , userId
	, rData }: {
		toggleUserID: Dispatch<SetStateAction<null>>
		, toggleData: Dispatch<SetStateAction<RevenutData>>
		, toggleLoading: Dispatch<SetStateAction<boolean>>
		, toggleSettings: Dispatch<SetStateAction<boolean>>
		, userId: string | null
		, rData: RevenutData
}) {
	const mytimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	let appURL = Linking.useURL();

	// in event useURL returns NULL, attempt to populate from another source since value is required in useAuthRequest
	if (!appURL) {
		appURL = window.location.href;
	}

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
				handleLogin(codeResponse.params.code);
			} else {
				console.error(codeResponse);
			}
		},
		[STRIPE_CLIENT_ID, appURL, request]
	);

	const handleLogin = (code: string): void => {
		toggleLoading(true);
		api.getDashboardData(mytimezone, code)
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					console.log(response);
					// TODO: display error message
				}
			})
			.then(data => {
				toggleData(data);
				toggleUserID(data.AccountID);
				toggleLoading(false);

				storage.saveToStorage(REVENUT_ACCOUNTID_STRIPE, data.AccountID);
			})
			.catch(ex => {
				console.error(ex);
			});
	}

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
						<Heading style={{ width: 150, height: 32 }} color={'white'}>{rData.AccountName}</Heading>
					</HStack>
				}
			</Box>
			<Box w={"50%"} alignItems={'end'}>
				<TouchableHighlight onPress={() => toggleSettings(true)}>
					<Heading color={'white'}>&#9881;</Heading>
				</TouchableHighlight>
			</Box>
		</HStack>
	)
}