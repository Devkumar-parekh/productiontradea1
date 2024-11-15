import React from "react";

function Toast() {
  return (
    <div>
      <button type="button" className="btn btn-primary" id="liveToastBtn">
        Show live toast
      </button>

      <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
        <div
          id="liveToast"
          className="toast hide"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            <div className="rounded me-2" alt="..."></div>
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body">
            Hello, world! This is a toast message.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Toast;
