"use client";
import React from "react";

import ProtectedEmail from "@/components/protected-email";

function ProtectedEmailPage({ params }) {
  return (
    <div>
      <ProtectedEmail emailId={params.emailId} />
    </div>
  );
}

export default ProtectedEmailPage;
