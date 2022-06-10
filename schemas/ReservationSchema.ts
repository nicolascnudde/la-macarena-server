import 'dotenv/config';
import { list } from '@keystone-6/core';
import { integer, text, timestamp } from '@keystone-6/core/fields';

import { isAdminOrEditor } from '../access';

export const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? '',
  apiKey: process.env.CLOUDINARY_API_KEY ?? '',
  apiSecret: process.env.CLOUDINARY_API_SECRET ?? '',
  folder: 'categories',
};

export const ReservationSchema = list({
  fields: {
    firstName: text({
      validation: { isRequired: true },
    }),
    lastName: text({
      validation: { isRequired: true },
    }),
    email: text({
      validation: { isRequired: true },
    }),
    phone: text({
      validation: { isRequired: true },
    }),
    activityTitle: text({
      validation: { isRequired: true },
    }),
    activityPrice: integer({
      validation: { isRequired: true },
    }),
    activityDate: text({
      validation: { isRequired: true },
    }),
    message: text({
      ui: { displayMode: 'textarea' },
    }),
    createdAt: timestamp({
      label: 'Created at (the date and time the form was submitted):',
    }),
  },
  ui: {
    hideCreate: true,
    listView: {
      initialColumns: ['id', 'activityTitle', 'firstName', 'lastName'],
    },
  },
  access: {
    operation: {
      query: isAdminOrEditor,
      create: () => true,
      update: () => false,
      delete: isAdminOrEditor,
    },
  },
});
