import { defaultHeaders } from './Headers'

type ErrorResponse = {
	[key: string]: any;
};

const sendRequest = async <T>(url: string, request: RequestInit): Promise<T> => {
	const response: Response = await fetch(url, request);
	const resolvedResponse: any = await response.json();
	const successStatusCodes = [200, 201];

	if (!response.ok) {
		const errorResponse: ErrorResponse = resolvedResponse as unknown as ErrorResponse;
		errorResponse.status = response.status;
		throw new Error(JSON.stringify(errorResponse));
	}

	if (!successStatusCodes.includes(response.status)) {
		throw new Error(JSON.stringify(resolvedResponse));
	}

	return resolvedResponse;
};

const GET = async <T>(url: string, request: RequestInit | undefined = {
}): Promise<T> => {
	const { headers, ...rest } = request;
	const response = await sendRequest<T>(url, {
		method: 'GET',
		headers: {
			...defaultHeaders,
			...headers
		},
		...request,
	});

	return response;
};

const POST = async <T>(url: string, data: string, request: RequestInit | undefined = {
}): Promise<T> => {
	const { headers, ...rest } = request;
	const response = await sendRequest<T>(url, {
		method: 'POST',
		headers: {
			...defaultHeaders,
			...headers,
		},
		credentials: 'include',
		body: data,
		...rest,
	} as RequestInit);

	return response;
};

export const API = {
	GET, POST,
};
