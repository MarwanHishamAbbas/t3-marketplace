import { type AppType } from "next/app";

import { api } from "~/utils/api";
import { dark } from "@clerk/themes";
import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Container, MantineProvider } from "@mantine/core";
import { HeaderMegaMenu } from "~/components/layout/HeaderMegaMenu";
import { Footer } from "~/components/layout/Footer";
import { data } from "~/components/constants/data";

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
        <Footer data={data} />
      </ClerkProvider>
    </MantineProvider>
  );
};

export default api.withTRPC(MyApp);
