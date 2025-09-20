import "bootstrap/dist/css/bootstrap.min.css";
import { AiOutlineLogin } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import Password from "../password/password";
import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // <-- hook
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      if (response.status == 200 || response.status == 201) {
        navigate("/profile");
      } else {
        console.log(response.data);
      }
    } catch (err) {
      console.log("error in login.jsx handleSubmit");
      console.log(err);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h2 className={styles.loginTitle}>Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>
              Email address
            </label>
            <input
              type="email"
              className={styles.formInput}
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <Password value={password} onChange={setPassword} />

          <button type="submit" className={styles.loginButton}>
            <AiOutlineLogin />
            Login
          </button>

          <Link to="/registration" className={styles.signupLink}>
            Don't have an account? Sign up
          </Link>
        </form>
      </div>
    </div>
  );
}
export default Login;
