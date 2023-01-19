import { motion } from "framer-motion";
import { FRAMER_TRANSITION_FASTEASE } from "@/lib/framer/animations";
import css from "styled-jsx/css";
import { useForm } from "react-hook-form";
import Button from "./Button";
import { observer } from "mobx-react-lite";
import { useShoppingCart } from "use-shopping-cart";
import PriceTracker from "../PriceTracker/PriceTracker";
import { useCallback, useEffect, useState } from "react";
import { fetchPostJSON } from "@/utils/apiHelpers";
import { useDataStore, useUIStore } from "../../providers/RootStoreProvider";
import { useIsSmall } from "@/utils/useMediaQueries";
import { useRef } from "react";
import { useRouter } from "next/router";
import { FORM_SCREENS } from "@/components/Order/Order";
import cx from "classnames";

function useAudio(path) {
  const [audio, setAudio] = useState(new Audio(path));
  const [source, setSource] = useState(path);
  const [playing, setPlaying] = useState(false);

  function play() {
    setPlaying(true);
    audio.play();
  }

  function stop() {
    setPlaying(false);
    audio.pause();
    audio.currentTime = 0;
  }

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, [audio]);

  return [play, { playing, stop }];
}

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

const variants = {
  active: {
    y: 0,

    transition: FRAMER_TRANSITION_FASTEASE,
  },

  inactive: {
    y: -60,
    transition: FRAMER_TRANSITION_FASTEASE,
  },
};

const useButtonThrottle = () => {
  // If you spam either button, there is a chance that is messes with
  // the AnimatePresence wrapping the form components. Since there
  // is no reason we need to allow someone to click through that fast
  // set an articifical delay on the button click handlers.
  const [isThrottled, setIsThrottled] = useState(false);
  const throttleTimer = useRef(null);

  const throttle = () => {
    setIsThrottled(true);
    if (throttleTimer.current !== null) {
      clearTimeout(throttleTimer.current);
    }
    throttleTimer.current = setTimeout(() => {
      setIsThrottled(false);
    }, FRAMER_TRANSITION_FASTEASE.duration * 1000);
  };
  return [isThrottled, throttle];
};

const Controls = ({ data, step, increment, decrement }) => {
  const [isThrottled, throttle] = useButtonThrottle();

  const [playNextSoundFx] = useAudio("/sounds/Woodblock-01.mp3");
  const [playPreviousSoundFx] = useAudio("/sounds/Woodblock-02.mp3");

  const router = useRouter();

  const isSmall = useIsSmall();

  const nextButtonDisabled = useIsNextButtonDisabled(step);

  const handlePreviousButtonPressed = () => {
    throttle();
    decrement();
    playPreviousSoundFx();
  };

  const handleNextButtonPressed = () => {
    throttle();
    increment();
    playNextSoundFx();
  };

  const noPreviousPage = step <= 1;
  const noNextPage = step >= FORM_SCREENS + 1;

  return (
    <div
      className={cx(
        "sm:bottom-0 fixed right-0 left-0 p-12 sm:p-32 flex justify-between",
        step < 5 && "bottom-116",
        step >= 5 && "bottom-0"
      )}
    >
      <Button
        key="previous-button"
        onClick={handlePreviousButtonPressed}
        label="Back"
        disabled={noPreviousPage || isThrottled}
      />

      {step < FORM_SCREENS + 1 && (
        <Button
          key="next-button"
          onClick={handleNextButtonPressed}
          label="Next"
          disabled={nextButtonDisabled || noNextPage || isThrottled}
          className="is-active-control"
        />
      )}
    </div>
  );
};
export default observer(Controls);
