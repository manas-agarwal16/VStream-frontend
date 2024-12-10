import React from "react";
import {
  Navbar,
  Sidebar,
  Subscription as SubscriptionComp,
} from "../components";
import { useParams } from "react-router-dom";

const Subscription = () => {
  const { _id } = useParams();
  return (
    <div>
      <Navbar />
      <Sidebar />
      <SubscriptionComp _id={_id} />
    </div>
  );
};

export default Subscription;
