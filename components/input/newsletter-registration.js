import { useRef, useContext } from "react";

import NotificationContext from "../../store/notification-context";

import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const emailInputRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    notificationCtx.showNotification({
      title: `Sending your request`,
      message: `Signing up your email for newsletter...`,
      status: `pending`,
    });

    fetch("/api/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: enteredEmail }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((error) => {
          throw new Error(error.message || `Something went wrong!`);
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: `Success!`,
          message: `Successfully registred for newsletter!`,
          status: `success`,
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: `Error`,
          message: error.message || `Something went wrong`,
          status: `error`,
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
