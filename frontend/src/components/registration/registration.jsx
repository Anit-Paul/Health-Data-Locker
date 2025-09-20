import "bootstrap/dist/css/bootstrap.min.css";
import { IoCreateOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "./registration.module.css";
import Password from "../password/password";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../../store/userContext";
import { useContext } from "react";
function Registration() {
  const [name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {getUser}=useContext(UserContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/register`,
        { name, email, password },
        { withCredentials: true }
      );
      if (response.status == 200 || response.status == 201) {
        await getUser();
        navigate("/details");
      } else {
        return response.data;
      }
    } catch (err) {
      console.log("error in registration.jsx handleSubmit");
      console.log(err);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h4 className={styles.loginTitle}>Register Yourself!</h4>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.formLabel}>
              Full Name
            </label>
            <input
              type="text"
              className={styles.formInput}
              id="name"
              placeholder="Enter your Full Name"
              value={name}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

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
            <IoCreateOutline />
            Create Account
          </button>

          <Link to="/login" className={styles.signupLink}>
            Already have an account? Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Registration;
