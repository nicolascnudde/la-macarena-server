/**
 * WARNING:
 * 
 * The test runner will drop all data in the database on each run. Make sure you do NOT run your tests against a system with live data.
 */
import { KeystoneContext } from '@keystone-6/core/types';
import {
  setupTestEnv,
  setupTestRunner,
  TestEnv,
} from '@keystone-6/core/testing';
import config from '../keystone';

// Setup a test runner which will provide a clean test environment
// with access to our GraphQL API for each test.
const runner = setupTestRunner({ config });

describe('Example tests using test runner', () => {
  test(
    'Create a User using the Query API',
    runner(async ({ context }) => {
      // We can use the context argument provided by the test runner to access
      // the full context API.
      const user = await context.query.User.createOne({
        data: {
          name: 'Nicolas',
          email: 'nicolas.cnudde@student.arteveldehs.be',
          password: 'super-secret',
        },
        query: 'id name email password { isSet }',
      });
      expect(user.name).toEqual('Nicolas');
      expect(user.email).toEqual('nicolas.cnudde@student.arteveldehs.be');
      expect(user.password.isSet).toEqual(true);
    })
  );

  test(
    'Create a User using a hand-crafted GraphQL query sent over HTTP',
    runner(async ({ graphQLRequest }) => {
      // We can use the graphQLRequest argument provided by the test runner
      // to execute HTTP requests to our GraphQL API and get a supertest
      // "Test" object back. https://github.com/visionmedia/supertest
      const { body } = await graphQLRequest({
        query: `mutation {
          createUser(data: { name: "Nicolas", email: "nicolas.cnudde@student.arteveldehs.be", password: "super-secret" }) {
            id name email password { isSet }
          }
        }`,
      }).expect(200);
      const user = body.data.createUser;
      expect(user.name).toEqual('Nicolas');
      expect(user.email).toEqual('nicolas.cnudde@student.arteveldehs.be');
      expect(user.password.isSet).toEqual(true);
    })
  );

  test(
    'Check that trying to create user with no name (required field) fails',
    runner(async ({ context }) => {
      // The context.graphql.raw API is useful when we expect to recieve an
      // error from an operation.
      const { data, errors } = await context.graphql.raw({
        query: `mutation {
          createUser(data: { email: "nicolas.cnudde@student.arteveldehs.be", password: "super-secret" }) {
            id name email password { isSet }
          }
        }`,
      });
      expect(data!.createUser).toBe(null);
      expect(errors).toHaveLength(1);
      expect(errors![0].path).toEqual(['createUser']);
      expect(errors![0].message).toEqual(
        'You provided invalid data for this operation.\n  - User.name: Name must not be empty'
      );
    })
  );

  test(
    'Create multiple users using the Query API',
    runner(async ({ context }) => {
      // We can modify the value of context.session via context.withSession() to masquerade
      // as different logged in users. This allows us to test that our access control rules
      // are behaving as expected.

      // Create some users
      const [nicolas, dieter, michael] = await context.query.User.createMany({
        data: [
          {
            name: 'Nicolas',
            email: 'nicolas.cnudde@student.arteveldehs.be',
            password: 'super-secret',
          },
          {
            name: 'Dieter',
            email: 'dieterdeweirdt@arteveldehs.be',
            password: 'super-secret',
          },
          {
            name: 'Michael',
            email: 'michaelvanderpoorten@arteveldehs.be',
            password: 'super-secret',
          },
        ],
        query: 'id name',
      });
      expect(nicolas.name).toEqual('Nicolas');
      expect(dieter.name).toEqual('Dieter');
      expect(michael.name).toEqual('Michael');
    })
  );

  test(
    'Create a Reservation using the Query API',
    runner(async ({ context }) => {
      // We can use the context argument provided by the test runner to access
      // the full context API.
      const reservation = await context.query.Reservation.createOne({
        data: {
          firstName: 'Nicolas',
          lastName: 'Cnudde',
          email: 'nicolas.cnudde@student.arteveldehs.be',
          phone: '+32478364219',
          activityTitle: 'Trip to Barcelona',
          activityPrice: 250,
          activityDate: '18/06/2022',
        },
        query: 'id firstName lastName email phone activityTitle activityPrice activityDate',
      });
      expect(reservation.firstName).toEqual('Nicolas');
      expect(reservation.lastName).toEqual('Cnudde');
      expect(reservation.email).toEqual('nicolas.cnudde@student.arteveldehs.be');
      expect(reservation.phone).toEqual('+32478364219');
      expect(reservation.activityTitle).toEqual('Trip to Barcelona');
      expect(reservation.activityPrice).toEqual(250);
      expect(reservation.activityDate).toEqual('18/06/2022');
    })
  );
});

describe('Some user CRUD tests using the test environment', () => {
  // The test runner provided by setupTestRunner will drop all the data from the
  // database and then provide a fresh connection for every test.
  //
  // If we want to use the same database for multiple tests, without deleting data
  // between each test, we can use setupTestEnv in our `beforeAll()` block and
  // manage the connection and disconnection ourselves.
  //
  // This gives us the opportunity to seed test data once up front and use it in
  // multiple tests.
  let testEnv: TestEnv, context: KeystoneContext;
  let user: { id: string };
  beforeAll(async () => {
    testEnv = await setupTestEnv({ config });
    context = testEnv.testArgs.context;

    await testEnv.connect();

    // Create a user in the database to be used in multiple tests
    user = (await context.query.User.createOne({
      data: {
        name: 'Nicolas',
        email: 'nicolas.cnudde@student.arteveldehs.be',
        password: 'super-secret',
      },
    })) as { id: string };
  });
  afterAll(async () => {
    await testEnv.disconnect();
  });

  test('Check that the users password is set', async () => {
    const { password } = await context.query.User.findOne({
      where: { id: user.id },
      query: 'password { isSet }',
    });
    expect(password.isSet).toEqual(true);
  });

  test('Update the users email address', async () => {
    const { email } = await context.query.User.updateOne({
      where: { id: user.id },
      data: { email: 'nicolas.cnudde@me.com' },
      query: 'email',
    });
    expect(email).toEqual('nicolas.cnudde@me.com');
  });
});
