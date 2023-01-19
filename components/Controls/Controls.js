import Button from "./Button";
import { useDataStore } from "../../providers/RootStoreProvider";
import { FORM_SCREENS } from "@/components/Order/Order";
import cx from "classnames";
import { useAudio } from "@/utils/helpers";
import { observer } from "mobx-react-lite";

const useIsNextButtonDisabled = (step) => {
  const {
    isNameCompleted,
    isColorCompleted,
    isFrameCompleted,
    isShippingCompleted,
  } = useDataStore();
  switch (step) {
    case 1:
      return !isNameCompleted;
    case 2:
      return !isColorCompleted;
    case 3:
      return !isFrameCompleted;
    case 4:
      return !isShippingCompleted;
  }
};

const Controls = observer(({ data, step, increment, decrement }) => {
  const [playNextSoundFx] = useAudio("/sounds/Woodblock-01.mp3");
  const [playPreviousSoundFx] = useAudio("/sounds/Woodblock-02.mp3");

  const nextButtonDisabled = useIsNextButtonDisabled(step);

  const handlePreviousButtonPressed = () => {
    decrement();
    playPreviousSoundFx();
  };

  const handleNextButtonPressed = () => {
    increment();
    playNextSoundFx();
  };

  const noPreviousPage = step <= 1;
  const noNextPage = step >= FORM_SCREENS + 1;

  return (
    <div className={cx("order-controls--container")}>
      <Button
        key="previous-button"
        onClick={handlePreviousButtonPressed}
        label="Back"
        disabled={noPreviousPage}
      />

      {step < FORM_SCREENS + 1 && (
        <Button
          key="next-button"
          onClick={handleNextButtonPressed}
          label="Next"
          disabled={nextButtonDisabled || noNextPage}
          className="is-active-control"
        />
      )}
    </div>
  );
});

export default Controls;
