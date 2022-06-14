import { list } from '@keystone-6/core';
import { checkbox, text, password } from '@keystone-6/core/fields';

import { isAdmin, isAdminOrEditor } from '../access';

export const UserSchema = list({
  // Here are the fields that `User` will have. We want an email and password so they can log in
  // and a name so we can refer to them.
  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
      isFilterable: true,
    }),
    // The password field takes care of hiding details and hashing values
    password: password({ validation: { isRequired: true } }),
    // Admin checkbox for admin access
    isAdmin: checkbox({
      access: {
        create: isAdmin,
        update: isAdmin,
      },
    }),
    isEditor: checkbox({
      access: {
        create: isAdminOrEditor,
        update: isAdminOrEditor,
      },
    }),
  },
  // Here we can configure the Admin UI. We want to show a user's name and posts in the Admin UI
});
