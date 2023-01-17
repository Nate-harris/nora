import groq from "groq";

// Construct our "image meta" GROQ
export const imageMeta = groq`
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

export const nameSelection = groq`
  slug,
  description,
  exampleName,
  price,
  minNumLetters,
  maxNumLetters
`;

export const colorSelection = groq`
  slug,
  description,
  minNumColors,
  maxNumColors,
  colors[] {
      hex
  },
  palettes[]->{
    name,
    colors[] {
      hex
    }
  },
  allowCustomCommissionColorSelection
`;

export const frameSelection = groq`
  slug,
  description,
  options[]->{
    type,
    price,
    templateImage{
      ${imageMeta}
    },
    exampleImages[] ->{asset}
  }
`;

export const shippingSelection = groq`
  slug,
  description,
  options[]->{
    type,
    price
  }
`;

export const commissionFormQuery = groq`*[_type == "commission"] {
  "name": nameSelection {
    "order": 0,
    ${nameSelection}
  },
  "color": colorSelection {
    "order": 1,
    ${colorSelection}
  },
  "frame": frameSelection {
    "order": 2,
    ${frameSelection}
  },
  "shipping": shippingSelection {
    "order": 3,
    ${shippingSelection}
  },
  "checkout": checkout {
    name,
    description,
    image {
      ${imageMeta}
    }
  },
  successMessage
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

const galleryItem = groq`
name,
photo {
    ${imageMeta}
},
note,
colors[],
frame->{
  type,
},
`;

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
export const homeID = groq`*[_type=="generalSettings"][0].home->_id`;
export const orderID = groq`*[_type=="generalSettings"][0].order->_id`;

export const errorID = groq`*[_type=="generalSettings"][0].error->_id`;

// Construct our "page" GROQ
const page = groq`
  "type": _type,
  "slug": slug.current,
  "isHome": _id == ${homeID},
  "isOrder": _id == ${orderID},
`;

// Construct our "link" GROQ
const link = groq`
  _key,
  _type,
  title,
  url,
  "page": page->{
    ${page}
  }
`;

// Construct our "portable text content" GROQ
export const ptContent = groq`
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
export const blocks = groq`
  _type == 'freeform' => {
    _type,
    _key,
    content[]{
      ${ptContent}
    },
    textAlign,
    minWidth,
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
export const modules = groq`
  _type == 'grid' => {
    _type,
    _key,
    size,
    isClipped,
    backgroundColor,
    textColor,
    backgroundImage {
      ${imageMeta}
    },
    backgroundSize {
      width,
      height
    },
    backgroundTexture,
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
    backgroundColor,
    photo{
      ${imageMeta}
    }
  },
  _type == 'gallerySection' => {
    _type,
    _key,
    content[] {
      ${galleryItem}
    }
  },
  _type == 'hero' => {
    _type,
    _key,
    content[]{
      ${ptContent}
    },
    isFixed,
    bgType,
    photos{
      ...,
      mobilePhoto{
        ${imageMeta}
      },
      desktopPhoto{
        ${imageMeta}
      }
    },
    video{
      id,
      title
    },
    videoPlaceholder {
      ${imageMeta}
    }
  },
  _type == 'marquee' => {
    _type,
    _key,
    isClipped,
    backgroundColor,
    items[]{
      _type == 'simple' => {
        _type,
        text
      },
      _type == 'photo' => {
        _type,
        "photo": {
          ${imageMeta}
        }
      }
    },
    speed,
    reverse,
    pausable
  }
`;

// Construct our "site" GROQ
export const site = groq`
  "site": {
    "title": *[_type == "generalSettings"][0].siteTitle,
    "rootDomain": *[_type == "generalSettings"][0].siteURL,
    "header": *[_type == "headerSettings"][0]{
      menu->{
        items[]{
          ${link}
        }
      }
    },
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
