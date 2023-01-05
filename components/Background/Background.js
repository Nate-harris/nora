import styles from "./Background.module.css";
import dynamic from "next/dynamic";
const WoodgrainShaderSketch = dynamic(
  () => import("../WoodgrainShaderSketch"),
  {
    loading: () => "",
    ssr: false,
  }
);
const Background = () => {
  return (
    <div className={styles.container}>
      <WoodgrainShaderSketch color={"#f2dcb5"} alpha={220} />
    </div>
  );
};

export default Background;
