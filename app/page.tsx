import Banner from "@/components/home/Banner";
import StudentModal from "@/components/home/StudentModal";
import Hero from "../components/home/Hero";
import Steps from "@/components/home/Steps";
import Benefits from "@/components/home/Benefits";
import RecentsRequests from "@/components/home/RecentsRequests";
import Contact from "@/components/home/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <StudentModal />
      <Hero />
      <Banner />
      <div className="before:content-[''] before:w-4/5 before:h-full before:bg-homeLeftShape before:bg-contain before:bg-no-repeat bg-left-top before:block before:absolute before:top-0 before:left-0 before:z-[9] after:content-[''] after:w-4/5 after:h-full after:bg-homeRightShape after:bg-contain after:bg-no-repeat after:bg-right-bottom after:block after:absolute after:bottom-36 after:right-0 after:z-[9] relative sm:before:w-[45%] sm:after:w-2/5 lg:before:w-1/4 lg:after:w-1/4 lg:after:bottom-0">
        <Steps />
        <Benefits />
      </div>
      <RecentsRequests />
      <Contact />
      <Footer />
    </>
  );
}
