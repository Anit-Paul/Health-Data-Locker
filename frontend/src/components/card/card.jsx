import styles from "./card.module.css";

function Card({ fileUrl, name, description, date }) {
  // check if the file is a PDF
  const isPdf = fileUrl?.toLowerCase().endsWith(".pdf");

  return (
    <div className={styles.card}>
      <div className={styles.filePreview}>
        {isPdf ? (
          <iframe
            src={fileUrl}
            title={name}
            className={styles.pdfPreview}
          />
        ) : (
          <img
            src={fileUrl}
            alt={name}
            className={styles.imagePreview}
          />
        )}
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{name}</h3>
        <p className={styles.cardDesc}>{description}</p>
        <span className={styles.cardDate}>{date}</span>
      </div>
    </div>
  );
}

export default Card;
