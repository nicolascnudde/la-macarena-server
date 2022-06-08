import 'dotenv/config';
import { list } from '@keystone-6/core';
import { text } from '@keystone-6/core/fields';

import { isAdminOrEditor, isNotAdminOrEditor } from '../access';

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
    phone: text({
      validation: { isRequired: true },
    }),
    email: text({
      validation: { isRequired: true },
    }),
    activityTitle: text({
      validation: { isRequired: true },
    }),
    activityDate: text({
      validation: { isRequired: true },
    }),
  },
  ui: {
    hideCreate: true,
  },
  access: {
    operation: {
      query: isAdminOrEditor,
      create: isNotAdminOrEditor,
      update: () => false,
      delete: isAdminOrEditor,
    },
  },
});
