/**
 * All the content for the site is stored in the ContentSchema.
 */
import 'dotenv/config';
import { list } from '@keystone-6/core';
import { text } from '@keystone-6/core/fields';
import { cloudinaryImage } from '@keystone-6/cloudinary';

export const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? '',
  apiKey: process.env.CLOUDINARY_API_KEY ?? '',
  apiSecret: process.env.CLOUDINARY_API_SECRET ?? '',
  folder: 'content',
};

export const ContentSchema = list({
  fields: {
    /**
     * Home page content
     */
    // The hero section
    homePageHeroTitle: text({
      isIndexed: 'unique',
      label: 'Home page: Hero title',
      validation: { isRequired: true },
    }),
    homePageHeroDescription: text({
      ui: { displayMode: 'textarea' },
      label: 'Home page: Hero description',
      validation: { isRequired: true },
    }),
    homePageHeroImage: cloudinaryImage({
      label: 'Home page: Hero image',
      cloudinary,
    }),
    // The 'what we do'/info section
    homePageAboutTitle: text({
      label: 'Home page: About (what we do) title',
      validation: { isRequired: true, length: { min: 3, max: 16 } },
    }),
    homePageAboutDescription: text({
      label: 'Home page: About (what we do) description',
      ui: { displayMode: 'textarea' },
      validation: { isRequired: true },
    }),

    /**
     * Activities page content
     */
    // The hero section
    activitiesPageHeroTitle: text({
      isIndexed: 'unique',
      label: 'Activities page: Hero title',
      validation: { isRequired: true },
    }),
    activitiesPageHeroDescription: text({
      label: 'Activities page: Hero description',
      ui: { displayMode: 'textarea' },
      validation: { isRequired: true },
    }),
    activitiesPageUpcomingDescription: text({
      label: 'Activities page: Upcoming activities description',
      ui: { displayMode: 'textarea' },
      validation: { isRequired: true },
    }),
    activitiesPageCategoriesDescription: text({
      label: 'Activities page: Categories description',
      ui: { displayMode: 'textarea' },
      validation: { isRequired: true },
    }),

    /**
     * About page content
     */
    // The hero section
    aboutPageHeroTitle: text({
      isIndexed: 'unique',
      label: 'About page: Hero title',
      validation: { isRequired: true },
    }),
    aboutPageHeroDescription: text({
      ui: { displayMode: 'textarea' },
      label: 'About page: Hero description',
      validation: { isRequired: true },
    }),
    aboutPageHeroImage: cloudinaryImage({
      label: 'About page: Hero image',
      cloudinary,
    }),
    // The 'our story'/info section
    aboutPageStoryTitle: text({
      label: 'About page: About (our story) title',
      validation: { isRequired: true, length: { min: 3, max: 16 } },
    }),
    aboutPageStoryDescription: text({
      label: 'About page: About (our story) description',
      ui: { displayMode: 'textarea' },
      validation: { isRequired: true },
    }),

    /**
     * Goals page content
     */
    // The hero section
    goalsPageHeroTitle: text({
      isIndexed: 'unique',
      label: 'Goals page: Hero title',
      validation: { isRequired: true },
    }),
    goalsPageHeroDescription: text({
      label: 'Goals page: Hero description',
      ui: { displayMode: 'textarea' },
      validation: { isRequired: true },
    }),

    /**
     * Contact page content
     */
    // The hero section
    contactPageHeroTitle: text({
      isIndexed: 'unique',
      label: 'Contact page: Hero title',
      validation: { isRequired: true },
    }),
    contactPageHeroDescription: text({
      label: 'Contact page: Hero description',
      ui: { displayMode: 'textarea' },
      validation: { isRequired: true },
    }),

    /**
     * Content of components that are used on multiple pages
     */
    // Who we are/team content
    whoWeAreTitle: text({
      label: 'Who we are: title',
      ui: { displayMode: 'textarea' },
      validation: { isRequired: true },
    }),
    whoWeAreDescription: text({
      label: 'Who we are: description',
      ui: { displayMode: 'textarea' },
      validation: { isRequired: true },
    }),

    // CTA component content
    ctaTitle: text({
      label: 'Call to action: title',
      validation: { isRequired: true },
    }),
    ctaDescription: text({
      label: 'Call to action: description',
      ui: { displayMode: 'textarea' },
      validation: { isRequired: true },
    }),
    ctaImage: cloudinaryImage({
      label: 'Call to action: image',
      cloudinary,
    }),
  },
});
