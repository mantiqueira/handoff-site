import heroSection from "./heroSection";
import featuresSection, { featureCard } from "./featuresSection";
import testimonial from "./testimonial";
import detailRow from "./detailRow";
import faqItem from "./faqItem";
import footerColumn from "./footerColumn";
import navItem from "./navItem";
import page from "./page";
import blogPost from "./blogPost";
import {
  heroBlock,
  featuresBlock,
  testimonialBlock,
  detailRowsBlock,
  faqBlock,
  richTextBlock,
} from "./blocks";

export const schemaTypes = [
  // Existing singletons & collections
  heroSection,
  featureCard,
  featuresSection,
  testimonial,
  detailRow,
  faqItem,
  footerColumn,
  navItem,
  // Page builder
  page,
  blogPost,
  // Block types (used inside page.sections array)
  heroBlock,
  featuresBlock,
  testimonialBlock,
  detailRowsBlock,
  faqBlock,
  richTextBlock,
];
