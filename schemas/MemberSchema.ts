import { list } from "@keystone-6/core";
import {
  image,
  text,
} from "@keystone-6/core/fields";

export const MemberSchema = list({
  fields: {
    firstName: text({ validation: { isRequired: true } }),
    lastName: text({ validation: { isRequired: true } }),
    image: image(),
    origin: text({ validation: { isRequired: true } }),
  },
});
