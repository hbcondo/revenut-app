import { REVENUT_API_BASE, STRIPE_AUTH_URL, STRIPE_CLIENT_ID } from '@env';
import { RevenutData } from '../types/revenut';
import * as api from '../utils/api';
import * as storage from '../utils/storage';

import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import { Image, TouchableHighlight } from 'react-native';
import { Avatar, HStack, Heading, Box } from 'native-base';

import { useAuthRequest, AuthSessionResult, makeRedirectUri } from 'expo-auth-session';

const _deviceTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const _appURL = makeRedirectUri();

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
	// get data on app load if authenticated before
	useEffect(() => {
		storage.getStorageValue(storage.REVENUT_ACCOUNTID_STRIPE)
			.then(data => {
				if (data) {
					handleLogin(undefined, data);
				}
			})
	}, [_appURL]);	

	const [request, response, promptAsync] = useAuthRequest(
		// https://docs.expo.dev/versions/latest/sdk/auth-session/#useauthrequestconfig-discovery
		{
			clientId: STRIPE_CLIENT_ID,
			responseType: 'code',
			scopes: ['read_write'],
			redirectUri: _appURL
			//, state: ''	TODO: pass state - https://stripe.com/docs/connect/oauth-reference
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
				handleLogin(codeResponse.params.code, undefined);
			} else {
				console.error(codeResponse);
			}
		},
		[STRIPE_CLIENT_ID, _appURL, request]
	);

	const handleLogin = (code?: string, account_id?: string): void => {
		toggleLoading(true);
		api.getDashboardData(_deviceTimezone, code, account_id)
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					console.error(response);
					// TODO: display error message
				}
			})
			.then(data => {
				toggleData(data);
				toggleUserID(data.AccountID);
				toggleLoading(false);
				
				if (code) {
					storage.saveToStorage(storage.REVENUT_ACCOUNTID_STRIPE, data.AccountID);
				}
			})
			.catch(ex => {
				console.error(ex);
			});
	}

	return (
		<HStack>
			<Box w={"50%"}>
			{
			!userId ?
				<TouchableHighlight onPress={() => {
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
					<Heading size={'md'} style={{ width: 150, height: 32 }} color={'white'}>{rData.AccountName}</Heading>
				</HStack>
			}
			</Box>
			<Box w={"50%"} alignItems={'flex-end'}>
				<TouchableHighlight onPress={() => toggleSettings(true)}>
					<Heading color={'white'}>&#9881;</Heading>
				</TouchableHighlight>
			</Box>
		</HStack>
	)
}