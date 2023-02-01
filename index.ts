import resources from './data/resources.json';

type Link = {
  type: string;
  href: string;
}

type Resource = {
  name: string;
  description: string;
  category: string;
  website?: {
    href: string;
    title: string;
  }
  links?: Link[]
  image?: {
    src: string
  }
}

/**
 * This is a bit of a hack to run some typechecking against
 * the `resource.json` file without too much work!
 */
const _resources: Resource[] = resources;

export default {
  resources
}
