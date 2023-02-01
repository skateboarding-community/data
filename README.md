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