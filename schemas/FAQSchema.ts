import 'dotenv/config';
import { list } from '@keystone-6/core';
import { text } from '@keystone-6/core/fields';

export const FAQSchema = list({
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
});
