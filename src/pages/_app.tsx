import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import PrimaryLayout from "~/components/layouts/primarylayout";
import { SnackbarProvider } from "notistack";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <PrimaryLayout>
        <SnackbarProvider>
          <Component {...pageProps} />
        </SnackbarProvider>
      </PrimaryLayout>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
