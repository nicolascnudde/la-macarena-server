import 'dotenv/config';
import { list } from '@keystone-6/core';
import {
  integer,
  relationship,
  text,
  timestamp,
  checkbox,
} from '@keystone-6/core/fields';
import { cloudinaryImage } from '@keystone-6/cloudinary';

import { isAdmin, isAdminOrEditor, isEditor } from '../access';

export const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? '',
  apiKey: process.env.CLOUDINARY_API_KEY ?? '',
  apiSecret: process.env.CLOUDINARY_API_SECRET ?? '',
  folder: 'activities',
};

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
    image: cloudinaryImage({
      cloudinary,
    }),
    price: integer({
      validation: {
        isRequired: true,
        min: 0,
        max: 5000,
      },
    }),
    slots: integer({
      label: 'Number of slots available',
      validation: {
        isRequired: true,
        min: 1,
        max: 30,
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
  access: {
    operation: {
      query: () => true,
      create: isAdminOrEditor,
      update: isAdminOrEditor,
      delete: isAdminOrEditor,
    },
  },
});
