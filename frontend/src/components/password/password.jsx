import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./password.module.css";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { useState } from "react";

function Password({ value, onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  function togglePassword() {
    setShowPassword((prev) => !prev);
  }

  return (
    <div className={styles.formGroup}>
      <label htmlFor="password" className={styles.formLabel}>
        Password
      </label>
      <div className={styles.passwordWrapper}>
        <input
          type={showPassword ? "text" : "password"}
          className={styles.formInput}
          id="password"
          placeholder="Enter your password"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
        />
        <span className={styles.icon} onClick={togglePassword}>
          {showPassword ? <GoEye /> : <GoEyeClosed />}
        </span>
      </div>
    </div>
  );
}

export default Password;
