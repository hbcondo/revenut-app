import * as api from './api';
import { test, expect } from '@jest/globals';

test('api accessible and running', () => {
	return api.getHealthCheck()
		.then((response) => {
			expect(response.status).toBeTruthy();
			return response.json();
		})
		.then((json) => {
			expect(json).toEqual({ 'Hello': 'World!' });
		});
});