import 'dotenv/config';
import { list } from '@keystone-6/core';
import { text } from '@keystone-6/core/fields';
import { cloudinaryImage } from '@keystone-6/cloudinary';

export const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? '',
  apiKey: process.env.CLOUDINARY_API_KEY ?? '',
  apiSecret: process.env.CLOUDINARY_API_SECRET ?? '',
  folder: 'usps',
};

export const USPSchema = list({
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
  },
});
