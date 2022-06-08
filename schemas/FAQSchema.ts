import 'dotenv/config';
import { list } from '@keystone-6/core';
import { text } from '@keystone-6/core/fields';

import { isAdmin, isAdminOrEditor, isEditor } from '../access';

export const FaqSchema = list({
  fields: {
    question: text({
      isIndexed: 'unique',
      validation: { isRequired: true },
    }),
    answer: text({
      ui: { displayMode: 'textarea' },
      validation: { isRequired: true },
    }),
  },
  access: {
    operation: {
      query: () => true,
      create: isAdminOrEditor,
      update: isAdminOrEditor,
      delete: isAdminOrEditor,
    },
  },
});
