import React from "react";
import cx from "classnames";
import Freeform from "./Freeform";
import AccordionList from "./AccordionList";
import { buildSrc } from "@/utils/helpers";

const Grid = ({ data = {} }) => {
  const { size, columns } = data;

  const getGridSize = (
    breakpoint,
    size,
    justify = false,
    align = false,
    start = false
  ) => {
    const hasBreakpoint = breakpoint && breakpoint.trim();
    const colSpan = hasBreakpoint
      ? `${breakpoint}:col-span-${size}`
      : `col-span-${size}`;

    const colStart = hasBreakpoint
      ? `${breakpoint}:col-start-${start}`
      : `col-start-${start}`;

    const colJustify = hasBreakpoint ? `${breakpoint}:${justify}` : justify;
    const colAlign = hasBreakpoint ? `${breakpoint}:${align}` : align;

    return cx(
      colSpan,
      start && colStart,
      justify && colJustify,
      align && colAlign
    );
  };

  const style = {};

  let backgroundColor;
  if (data?.backgroundColor?.hex) {
    style.backgroundColor = data?.backgroundColor?.hex;
  }

  let textColor;
  if (data?.textColor?.hex) {
    style.color = data?.textColor?.hex;
  }

  let backgroundImage;
  if (data?.backgroundImage?.asset) {
    style.backgroundImage = `url(${buildSrc(data?.backgroundImage)})`;
  }

  let backgroundSize;
  if (data?.backgroundSize) {
    style.backgroundSize = `${data?.backgroundSize?.width}px ${data?.backgroundSize?.height}px`;
  }

  return (
    <section style={style} className={cx("section")}>
      <div className="section--content">
        <div
          className={`grid grid-cols-${size} gap-x-16 gap-y-16 sm:gap-x-32 lg:gap-x-48`}
        >
          {columns.map((col, key) => {
            const { sizes, blocks } = col;

            return (
              <div
                key={key}
                className={cx(
                  sizes.map((size) =>
                    getGridSize(
                      size.breakpoint,
                      size.width,
                      size.justify,
                      size.align,
                      size.start
                    )
                  )
                )}
              >
                {blocks.map((block, key) => (
                  <GridBlock key={key} block={block} />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const GridBlock = ({ block }) => {
  const type = block._type;

  switch (type) {
    case "freeform":
      return <Freeform data={block} />;
    case "accordions":
      return <AccordionList data={block} />;
    default:
      return null;
  }
};

export default Grid;
