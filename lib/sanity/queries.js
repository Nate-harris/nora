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
