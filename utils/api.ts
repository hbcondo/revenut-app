import { REVENUT_API_BASE } from "@env";

export async function getHealthCheck(): Promise<any> {
    const endpoint = `${REVENUT_API_BASE}health`;
	let response;

    try {
		response = await fetch(endpoint);
	} catch (ex) {
		console.error(ex);
	}

	return await response?.json();
}

export async function getDashboardData(timezone: string, auth_code?: string, account_id?: string): Promise<any> {
    let endpoint = `${REVENUT_API_BASE}v1/dashboard?tzIdentifier=${timezone}&`
	let response;

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

	return await response?.json();
}

export async function getLogoutData(account_id: string): Promise<any> {
    const endpoint = `${REVENUT_API_BASE}v1/logout?account=${account_id}`;
	let response;

    try {
		response = await fetch(endpoint);
	} catch (ex) {
		console.error(ex);
	}

	return await response?.json();
}