import fs from 'node:fs';
import path from 'node:path';

import { google } from 'googleapis'

import type { Resource } from '..';
import data from "../data/resources.json";

const RESOURCES = data as Resource[];

const GOOGLE_SHEETS_API_KEY = process.env.GOOGLE_SHEETS_API_KEY;

if (!GOOGLE_SHEETS_API_KEY) {
  throw Error('Missing environment variable: GOOGLE_SHEETS_API_KEY');
}

const THE_BLACK_LIST = {
  spreadsheetId: '1hkG5OMnBbhmEqe5aasHGV74LLWRbR9wXebzVv3HWuqE',
  sheets: {
    BRANDS: 'BRANDS',
    SHOPS: 'SHOPS',
    ORG: 'ORGANIZATIONS & NON PROFITS',
    MEDIA: 'MEDIA'
  }
}

function isThirdPartWebsite(url: string) {
  return [
    'gofundme.com',
    'facebook.com',
    'list-manage.com'
  ].find((tld) => {
    return url.includes(tld);
  });
}

function generateLinkFromUrl(url: string) {
  if (url.includes('facebook.com')) {
    return {
      type: "facebook",
      href: url
    }
  }
  if (url.includes('gofundme')) {
    return {
      type: "gofundme",
      href: url
    }
  }
}

/**
 * Check to see if a incoming resource already exists in our data set.
 */
function isExistingResource(resource: { name: string }): Boolean {
  /**
   * This list represents a list of known existing resources that won't
   * match on the `name` check, or resouces we explicitly want to skip importing.
   */
  const SKIP = [
    'Stoked Mentoring',
    'College Skateboarding Educational Foundation (CSEF)'
  ];
  return Boolean(RESOURCES.find((r) => {
    return r.name.toLowerCase() === resource.name.toLowerCase() || SKIP.includes(resource.name)
  }));
}


async function main() {
  console.log(`importing data from THE BLACK LIST`);

  const sheets = google.sheets({ version: 'v4', auth: GOOGLE_SHEETS_API_KEY });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: THE_BLACK_LIST.spreadsheetId,
    range: `'${THE_BLACK_LIST.sheets.ORG}'!A3:G`,
    valueRenderOption: "FORMATTED_VALUE"
  });

  const formatted: Resource[] = [];

  res.data.values?.forEach((entry) => {
    /**
     * run the row through some simple formatting
     */
    entry = entry.map((value) => value?.trim());
    const [name, _hidden, city, state, country, url, instagram] = entry;

    if (typeof name !== 'string') {
      return;
    }

    const resource: Resource = {
      name: name,
      _tags: [
        'The Black List'
      ]
    };

    if (isExistingResource(resource)) {
      console.log(`existing resource | name=${name}`);
      return;
    }


    if (url) {
      if (!isThirdPartWebsite(url)) {
        resource.website = {
          href: url,
          title: url.replace(/http(s):\/\/(www\.)/, '').replace(/\/$/, '')
        }
      } else {
        if (!resource.links) {
          resource.links = [];
        }
        const link = generateLinkFromUrl(url);
        if (link) {
          resource.links.push(link);
        }
      }
    }


    if (state && country) {
      resource.location = {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressCountry: country.split(',')[0].trim(),
          addressRegion: state.split(',')[0].trim()
        }
      }
    }

    if (instagram) {
      resource.links?.push(
        {
          type: 'instagram',
          href: `https://www.instagram.com/${instagram.replace('@', '')}/`
        }
      )
    }

    /**
     * Without a website or links, we can't render a meaningful result, skip it.
     */
    if (
      !resource.website &&
      !resource.links?.length
    ) {
      console.log(`skipping entry | name=${resource.name}`)
      return;
    }
    formatted.push(resource)
  })
  const resources = RESOURCES.concat(formatted).sort((a, b) => {
    return a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase() ? 1 : -1;
  });
  fs.writeFileSync(
    path.resolve(__dirname, '../data/resources.json'),
    JSON.stringify(resources, null, 2)
  );
}

main();