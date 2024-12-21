import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import { CountryProvider } from "./contexts/CountryContext";
import { LoadingProvider } from "./contexts/LoadingContext";
import { CardProvider } from "./contexts/CardContext";

export default function App() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <CountryProvider>
        <LoadingProvider>
          <CardProvider>
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          </CardProvider>
        </LoadingProvider>
      </CountryProvider>
    </div>
  );
}
