import groq from "groq";

export const nameSelection = `
    description,
    price,
`;

export const colorSelection = `
    description,
    palettes[]->{
        colors[] {
            hex
        }
    },
    allowCustomCommissionColorSelection
`;

export const frameSelection = `
    description,
    options[] -> {
        type,
        price,
        templateImage->{asset},
        exampleImages[] ->{asset}
    }
`;

export const shippingSelection = `
    description,
    options[] {
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
