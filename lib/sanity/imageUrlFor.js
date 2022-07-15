import sanity from "./client";
import imageUrlBuilder from "@sanity/image-url";

const imageBuilder = imageUrlBuilder(sanity);

const imageUrlFor = (source) => imageBuilder.image(source);

export default imageUrlFor;
