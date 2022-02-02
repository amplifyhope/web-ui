import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Home: NextPage = () => {
  const [price, setPrice] = useState<number>(0);
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you're ready"
      );
    }

    //TODO: get prices based on product ID
    //TODO: Create buttons for 20, 50, 100, other
    //TODO: When other is selected, render input field. When submitted, create new price, then create checkout session with new price
  }, []);

  const handleSubmit = () => {
    fetch("/api/checkout/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(price),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <section>
        <input
          id="price"
          value={price}
          onChange={(event) => setPrice(+event.target.value)}
          placeholder="$0.00"
        />
        <button type="submit" role="link">
          Donate
        </button>
      </section>
    </form>
  );
};

export default Home;
