import { getHealthCheck } from './api';
import { test, expect } from '@jest/globals';

test('api accessible and running', () => {
	return getHealthCheck().then(response => {
		expect(response).toEqual({ 'Hello': 'World!' });
	});
});