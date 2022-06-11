import { KeystoneContext } from '@keystone-6/core/types';
import { setupTestEnv, setupTestRunner } from '@keystone-6/core/testing';
import config from '../keystone';

// Setup a test runner which will provide a clean test environment
// with access to our GraphQL API for each test.
const runner = setupTestRunner({ config });

describe('Example tests using test runner', () => {
  test(
    'Create a Person using the Query API',
    runner(async ({ context }) => {
      console.log('lol');
    })
  );
});
