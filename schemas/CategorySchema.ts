import { list } from '@keystone-6/core';
import { image, relationship, text } from '@keystone-6/core/fields';

export const CategorySchema = list({
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
    // activity: relationship({
    //   ref: 'Activity',
    //   many: false,
    // }),
  },
});
