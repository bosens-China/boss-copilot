import createClient from 'openapi-fetch';
import type { paths } from '@boss-copilot/codegen';

export const client = createClient<paths>({ baseUrl: 'http://localhost:8000' });
