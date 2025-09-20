import { useState } from "react";
import styles from "./details.module.css";

function Details() {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    contact: "",
    emergencyContact: "",
    birthMark: "",
    physicalDisability: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <>
      <h1 className={styles.heading}>Fill the details correctly!</h1>
      <form className={styles.formGrid} onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.formLabel}>Full Name</label>
          <input
            type="text"
            className={styles.formInput}
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
            required
          />
        </div>

        {/* DOB */}
        <div className={styles.formGroup}>
          <label htmlFor="dob" className={styles.formLabel}>Date of Birth</label>
          <input
            type="date"
            className={styles.formInput}
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>

        {/* Gender */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Gender</label>
          <select
            className={styles.formSelect}
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Blood Group */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Blood Group</label>
          <select
            className={styles.formSelect}
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
          >
            <option value="">Select blood group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>

        {/* Contact */}
        <div className={styles.formGroup}>
          <label htmlFor="contact" className={styles.formLabel}>Contact Number</label>
          <input
            type="tel"
            className={styles.formInput}
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Enter contact number"
            required
          />
        </div>

        {/* Emergency Contact */}
        <div className={styles.formGroup}>
          <label htmlFor="emergencyContact" className={styles.formLabel}>Emergency Contact</label>
          <input
            type="tel"
            className={styles.formInput}
            id="emergencyContact"
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={handleChange}
            placeholder="Enter emergency contact"
          />
        </div>

        {/* Birth Mark */}
        <div className={styles.formGroup}>
          <label htmlFor="birthMark" className={styles.formLabel}>Birth Mark</label>
          <input
            type="text"
            className={styles.formInput}
            id="birthMark"
            name="birthMark"
            value={formData.birthMark}
            onChange={handleChange}
            placeholder="Enter any birth mark"
          />
        </div>

        {/* Physical Disability */}
        <div className={styles.formGroup}>
          <label htmlFor="physicalDisability" className={styles.formLabel}>Physical Disability</label>
          <input
            type="text"
            className={styles.formInput}
            id="physicalDisability"
            name="physicalDisability"
            value={formData.physicalDisability}
            onChange={handleChange}
            placeholder="Enter physical disability if any"
          />
        </div>

        {/* Submit Button spanning full width */}
        <div className={styles.fullWidth}>
          <button type="submit" className={styles.submitButton}>
            Save Details
          </button>
        </div>
      </form>
    </>
  );
}

export default Details;
