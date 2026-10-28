import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import PriceCalculator from "./components/PriceCalculator";
import Booking from "./components/Booking";
import Reviews from "./components/Reviews";
import Contacts from "./components/Contacts";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white antialiased">
      <Header />
      <main>
        <Hero />
        <Services />
        <PriceCalculator />
        <Booking />
        <Reviews />
        <Contacts />
      </main>
      <Footer />
    </div>
  );
}

export default App;
