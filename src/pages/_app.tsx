import { type AppType } from "next/app";

import { api } from "~/utils/api";
import { dark } from "@clerk/themes";
import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Container, MantineProvider } from "@mantine/core";
import { HeaderMegaMenu } from "~/components/layout/HeaderMegaMenu";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "dark",
      }}
    >
      <ClerkProvider appearance={{ baseTheme: dark }} {...pageProps}>
        <Container size={"xl"}>
          <HeaderMegaMenu />
          <Component {...pageProps} />
        </Container>
      </ClerkProvider>
    </MantineProvider>
  );
};

export default api.withTRPC(MyApp);
