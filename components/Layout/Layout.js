import React, { useEffect, useState, memo } from "react";
import Script from "next/script";
import { motion } from "framer-motion";

import { isBrowser, isMobileSafari, useWindowSize } from "../../utils/helpers";

import { FRAMER_TRANSITION_EASEOUT } from "../../lib/framer/animations";
import HeadSEO from "../HeadSEO";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const pageTransitionAnim = {
  show: {
    opacity: 1,
    transition: {
      duration: FRAMER_TRANSITION_EASEOUT.duration / 1000,
      delay: 0.2,
      ease: "linear",
      when: "beforeChildren",
    },
  },
  hide: {
    opacity: 0,
    transition: {
      duration: FRAMER_TRANSITION_EASEOUT.duration / 1000,
      ease: "linear",
      when: "beforeChildren",
    },
  },
};

const Layout = ({ site = {}, page = {}, schema, children }) => {
  // set window height var (w/ safari/iOS hack)
  const { height: windowHeight } = useWindowSize();
  const [lockHeight, setLockHeight] = useState(false);
  const hasChin = isMobileSafari();

  // set header height
  const [headerHeight, setHeaderHeight] = useState(null);

  useEffect(() => {
    if ((isBrowser && !lockHeight) || !hasChin) {
      document.body.style.setProperty("--vh", `${windowHeight * 0.01}px`);
      setLockHeight(hasChin);
    }
  }, [windowHeight, hasChin]);

  return (
    <>
      <HeadSEO site={site} page={page} schema={schema} />

      {site.gtmID && (
        <Script
          id="gtm"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${site.gtmID}');`,
          }}
        />
      )}
      <Header
        data={site.header}
        isOrderPage={page.isOrderPage}
        onSetup={({ height }) => setHeaderHeight(height)}
      />
      <motion.div
        key={page.id}
        initial="hide"
        animate="show"
        exit="hide"
        variants={pageTransitionAnim}
        style={headerHeight ? { "--headerHeight": `${headerHeight}px` } : null}
      >
        <main id="content">{children}</main>
        <Footer data={site.footer} />
      </motion.div>
    </>
  );
};

export default Layout;
