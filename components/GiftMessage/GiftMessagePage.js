import { observer } from "mobx-react-lite";

import { useDataStore } from "../../providers/RootStoreProvider";
import cx from "classnames";

const MAX_GIFT_MESSAGE_LENGTH = 200;

const GiftMessagePage = observer(() => {
  const { isGift, giftMessage, setIsGift, setGiftMessage } = useDataStore();

  return (
    <div className="gift-message">
      <div className="gift-message--header">
        <h1>Sending as a gift?</h1>
        <p>We can include a gift message</p>
      </div>

      <div className="gift-message--choices">
        <button
          type="button"
          className={cx(
            "btn gift-message--choice",
            isGift === true && "is-active-control"
          )}
          onClick={() => setIsGift(true)}
          aria-pressed={isGift === true}
        >
          Yes
        </button>
        <button
          type="button"
          className={cx(
            "btn gift-message--choice",
            isGift === false && "is-active-control"
          )}
          onClick={() => setIsGift(false)}
          aria-pressed={isGift === false}
        >
          No
        </button>
      </div>

      {isGift && (
        <input
          className="gift-message--input"
          type="text"
          value={giftMessage}
          maxLength={MAX_GIFT_MESSAGE_LENGTH}
          placeholder="Type in your name or message"
          aria-label="Gift message"
          onChange={(event) => setGiftMessage(event.target.value)}
          autoFocus
        />
      )}
    </div>
  );
});

export default GiftMessagePage;
