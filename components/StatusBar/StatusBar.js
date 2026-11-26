import { observer } from "mobx-react-lite";
import Information from "@/components/StatusBar/Information";

const StatusBar = observer(({ hasInformation }) => {
  return (
    <div className={"status-bar--container"}>
      <div className="status-bar--inner">
        {hasInformation && <Information label={"How this works"} />}
      </div>
    </div>
  );
});

export default StatusBar;
