import "../styles/tailwind.css";
import "../styles/app.css";
import Header from "../components/Header/Header";
import Menu from "../components/Menu/Menu";
import { RootStoreProvider } from "../providers/RootStoreProvider";
import { ThemeProvider } from 'next-themes';
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
       <ThemeProvider>
      <App {...props} />
      </ThemeProvider>
    </RootStoreProvider>
  );
}

export default AppWithProviders;
