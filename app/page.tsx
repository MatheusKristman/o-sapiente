import Banner from "@/components/home/Banner";
import Header from "../components/Header";
import Hero from "../components/home/Hero";
import Steps from "@/components/home/Steps";
import Benefits from "@/components/home/Benefits";
import RecentsRequests from "@/components/home/RecentsRequests";
import Contact from "@/components/home/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Banner />
      <Steps />
      <Benefits />
      <RecentsRequests />
      <Contact />
      <Footer />
    </>
  );
}
