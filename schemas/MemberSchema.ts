import 'dotenv/config';
import { list } from '@keystone-6/core';
import { text, timestamp } from '@keystone-6/core/fields';
import { cloudinaryImage } from '@keystone-6/cloudinary';

export const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? '',
  apiKey: process.env.CLOUDINARY_API_KEY ?? '',
  apiSecret: process.env.CLOUDINARY_API_SECRET ?? '',
  folder: 'members',
};

export const MemberSchema = list({
  fields: {
    firstName: text({ validation: { isRequired: true } }),
    lastName: text({ validation: { isRequired: true } }),
    image: cloudinaryImage({
      cloudinary,
    }),
    birthday: timestamp(),
    origin: text({ validation: { isRequired: true } }),
  },
});
