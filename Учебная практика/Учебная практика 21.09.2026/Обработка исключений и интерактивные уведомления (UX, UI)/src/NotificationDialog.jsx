const icons = {
  error: '×',
  warning: '!',
  information: 'i'
};

const NotificationDialog = ({ dialog, onClose }) => {
  if (!dialog) {
    return null;
  }

  return (
    <div className="dialog-backdrop" role="presentation">
      <section className={`dialog dialog-${dialog.type}`} role="alertdialog" aria-labelledby="dialog-title">
        <span className="dialog-icon" aria-hidden="true">{icons[dialog.type]}</span>
        <div>
          <h2 id="dialog-title">{dialog.title}</h2>
          <p>{dialog.message}</p>
          <button className="primary-button" type="button" onClick={onClose}>{dialog.buttonText}</button>
        </div>
      </section>
    </div>
  );
};

export default NotificationDialog;
