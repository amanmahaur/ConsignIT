import React, { useEffect, useState } from "react";
import { Container, BuyForm } from "../components";

import { useSelector } from "react-redux";

function BuyPost() {
  const userData = useSelector((state) => state.auth.userData);



  return (
    <div className="py-8">
      <Container>
        <h1 className="text-2xl font-bold mb-4">Buy This Product</h1>
        <BuyForm
          buyer={{
            name: userData?.name,
            email: userData?.email,
            userId: userData?.$id,
          }}
        />
      </Container>
    </div>
  );
}

export default BuyPost;
