/**
 * Section Type Definitions
 * Provides type safety for section components and configurations
 */

import { FC } from 'react';

/**
 * Base section component type
 * All sections should be functional components with no required props
 */
export type SectionComponent = FC;

/**
 * Section configuration object
 * Used in HOMEPAGE_SECTIONS array to define page structure
 */
export type Section = {
  /** Unique identifier for the section */
  id: string;
  /** Section component to render */
  Component: SectionComponent;
  /** Optional: disable section without removing from config */
  disabled?: boolean;
};

/**
 * Homepage sections type
 * Ensures type safety for section arrays
 */
export type HomepageSections = readonly Section[];
