import { getAccessToken } from '@base44/sdk';

const isNode = typeof window === 'undefined';

const isClearAccessTokenRequested = () =>
	!isNode && new URLSearchParams(window.location.search).get("clear_access_token") === 'true';

// Browsers that block site data throw on any localStorage access; the site must still render.
const clearStoredAccessToken = () => {
	try {
		window.localStorage.removeItem('base44_access_token');
		window.localStorage.removeItem('token');
	} catch {
		/* storage blocked */
	}
}

const safeAccessToken = () => {
	try {
		return getAccessToken();
	} catch {
		return null;
	}
}

const getAppParams = () => {
	if (isClearAccessTokenRequested()) {
		clearStoredAccessToken();
	}
	return {
		appId: import.meta.env.VITE_BASE44_APP_ID,
		token: safeAccessToken(),
		functionsVersion: import.meta.env.VITE_BASE44_FUNCTIONS_VERSION,
		appBaseUrl: import.meta.env.VITE_BASE44_APP_BASE_URL,
	}
}


export const appParams = {
	...getAppParams()
}
