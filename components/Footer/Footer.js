import React from "react";
import ThemeSwitch from "./ThemeSwitcher";

const Footer = ({ data = {} }) => {
  const { blocks } = data;

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer--grid">
        {blocks.map((block, key) => (
          <div key={key} className="footer--block">
            {block.title && <p className="is-h3">{block.title}</p>}

            {block.social && (
              <div className="menu-footer">
                {block.social.map((link, key) => {
                  console.log(link);
                  return (
                    <a
                      key={key}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.icon}
                    </a>
                  );
                })}
              </div>
            )}

            {/* Put our extras in the last block */}
            {key === 3 && (
              <div className="footer--extras">
                <div className="footer--disclaimer">
                  <p>&copy; {new Date().getFullYear()}. All Rights Reserved.</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
