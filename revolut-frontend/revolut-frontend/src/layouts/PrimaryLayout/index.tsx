import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import useLoading from "../../hooks/useLoading";
import Loading from "../../components/Loading";

export default function PrimaryLayout() {
  const { loading } = useLoading();

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <main>
            <div className="container max-w-2xl mx-auto px-8 md:px-0">
              <Outlet />
            </div>
          </main>
          <Footer className="mt-24" />
        </>
      )}
    </>
  );
}
