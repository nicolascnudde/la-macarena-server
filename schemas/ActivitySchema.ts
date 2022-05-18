import { list } from '@keystone-6/core';
import {
  integer,
  image,
  relationship,
  text,
  timestamp,
  checkbox,
} from '@keystone-6/core/fields';
import { cloudinaryImage } from '@keystone-6/cloudinary';

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
    numberOfSlots: integer({
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
});
