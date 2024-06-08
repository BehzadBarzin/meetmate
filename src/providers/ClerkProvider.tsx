import { ClerkProvider } from "@clerk/nextjs";
import React, { FC } from "react";
import { dark } from "@clerk/themes";

interface IProps {
  children: React.ReactNode;
}

const CustomClerkProvider: FC<IProps> = ({ children }) => {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        layout: {
          socialButtonsPlacement: "bottom",
          socialButtonsVariant: "auto",
          logoImageUrl: "/icons/logo-name.png",
          shimmer: true,
        },
        variables: {
          colorBackground: "#1C1F2E",
          colorInputBackground: "#252A41",
          colorPrimary: "#0E78F9", // Button Color
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
};

export default CustomClerkProvider;
