import { Navbar } from "@/components/Navbar";
import { AboutUs } from "@/components/AboutUs";
import FeaturesBox from "@/components/FeaturesBox";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <>
    <Navbar />
    <AboutUs />
    <FeaturesBox />
    <FAQ />
    </>
  )
}
