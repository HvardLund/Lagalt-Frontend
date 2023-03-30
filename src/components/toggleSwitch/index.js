import React, { useState } from "react";
import styles from "./toggleSwitch.module.css";

//toggle switch
function ToggleSwitch() {

  //toggle state
  const [isToggled, setIsToggled] = useState(false);

  //handles what happens when the toggle is switched
  const onToggle = () => setIsToggled(!isToggled);
  return (
    <label className={styles.toggleswitch}>
      <input className={styles.checkbox} type="checkbox" checked={isToggled} onChange={onToggle} />
      <span className={styles.switch} />
    </label>
  );
}
export default ToggleSwitch;