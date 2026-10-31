/**
 * Image registry. Every photograph on the site is an openly licensed image from
 * Wikimedia Commons, resized for the web. None depicts HempWealth Ghana's own land,
 * facilities, equipment or people; captions say "illustrative" where that could be
 * misread. Replace with approved company photography when available.
 */

export type ImageCredit = {
  author: string;
  license: string;
  licenseUrl: string | null;
  sourceUrl: string;
  note?: string;
};

export type SiteImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  subject: string;
  credit: ImageCredit;
};

const CC_BY_SA_4 = "https://creativecommons.org/licenses/by-sa/4.0/";
const CC_BY_SA_3 = "https://creativecommons.org/licenses/by-sa/3.0/";
const CC0 = "https://creativecommons.org/publicdomain/zero/1.0/";
const RESIZED = "Resized and recompressed for the web.";

export const images = {
  heroField: {
    src: "/images/home/hemp-field-treeline.jpg",
    width: 2000,
    height: 1295,
    alt: "A mature industrial hemp crop stretching towards a tree line under a soft blue sky.",
    subject: "Industrial hemp field, Lower Austria",
    credit: {
      author: "D-Kuru",
      license: "CC BY-SA 4.0",
      licenseUrl: CC_BY_SA_4,
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Industrial_hemp_field_near_Biedermannsdorf_in_Lower_Austria,_Austria-field_VD_SE_hover_PNr%C2%B01281.jpg",
      note: RESIZED,
    },
  },
  cropSummer: {
    src: "/images/home/hemp-crop-summer.jpg",
    width: 1080,
    height: 720,
    alt: "Rows of tall, green industrial hemp plants in summer with farm buildings in the distance.",
    subject: "Industrial hemp crop in summer",
    credit: {
      author: "Kifcure",
      license: "CC0 1.0",
      licenseUrl: CC0,
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Hemp-field-1080x720.jpg",
    },
  },
  canopyAerial: {
    src: "/images/cultivation/hemp-canopy-aerial.jpg",
    width: 2000,
    height: 1125,
    alt: "Overhead view of a dense industrial hemp canopy.",
    subject: "Industrial hemp canopy from above, Lower Austria",
    credit: {
      author: "D-Kuru",
      license: "CC BY-SA 4.0",
      licenseUrl: CC_BY_SA_4,
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Industrial_hemp_field_near_Biedermannsdorf_in_Lower_Austria,_Austria-field_top_hover_ar_16to9_PNr%C2%B01282.jpg",
      note: RESIZED,
    },
  },
  fieldWide: {
    src: "/images/cultivation/hemp-field-wide.jpg",
    width: 2000,
    height: 1125,
    alt: "A wide industrial hemp field bordered by hedgerows and woodland.",
    subject: "Industrial hemp field, wide view, Lower Austria",
    credit: {
      author: "D-Kuru",
      license: "CC BY-SA 4.0",
      licenseUrl: CC_BY_SA_4,
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Industrial_hemp_field_near_Biedermannsdorf_in_Lower_Austria,_Austria-field_VD_N_hover_ar_16to9_PNr%C2%B01280.jpg",
      note: RESIZED,
    },
  },
  plantDetail: {
    src: "/images/brand/hemp-plant-detail.jpg",
    width: 1082,
    height: 2400,
    alt: "The upper stem and slender leaves of a single industrial hemp plant.",
    subject: "Industrial hemp plant, detail",
    credit: {
      author: "D-Kuru",
      license: "CC BY-SA 4.0",
      licenseUrl: CC_BY_SA_4,
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Industrial_hemp_field_near_Biedermannsdorf_in_Lower_Austria,_Austria-plant_hover_PNr%C2%B01283.jpg",
      note: "Cropped, resized and recompressed for the web.",
    },
  },
  ashantiLandscape: {
    src: "/images/cultivation/ashanti-region-landscape.jpg",
    width: 2000,
    height: 1330,
    alt: "Morning mist over forest and woodland in the Ashanti Region of southern Ghana.",
    subject: "Forest and woodland, Ashanti Region, Ghana",
    credit: {
      author: "Joachim Huber",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Forests_and_Woodlands,_Ashanti_region,_South_Ghana.jpg",
      note: RESIZED,
    },
  },
  soilHealth: {
    src: "/images/cultivation/soil-health-assessment.jpg",
    width: 2000,
    height: 1429,
    alt: "A hand holding a sample of dark, crumbly soil above a row crop during a field assessment.",
    subject: "Soil health assessment in a row crop",
    credit: {
      author: "USDA Natural Resources Conservation Service, South Dakota",
      license: "Public domain",
      licenseUrl: null,
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Soybean_Field_with_Healthy_Soil_(9316804120).jpg",
    },
  },
  harvestMachinery: {
    src: "/images/cultivation/hemp-harvest-machinery.jpg",
    width: 2000,
    height: 1333,
    alt: "A combine harvester unloading into a trailer during a hemp harvest.",
    subject: "Mechanised hemp harvest, France",
    credit: {
      author: "Aleks",
      license: "CC BY-SA 3.0",
      licenseUrl: CC_BY_SA_3,
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Recoltechv.jpg",
      note: RESIZED,
    },
  },
  bastFibre: {
    src: "/images/applications/hemp-bast-fibre.jpg",
    width: 2000,
    height: 1333,
    alt: "Close-up of long, pale bast fibres peeling away from a hemp stalk.",
    subject: "Hemp bast fibre",
    credit: {
      author: "SpessiG",
      license: "CC0 1.0",
      licenseUrl: CC0,
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Hemp_fiber.jpg",
    },
  },
  stalkFibre: {
    src: "/images/applications/hemp-stalk-fibre.jpg",
    width: 2000,
    height: 1500,
    alt: "A hemp stalk with its outer fibres separated and fanned out against a dark background.",
    subject: "Hemp stalk with separated fibres",
    credit: {
      author: "Natrij",
      license: "Public domain",
      licenseUrl: null,
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Hanfstengel.jpg",
    },
  },
  hempcrete: {
    src: "/images/applications/hempcrete-wall.jpg",
    width: 2000,
    height: 1500,
    alt: "The textured surface of a hempcrete wall, showing hemp shiv bound in lime.",
    subject: "Hempcrete wall surface",
    credit: {
      author: "Jnzl's Photos",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Hempcrete_wall.jpg",
      note: RESIZED,
    },
  },
  rawMaterials: {
    src: "/images/applications/hemp-raw-materials.jpg",
    width: 2000,
    height: 739,
    alt: "Samples of hemp raw materials, including shiv and loose fibre, in clear bags.",
    subject: "Hemp raw material samples",
    credit: {
      author: "D-Kuru",
      license: "CC BY-SA 3.0 AT",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/at/deed.en",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:4_products_of_hemp-fabric%2Bparing%2Bfibres%2Bwool_PNr%C2%B00084.jpg",
      note: RESIZED,
    },
  },
  hulledSeed: {
    src: "/images/applications/hemp-seed-hulled.jpg",
    width: 1842,
    height: 1844,
    alt: "A bowl of hulled hemp seed with a spoon.",
    subject: "Hulled hemp seed",
    credit: {
      author: "ElinorD",
      license: "CC BY-SA 3.0",
      licenseUrl: CC_BY_SA_3,
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Shelled_hemp_seeds.jpg",
    },
  },
  seedOil: {
    src: "/images/applications/hemp-seed-oil.jpg",
    width: 2000,
    height: 2594,
    alt: "A glass jug of dark green cold-pressed hemp seed oil.",
    subject: "Cold-pressed hemp seed oil",
    credit: {
      author: "JasonHS",
      license: "CC0 1.0",
      licenseUrl: CC0,
      sourceUrl: "https://commons.wikimedia.org/wiki/File:HempSeedOil_TasmanianOrganic.jpg",
    },
  },
  laboratory: {
    src: "/images/pharmaceutical/laboratory-pipettes.jpg",
    width: 2000,
    height: 1333,
    alt: "A rack of adjustable laboratory pipettes on a laboratory bench.",
    subject: "Laboratory pipettes",
    credit: {
      author: "J.N. Eskra",
      license: "CC BY-SA 4.0",
      licenseUrl: CC_BY_SA_4,
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Laboratory_pipettes.jpg",
      note: RESIZED,
    },
  },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;
