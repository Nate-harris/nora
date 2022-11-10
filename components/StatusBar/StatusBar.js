import { useStore } from "../../lib/context";
import { observer } from "mobx-react-lite";
import { AnimateSharedLayout, motion, useTransform } from "framer-motion";
import classnames from "classnames";
import styles from "./StatusBar.module.css";
import { useUIStore } from "../../providers/RootStoreProvider";

const cx = classnames.bind(styles);

const Item = ({ label, active }) => {
  return (
    <li className={cx(styles.li)}>
      <div
        className={cx(
          "relative flex items-center px-8 my-8 transition-all duration-700 before:flex before:justify-center before:items-center before:relative before:rounded-full before:h-24 before:w-24 before:content-[counter(li-count)] before:transition-all before:duration-700",
          active && "text-pageBG before:bg-pageBG before:text-pageText",
          !active && "text-pageText before:bg-pageText before:text-pageBG"
        )}
      >
        <label className={"px-8"}>{label}</label>
        {active && (
          <motion.div
            layoutId="status"
            className="absolute -z-1 -top-5 -bottom-4 right-0 left-0 rounded-lg bg-pageText"
          />
        )}
      </div>
    </li>
  );
};

const StatusBar = observer(() => {
  const { formStep } = useUIStore();
  const steps = ["Name", "Color", "Frame", "Shipping", "Review"];
  return (
    <div className={"fixed left-16 top-1/2 -translate-y-1/2"}>
      <ul className={cx(styles.ul)}>
        {steps.map((step, index) => {
          return <Item key={index} label={step} active={index === formStep} />;
        })}
      </ul>
    </div>
  );
});

export default StatusBar;
