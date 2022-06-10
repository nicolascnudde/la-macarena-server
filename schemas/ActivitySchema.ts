import 'dotenv/config';
import { list } from '@keystone-6/core';
import {
  integer,
  relationship,
  text,
  timestamp,
} from '@keystone-6/core/fields';
import { cloudinaryImage } from '@keystone-6/cloudinary';
import { document } from '@keystone-6/fields-document';

import { isAdminOrEditor } from '../access';

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
      ui: {
        hideCreate: true,
      },
    }),
    date: timestamp(),
    toDate: timestamp({
      label: 'To date (leave empty if the activity is just one day)',
    }),
    wysiwyg: document({
      label:
        'WYSIWYG: This will be the main content block inside an activity page',
      formatting: {
        inlineMarks: {
          bold: true,
          italic: true,
          underline: true,
        },
        listTypes: {
          ordered: true,
          unordered: true,
        },
        alignment: {
          center: true,
          end: true,
        },
        headingLevels: [2, 3],
      },
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
