import resources from './data/resources.json';

type Categories = 'organization' | 'collective' | 'company' | 'media' | string;

type Link = {
  type: string;
  href: string;
}

type Location = {
  '@type': 'Place' | string;
  address: {
    '@type': 'PostalAddress' | string;
    addressCountry: string;
    addressRegion: string;
    addressLocality?: string;
  }
}

export type Resource = {
  name: string;
  ein?: string;
  description?: string;
  category?: Categories;
  website?: {
    href: string;
    title: string;
  }
  links?: Link[];
  image?: {
    src: string;
  }
  _tags?: string[];
  location?: Location;
  foundingLocation?: Location;
  [key: string]: any;
}

/**
 * This is a bit of a hack to run some typechecking against
 * the `resource.json` file without too much work!
 */
const _resources: Resource[] = resources;

export default {
  resources: _resources
}
