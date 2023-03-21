import React, { useState } from "react";
import styles from "./toggleSwitch.module.css";

function ToggleSwitch() {
  const [isToggled, setIsToggled] = useState(false);
  const onToggle = () => setIsToggled(!isToggled);
  return (
    <label className={styles.toggleswitch}>
      <input className={styles.checkbox} type="checkbox" checked={isToggled} onChange={onToggle} />
      <span className={styles.switch} />
    </label>
  );
}
export default ToggleSwitch;