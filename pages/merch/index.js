// pages/merch/index.js

import Link from "next/link";
import Cart from "../../components/Cart";
// import CartSummary from "../../components/CartSummary";
import Products from "../../components/Products";
import { client } from "../../lib/sanity/client";
import { merchQuery } from "../../lib/sanity/merchQuery";

const Merch = ({ products }) => {
  return (
    <main>
      <h1>My Merch Store</h1>
      <p>
        Powered by the{" "}
        <a href="https://useshoppingcart.com">use-shopping-cart</a> React hooks
        library.
      </p>
      <Cart>
        <Products products={products} />
      </Cart>
      <Link href="/">
        <a>Back Home</a>
      </Link>
    </main>
  );
};

export default Merch;

export async function getStaticProps({ params }) {
  const products = await client.fetch(merchQuery);

  return {
    props: {
      products,
    },
  };
}
