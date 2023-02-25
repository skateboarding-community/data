# Skateboarding Community

This repository contains the base resource data available on [`skateboarding.community`](https://skateboarding.community/).

## Adding + Updating Resources

The module (data) exposed by this repository is referenced in the deployment process of the community website. 

**Please feel free to open Pull Requests with additions or corrections to this data.** After a release, it will appear on [`skateboarding.community`](https://skateboarding.community/).

### Charity Navigator Data

By adding an `ein` to a resource, we will attempt to fetch information from Charity Navigator before publishing it to the [`skateboarding.community`](https://skateboarding.community/) website.

We intentionally avoid storing Charity Navigator data to ensure our content stays up-to-date and prevent any potential issues concerning data ownership and terms of service violations.

### GeoCoordinate Data

Geocode information is processed (and generated) similarly to Charity Navigator Data.

By adding a `foundingLocation` or `location` defined as a `@type: "Place"` with an `address` object with `@type: "PostalAddress"` we will attempt to obtain geocoordinate information via [Nominatim](https://nominatim.org/)


#### Example `foundingLocation`
```json
{
  "foundingLocation": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "USA",
      "addressLocality": "Woodstock",
      "addressRegion": "Georgia"
    }
  }
}
```

### Images

`# todo`


### Import Sources

## [THE BLACK LIST](https://docs.google.com/spreadsheets/d/1hkG5OMnBbhmEqe5aasHGV74LLWRbR9wXebzVv3HWuqE/edit?usp=sharing)

> A Non-Comprehensive list of Black-owned brands, retailers, and organizations in skateboarding

**REQUIRES `GOOGLE_SHEETS_API_KEY` TO BE SET IN ENVIRONMENT**

Data from the "_ORGANIZATIONS & NON PROFITS_" sheet can be imported via `scripts/import-the-black-list.ts`

`npm run import:the-black-list`