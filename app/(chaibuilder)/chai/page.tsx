"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import FullScreenLoader from "../components/loader";
import Logout from "../components/logout";
import { useAuth } from "../hooks/useAuth";
import { bluePreset, greenPreset, orangePreset } from "./theme-presets";

const ChaiBuilderPages = dynamic(() => import("./ChaiBuilderPages"), {
  ssr: false,
  loading: () => <FullScreenLoader />,
});

const MediaManager = dynamic(() => import("./MediaManager"), { ssr: false });
const Login = dynamic(() => import("../components/login"), { ssr: false });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

const Logo = () => (
  <div className="bg-gray-900 p-2 rounded-lg">
    <svg
      width="104"
      height="22"
      viewBox="0 0 134 32"
      fill="#ccc"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#fff"
        d="M77.6976 28.1145C77.6976 28.3678 77.7666 28.506 77.9279 28.506C78.043 28.506 78.1351 28.4599 78.2503 28.3909L119.797 1.37496C120.534 0.891298 121.202 0.637952 122.193 0.637952H131.336C132.741 0.637952 133.685 1.58224 133.685 2.98716V20.422C133.685 22.5178 133.224 23.7385 131.336 24.867L120.258 31.5231C120.12 31.6153 119.982 31.6613 119.89 31.6613C119.751 31.6613 119.636 31.5692 119.636 31.1777V10.8179C119.636 10.5875 119.567 10.4263 119.406 10.4263C119.291 10.4263 119.199 10.4724 119.083 10.5415L88.7061 30.2794C87.854 30.8322 87.1631 30.9934 86.3801 30.9934H66.2283C64.8235 30.9934 63.8792 30.0491 63.8792 28.6442V3.53991C63.8792 3.35566 63.7871 3.19444 63.6489 3.19444C63.5338 3.19444 63.4417 3.24051 63.3265 3.3096L43.2899 15.3551C43.0827 15.4702 43.0366 15.5854 43.0366 15.6775C43.0366 15.7696 43.0596 15.8387 43.2208 15.9769L57.5228 30.2794C57.707 30.4637 57.8452 30.6249 57.8452 30.7631C57.8452 30.9243 57.638 31.0164 57.3846 31.0164H44.4415C43.4281 31.0164 42.6451 30.8552 42.0923 30.3025L33.4098 21.6196C33.3177 21.5275 33.2486 21.4814 33.1565 21.4814C33.0874 21.4814 32.9722 21.5275 32.8801 21.5735L18.3709 30.3025C17.4957 30.8322 16.8969 30.9934 16.0218 30.9934H2.66406C1.25919 30.9934 0.314941 30.0491 0.314941 28.6442V11.5318C0.314941 9.41294 0.775553 8.2153 2.66406 7.08676L13.8108 0.384607C13.926 0.315512 14.0181 0.29248 14.1102 0.29248C14.2714 0.29248 14.3636 0.476732 14.3636 0.845236V23.7385C14.3636 23.9688 14.4327 24.084 14.5939 24.084C14.686 24.084 14.8012 24.0149 14.9163 23.9458L52.5712 1.30586C53.4694 0.776141 54.0222 0.614921 55.0585 0.614921H75.3254C76.7303 0.614921 77.6745 1.55921 77.6745 2.96413L77.6976 28.1145Z"></path>
    </svg>
  </div>
);

export default function Page() {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) return <Login logo={Logo} />;

  return (
    <QueryClientProvider client={queryClient}>
      <ChaiBuilderPages
        themePresets={[
          { orange: orangePreset },
          { green: greenPreset },
          { blue: bluePreset },
        ]}
        getPreviewUrl={(slug: string) => `/chai/preview?slug=${slug}`}
        autoSaveSupport={false}
        mediaManagerComponent={MediaManager}
        logo={Logo}
        sidebarBottomComponents={[Logout]}
        user={{
          id: user.id,
          name: user.name,
          email: user.email,
          authToken: user.authToken,
          role: "admin",
          permissions: [],
        }}
        onSessionExpired={() => window.location.reload()}
      />
    </QueryClientProvider>
  );
}
