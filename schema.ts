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
import { ContentSchema } from './schemas/ContentSchema';
import { FAQSchema } from './schemas/FAQSchema';
import { CategorySchema } from './schemas/CategorySchema';
import { MemberSchema } from './schemas/MemberSchema';
import { UserSchema } from './schemas/UserSchema';
import { USPSchema } from './schemas/USPSchema';

export const lists: Lists = {
  Activity: ActivitySchema,
  Content: ContentSchema,
  FAQ: FAQSchema,
  Category: CategorySchema,
  Member: MemberSchema,
  User: UserSchema,
  USP: USPSchema,
};
