"use client";

import { Suspense } from "react";
import LoginPage from "../access.js";

export default function AccessPage() {
  return (
    <Suspense fallback={null}>
      <LoginPage />
    </Suspense>
  );
}
