import React from "react";
import { Header } from "../header/Header";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </>
  );
};
