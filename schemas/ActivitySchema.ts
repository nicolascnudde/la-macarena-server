import { list } from '@keystone-6/core';
import { integer, image, relationship, text, timestamp, checkbox } from '@keystone-6/core/fields';

export const ActivitySchema = list({
  fields: {
    title: text({
      isIndexed: 'unique',
      validation: { isRequired: true },
    }),
    description: text({
      ui: { displayMode: 'textarea' },
      validation: { isRequired: true },
    }),
    image: image(),
    price: integer({
      validation: {
        isRequired: true,
        min: 0,
        max: 5000,
      },
    }),
    category: relationship({
      ref: 'Category',
      many: false,
    }),
    multipleDays: checkbox(),
    date: timestamp(),
    fromDate: timestamp(),
    toDate: timestamp(),
  },
});
