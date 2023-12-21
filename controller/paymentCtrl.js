// const Razorpay = require("razorpay");
// const instance = new Razorpay({
//   key_id: "rzp_test_jk96M1tbCBGW2H",
//   key_secret: "XQoOhx6YjCyCmJIGtYJaWAhg",
// });

// const checkout = async (req, res) => {
//   const { amount } = req.body;
//   const option = {
//     amount: amount * 100,
//     currency: "INR",
//   };
//   const order = await instance.orders.create(option);
//   res.json({
//     success: true,
//     order,
//   });
// };

// const paymentVerification = async (req, res) => {
//   const { razorPayOrderId, razorPayPaymentId } = req.body;
//   res.json({
//     razorPayOrderId,
//     razorPayPaymentId,
//   });
// };

// module.exports = { checkout, paymentVerification };

const paypal = require("paypal-rest-sdk");
const YOUR_PAYPAL_CLIENT_ID =
  "AdOtUOMj1QrXwExOrTsrwZUpyyjAA8QVE1zbbcIFKb5RByJPo1QiUfMXPsX7e_Jiv1o6H_mM250OR4so";
const YOUR_PAYPAL_CLIENT_SECRET =
  "EL2cU0dBIel0CRhetOwJNw-2g9tU_TSUbqr1Pt0mFS4U5YLe_6uo5TK7OOwl_4yYHjSqp-df_QoEI5k-";

paypal.configure({
  mode: "sandbox", // hoặc 'live' trong môi trường thực tế
  client_id: YOUR_PAYPAL_CLIENT_ID,
  client_secret: YOUR_PAYPAL_CLIENT_SECRET,
});

const checkout = async (req, res) => {
  const { amount } = req.body;

  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://your-redirect-url/success",
      cancel_url: "http://your-redirect-url/cancel",
    },
    transactions: [
      {
        amount: {
          currency: "USD",
          total: amount,
        },
      },
    ],
  };

  paypal.payment.create(create_payment_json, (error, payment) => {
    if (error) {
      console.error("Error creating PayPal payment:", error);
      res.json({
        success: false,
        error: "Error creating PayPal payment",
      });
    } else {
      res.json({
        success: true,
        payment,
      });
    }
  });
};

const paymentVerification = async (req, res) => {
  const { paymentId, payerId } = req.body;

  const execute_payment_json = {
    payer_id: payerId,
  };

  paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
    if (error) {
      console.error("Error executing PayPal payment:", error);
      res.json({
        success: false,
        error: "Error executing PayPal payment",
      });
    } else {
      res.json({
        success: true,
        payment,
      });
    }
  });
};

module.exports = { checkout, paymentVerification };
