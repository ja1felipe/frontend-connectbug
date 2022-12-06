import { useAuth } from "@/services/authContext";
import { useRouter } from "next/router";
import { NextComponentType } from "next";

function withAuth<T extends object>(Component: NextComponentType<T>) {
  const Auth = (props: T) => {
    const { isLoggedIn } = useAuth();
    const router = useRouter();

    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
}

export default withAuth;
