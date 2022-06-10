/*
Welcome to the schema! The schema is the heart of Keystone.

Here we define our 'lists', which will then be used both for the GraphQL
API definition, our database tables, and our Admin UI layout.

Some quick definitions to help out:
A list: A definition of a collection of fields with a name. For the starter
  we have `User`, `Post`, and `Tag` lists.
A field: The individual bits of data on your list, each with its own type.
  you can see some of the lists in what we use below.

*/
import { Lists } from '.keystone/types';

import { ActivitySchema } from './schemas/ActivitySchema';
import { CategorySchema } from './schemas/CategorySchema';
import { ContentSchema } from './schemas/ContentSchema';
// import { FaqSchema } from './schemas/FaqSchema';
import { GoalSchema } from './schemas/GoalSchema';
import { MemberSchema } from './schemas/MemberSchema';
import { ReservationSchema } from './schemas/ReservationSchema';
import { UserSchema } from './schemas/UserSchema';
import { UspSchema } from './schemas/UspSchema';

export const lists: Lists = {
  Activity: ActivitySchema,
  Category: CategorySchema,
  Content: ContentSchema,
  // Faq: FaqSchema,
  Goal: GoalSchema,
  Member: MemberSchema,
  Reservation: ReservationSchema,
  User: UserSchema,
  Usp: UspSchema,
};
