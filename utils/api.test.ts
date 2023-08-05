import * as api from './api';
import { test, expect } from '@jest/globals';

test('api accessible and running', () => {
	return api.getHealthCheck()
		.then((response) => {
			expect(response.status).toEqual(200);
			return response.json();
		})
		.then((json) => {
			expect(json).toBeTruthy();
		});
});