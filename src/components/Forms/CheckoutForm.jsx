import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import "@stripe/react-stripe-js/src";
import "./CheckoutStyles.css";
import { useEffect, useState } from "react";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import axios from "axios";
import { updateRoomStatus } from "../../api/bookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ImSpinner9 } from "react-icons/im";
import useAuth from "../../api/useAuth";
const CheckoutForm = ({ closeModal, bookingInfo }) => {
  const [axiosSecure] = useAxiosSecure();
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  //   1.  get clientSecret from backend
  useEffect(() => {
    if (bookingInfo.price > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: bookingInfo.price })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [bookingInfo, axiosSecure]);

  const handleSubmit = async (event) => {
    setProcessing(true);
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      setError(confirmError.message);
    }

    if (paymentIntent.status === "succeeded") {
      // save payment in db
      const paymentInfo = {
        ...bookingInfo,
        transactionId: paymentIntent.id,
        date: new Date(),
      };
      axiosSecure.post("/bookings", paymentInfo).then((res) => {
        console.log(paymentIntent);
        if (res.data.insertedId) {
          updateRoomStatus(paymentInfo.roomId, true)
            .then((data) => {
              console.log(data);
              const text = `Booking successful! TransactionId: ${paymentIntent.id}`;
              toast.success(text);
              navigate("/dashboard/my-bookings");
              setProcessing(false);
              closeModal();
            })
            .catch((err) => {
              toast.error(err.message);
              setProcessing(false);
            });
        }
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <div className="flex mt-2 justify-around">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            onClick={closeModal}>
            Cancel
          </button>
          <button
            disabled={!stripe || processing || !clientSecret}
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2">
            {processing ? (
              <ImSpinner9 className="animate-spin m-auto" size={24} />
            ) : (
              `Pay ${bookingInfo.price}$`
            )}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm ml-4 mt-2">{error}</p>}
      </form>
    </>
  );
};

export default CheckoutForm;
