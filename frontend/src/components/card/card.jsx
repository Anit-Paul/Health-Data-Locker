import styles from "./card.module.css";

function Card({ fileName, fileType, filePath, doctorName, description, uploadedAt, onDelete }) {
  // check if the file is a PDF
  const isPdf = filePath?.toLowerCase().endsWith(".pdf");

  const handleView = () => {
    window.open(filePath, "_blank");
  };

  return (
    <div className={styles.card}>
      <div className={styles.filePreview}>
        {isPdf ? (
          <iframe
            src={filePath}
            title={fileName}
            className={styles.pdfPreview}
          />
        ) : (
          <img
            src={filePath}
            alt={fileName}
            className={styles.imagePreview}
          />
        )}
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{fileName}</h3>
        <p className={styles.cardType}>{fileType}</p>
        <p className={styles.cardDesc}>{description}</p>
        <p className={styles.cardDoctor}>Doctor: {doctorName}</p>
        <span className={styles.cardDate}>
          Uploaded: {new Date(uploadedAt).toLocaleDateString()}
        </span>

        <div className={styles.cardActions}>
          <button className={styles.viewBtn} onClick={handleView}>
            View
          </button>
          <button className={styles.deleteBtn} onClick={() => onDelete(filePath)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
