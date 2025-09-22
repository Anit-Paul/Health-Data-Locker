import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../card/card";
import styles from "./profile.module.css"; // ✅ import css module

function Profile() {
  const [details, setDetails] = useState(null);
  const [records, setRecords] = useState([]);
  const [loadingRecords, setLoadingRecords] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/details/get`,
          {},
          { withCredentials: true }
        );
        setDetails(response.data.user[0]);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    const fetchRecords = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/record`,
          { withCredentials: true }
        );

        if (response.status === 200 || response.status === 201) {
          setRecords(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching records:", err);
      } finally {
        setLoadingRecords(false);
      }
    };

    fetchDetails();
    fetchRecords();
  }, []);

  if (!details) {
    return <p>Loading patient details...</p>;
  }

  return (
    <>
      <div className={styles.details}>
        <h1>Patient's Medical Details</h1>
        <p>Patient's name : {details.name}</p>
        <p>Date of Birth : {details.dob}</p>
        <p>Gender : {details.gender}</p>
        <p>Blood Group : {details.bloodGroup}</p>
        <p>Contact Number : {details.contact}</p>
        <p>Emergency Contact : {details.emergencyContact}</p>
        <p>Birth Mark : {details.birthMark}</p>
        <p>Physical Disability : {details.physicalDisability}</p>
      </div>

      <br />

      <div className={styles.records}>
        <h1>Patient's Medical Records</h1>

        {loadingRecords ? (
          <p className={styles.infoMessage}>Loading medical records...</p>
        ) : records.length === 0 ? (
          <p className={styles.infoMessage}>No records found</p>
        ) : (
          <div className={styles.recordsGrid}>
            {records.map((data, index) => (
              <Card key={index} {...data} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
