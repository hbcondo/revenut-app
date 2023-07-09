import { REVENUT_API_BASE } from "@env";

/**
 * Returns the health check response from the API
 * 
 * @returns Hello World!
 */
export async function getHealthCheck(): Promise<Response> {
    let response = new Response();
	const endpoint = `${REVENUT_API_BASE}health`;
	
    try {
		response = await fetch(endpoint);
	} catch (ex) {
		console.error(ex);
	}

	return response;
}

/**
 * Returns SaaS metrics for the requested account from the API
 * 
 * @param timezone - TZ identifier {@link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones}
 * @param auth_code - authorization code
 * @param account_id - account identifier
 * 
 * @returns `RevenutData`
 */
export async function getDashboardData(timezone: string, auth_code?: string, account_id?: string): Promise<Response> {
    let response = new Response();
	let endpoint = `${REVENUT_API_BASE}v1/dashboard?tzIdentifier=${timezone}&`
	
    if (account_id) {
      endpoint += `account=${account_id}`;
    } else if (auth_code) {
      endpoint += `code=${auth_code}`;
    }

    try {
		response = await fetch(endpoint);
	} catch (ex) {
		console.error(ex);
	}

	return response;
}

/**
 * Revokes the requested account's access from Revenut
 * 
 * @param account_id 
 * 
 * @see {@link https://stripe.com/docs/connect/oauth-reference#post-deauthorize}
 * 
 * @returns `account_id`
 */
export async function getLogoutData(account_id: string): Promise<Response> {
	let response = new Response();
    const endpoint = `${REVENUT_API_BASE}v1/logout?account=${account_id}`;

    try {
		response = await fetch(endpoint);
	} catch (ex) {
		console.error(ex);
	}

	return response;
}