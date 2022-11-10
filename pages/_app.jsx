import "../styles/tailwind.css";
import "../styles/app.css";
import Header from "../components/Header/Header";
import Menu from "../components/Menu/Menu";
import { RootStoreProvider } from "../providers/RootStoreProvider";

import Cart from "../components/Cart";

function App({ Component, pageProps }) {
  const items = [
    { label: "Order", href: "/order" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
  ];
  return (
    <Cart>
      <Menu items={items} />
      <Header />
      <Component {...pageProps} />
    </Cart>
  );
}

function AppWithProviders(props) {
  return (
    <RootStoreProvider hydrationData={props.pageProps.hydrationData}>
      <App {...props} />
    </RootStoreProvider>
  );
}

export default AppWithProviders;
