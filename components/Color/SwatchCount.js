import { observer } from "mobx-react-lite";
import { useDataStore, useUIStore } from "../../providers/RootStoreProvider";
import Swatch from "./Swatch";

const SwatchCount = observer(() => {
  const { colors, minNumColors, maxNumColors } = useDataStore();
  return (
    <>
      <div className="color-picker--count">
        {`${colors.length} of ${minNumColors}-${maxNumColors} colors selected`}
      </div>
    </>
  );
});

export default SwatchCount;
