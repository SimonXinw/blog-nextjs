import React from "react";
import AdminLayout from "./admin-layout";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <AdminLayout>{children}</AdminLayout>
      </body>
    </html>
  );
};

export default RootLayout;
