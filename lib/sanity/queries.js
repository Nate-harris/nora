import groq from "groq";

export const nameSelection = `
    description,
    price,
    maxNumLetters
`;

export const colorSelection = `
    description,
    palettes[]->{
        name,
        colors[] {
            hex
        }
    },
    allowCustomCommissionColorSelection
`;

export const frameSelection = `
    description,
    options[]->{
        type,
        price,
        templateImage{
           asset-> { url }
        },
        exampleImages[] ->{asset}
    }
`;

export const shippingSelection = `
    description,
    options[]->{
        type,
        price
    }
`;

export const commissionFormQuery = groq`*[_type == "commission"] {
    nameSelection {
        ${nameSelection}
    },
    colorSelection {
        ${colorSelection}
    },
    frameSelection {
        ${frameSelection}
    },
    shippingSelection {
        ${shippingSelection}
    }
}[0]
`;

export const pricePerLetterQuery = groq`*[_type == "commission"] {
    "price": nameSelection {
       price
    }.price
}[0]
`;
export const framePriceQuery = groq`*[_type == "frame" && type == $type] {
    price
}[0]`;
export const shippingPriceQuery = groq`*[_type == "shippingOption" && type == $type] {
    price
}[0]`;

export const commissionValidateQuery = groq`*[_type == "commission"] {
    "id": _id,
    "name": _id,
    "currency": "USD",
    "product_data": {
      "metadata": {
        "type": 'commission'
      }
    },
    "price_data": {
        "unit_amount": 2000,
    }
}`;

// Construct our "home" and "error" page GROQ
export const homeID = `*[_type=="generalSettings"][0].home->_id`;
export const errorID = `*[_type=="generalSettings"][0].error->_id`;

// Construct our "page" GROQ
const page = `
  "type": _type,
  "slug": slug.current,
  "isHome": _id == ${homeID},
`;

// Construct our "link" GROQ
const link = `
  _key,
  _type,
  title,
  url,
  "page": page->{
    ${page}
  }
`;

// Construct our "image meta" GROQ
export const imageMeta = `
  "alt": coalesce(alt, asset->altText),
  asset,
  crop,
  customRatio,
  hotspot,
  "id": asset->assetId,
  "type": asset->mimeType,
  "aspectRatio": asset->metadata.dimensions.aspectRatio,
  "lqip": asset->metadata.lqip
`;

// Construct our "portable text content" GROQ
export const ptContent = `
  ...,
  markDefs[]{
    ...,
    _type == "link" => {
      "url": @.url,
      "isButton": @.isButton,
      "styles": @.styles{style, isLarge, isBlock},
      "page":@.page->{
        ${page}
      }
    }
  },
  _type == "photo" => {
    ${imageMeta}
  }
`;

// Construct our "blocks" GROQ
export const blocks = `
  _type == 'freeform' => {
    _type,
    _key,
    content[]{
      ${ptContent}
    },
    textAlign,
    maxWidth
  },
  _type == 'accordions' => {
    _type,
    _key,
    items[]{
      "id": _key,
      title,
      content[]{
        ${ptContent}
      }
    }
  }
`;

// Construct our content "modules" GROQ
export const modules = `
  _type == 'grid' => {
    _type,
    _key,
    size,
    backgroundColor,
    columns[]{
      sizes[]{
        breakpoint,
        width,
        justify,
        align,
        start
      },
      blocks[]{
        ${blocks}
      }
    }
  },
  _type == 'dividerPhoto' => {
    _type,
    _key,
    photo{
      ${imageMeta}
    }
  }
`;

// Construct our "site" GROQ
export const site = `
  "site": {
    "title": *[_type == "generalSettings"][0].siteTitle,
    "rootDomain": *[_type == "generalSettings"][0].siteURL,
    "footer": *[_type == "footerSettings"][0]{
      "blocks": [
        {
          "title": blockTitle2,
          "menu": blockMenu2->{
            items[]{
              ${link}
            }
          }
        },
        {
          "title": blockTitle3,
          "menu": blockMenu3->{
            items[]{
              ${link}
            }
          }
        },
        {
          "title": blockTitle4,
          social[]{
            icon,
            url
          }
        }
      ]
    },
    "seo": *[_type == "seoSettings"][0]{
      metaTitle,
      metaDesc,
      shareTitle,
      shareDesc,
      shareGraphic,
      "favicon": favicon.asset->url,
      "faviconLegacy": faviconLegacy.asset->url,
      touchIcon
    },
    "gtmID": *[_type == "generalSettings"][0].gtmID,
  }
`;
