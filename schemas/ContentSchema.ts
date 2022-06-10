/**
 * All the content for the site is stored in the ContentSchema.
 */
import 'dotenv/config';
import { list } from '@keystone-6/core';
import { text } from '@keystone-6/core/fields';
import { cloudinaryImage } from '@keystone-6/cloudinary';

import { isAdmin, isAdminOrEditor, isNotAdmin } from '../access';

export const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? '',
  apiKey: process.env.CLOUDINARY_API_KEY ?? '',
  apiSecret: process.env.CLOUDINARY_API_SECRET ?? '',
  folder: 'content',
};

export const ContentSchema = list({
  fields: {
    /**
     * Social media
     */
    socialMediaInstagram: text({
      label: '[Social media] → Instagram',
      validation: { isRequired: true },
    }),
    socialMediaFacebook: text({
      label: '[Social media] → Facebook',
      validation: { isRequired: true },
    }),
    /**
     * Home page content
     */
    // The hero section
    homePageHeroTitle: text({
      isIndexed: 'unique',
      label: '[Home page] Hero title',
      validation: { isRequired: true },
    }),
    homePageHeroDescription: text({
      ui: { displayMode: 'textarea' },
      label: '[Home page]: Hero description',
      validation: { isRequired: true },
    }),
    homePageHeroImage: cloudinaryImage({
      label: '[Home page] → Hero image',
      cloudinary,
    }),
    homePageHeroButtonText: text({
      label: '[Home page] → Hero button text (note: the button link will always lead to the activities page)',
      validation: { isRequired: true },
    }),
    // The 'what we do'/info section
    homePageAboutTitle: text({
      label: '[Home page] → About (what we do) title',
      validation: { isRequired: true, length: { min: 3, max: 16 } },
    }),
    homePageAboutDescription: text({
      label: '[Home page] → About (what we do) description',
      ui: { displayMode: 'textarea' },
      validation: { isRequired: true },
    }),

    /**
     * Activities page content
     */
    // The hero section
    activitiesPageHeroTitle: text({
      isIndexed: 'unique',
      label: '[Activities page] → Hero title',
      validation: { isRequired: true },
    }),
    activitiesPageHeroDescription: text({
      label: '[Activities page] → Hero description',
      ui: { displayMode: 'textarea' },
      validation: { isRequired: true },
    }),
    activitiesPageUpcomingTitle: text({
      isIndexed: 'unique',
      label: '[Activities page] → Upcoming activities title',
      validation: { isRequired: true },
    }),
    activitiesPageUpcomingDescription: text({
      label: '[Activities page] → Upcoming activities description',
      ui: { displayMode: 'textarea' },
      validation: { isRequired: true },
    }),
    activitiesPageCategoriesTitle: text({
      isIndexed: 'unique',
      label: '[Activities page] → Categories title',
      validation: { isRequired: true },
    }),
    activitiesPageCategoriesDescription: text({
      label: '[Activities page] → Categories description',
      ui: { displayMode: 'textarea' },
      validation: { isRequired: true },
    }),

    /**
     * About page content
     */
    // The hero section
    aboutPageHeroTitle: text({
      isIndexed: 'unique',
      label: '[About page] → Hero title',
      validation: { isRequired: true },
    }),
    aboutPageHeroDescription: text({
      ui: { displayMode: 'textarea' },
      label: '[About page] → Hero description',
      validation: { isRequired: true },
    }),
    aboutPageHeroImage: cloudinaryImage({
      label: '[About page] → Hero image',
      cloudinary,
    }),
    // The 'our story'/info section
    aboutPageStoryTitle: text({
      label: '[About page] → About (our story) title',
      validation: { isRequired: true, length: { min: 3, max: 16 } },
    }),
    aboutPageStoryDescription: text({
      label: '[About page] → About (our story) description',
      ui: { displayMode: 'textarea' },
      validation: { isRequired: true },
    }),
    aboutPageStoryImageOne: cloudinaryImage({
      label: '[About page] → About (our story) image #1 (only visible on desktop)',
      cloudinary,
    }),
    aboutPageStoryImageTwo: cloudinaryImage({
      label: '[About page] → About (our story) image #2 (only visible on desktop)',
      cloudinary,
    }),

    /**
     * Goals page content
     */
    // The hero section
    goalsPageHeroTitle: text({
      isIndexed: 'unique',
      label: '[Goals page] → Hero title',
      validation: { isRequired: true },
    }),
    goalsPageHeroDescription: text({
      label: '[Goals page] → Hero description',
      ui: { displayMode: 'textarea' },
      validation: { isRequired: true },
    }),

    /**
     * Contact page content
     */
    // The hero section
    contactPageHeroTitle: text({
      isIndexed: 'unique',
      label: '[Contact page] → Hero title',
      validation: { isRequired: true },
    }),
    contactPageHeroDescription: text({
      label: '[Contact page] → Hero description',
      ui: { displayMode: 'textarea' },
      validation: { isRequired: true },
    }),
    contactPageFormImage: cloudinaryImage({
      label: '[Contact page] → Contact form image (only visible on desktop)',
      cloudinary,
    }),
    contactPageFaqTitle: text({
      isIndexed: 'unique',
      label: '[Contact page] → FAQ title',
      validation: { isRequired: true },
    }),
    contactPageFaqDescription: text({
      label: '[Contact page] → FAQ description',
      ui: { displayMode: 'textarea' },
    }),

    /**
     * Content of components that are used on multiple pages
     */
    // Who we are/team content
    whoWeAreTitle: text({
      label: '[Who we are (team section)] → title',
      ui: { displayMode: 'textarea' },
      validation: { isRequired: true },
    }),
    whoWeAreDescription: text({
      label: '[Who we are (team section)] → description',
      ui: { displayMode: 'textarea' },
      validation: { isRequired: true },
    }),
    whoWeAreImage: cloudinaryImage({
      label: '[Who we are (team section)] → image',
      cloudinary,
    }),

    // CTA component content
    ctaTitle: text({
      label: '[Call to action] → title',
      validation: { isRequired: true },
    }),
    ctaDescription: text({
      label: '[Call to action] → description',
      ui: { displayMode: 'textarea' },
      validation: { isRequired: true },
    }),
    ctaImage: cloudinaryImage({
      label: '[Call to action] → image',
      cloudinary,
    }),
    ctaButtonText: text({
      label: '[Call to action] → button text (note: the button link will always lead to the contact page)',
      validation: { isRequired: true },
    }),
  },
  ui: {
    hideCreate: isNotAdmin,
    hideDelete: isAdmin,
    listView: {
      initialColumns: ['homePageHeroTitle', 'homePageHeroDescription', 'homePageHeroImage']
    }
  },
  access: {
    operation: {
      // There should be only one content schema to add all the needed content, there for only the admin role can create or delete it.
      query: () => true,
      create: isAdmin,
      update: isAdminOrEditor,
      delete: isAdmin,
    },
  },
});
