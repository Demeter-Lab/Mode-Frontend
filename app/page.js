import { Navbar } from "@/components/Navbar";
import { AboutUs } from "@/components/AboutUs";
import FeaturesBox from "@/components/FeaturesBox";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
    <Navbar />
    <AboutUs />
    <FeaturesBox />
    <FAQ />
    <Footer />
    </>
  )
}
