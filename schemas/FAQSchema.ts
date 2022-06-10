import 'dotenv/config';
import { list } from '@keystone-6/core';
import { checkbox, text } from '@keystone-6/core/fields';

import { isAdminOrEditor } from '../access';

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
    isExpanded: checkbox({
      label: 'Automatically expand',
      defaultValue: false,
    })
  },
  ui: {
    listView: {
      initialColumns: ['question', 'answer', 'isExpanded'],
    }
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
