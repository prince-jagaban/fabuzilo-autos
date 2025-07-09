import ClientLayout from "@/components/ClientLayout";
import Hero from "../src/components/Hero";
import SearchFilter from "../src/components/SearchFilter";
import FeaturedVehicles from "@/components/FeaturedVehicles";
import Highlights from "@/components/Highlights";
import Testimonials from "@/components/Testimonials";


export default function Home() {
  
  return (
    <ClientLayout>
      <Hero />
      <SearchFilter />
      <FeaturedVehicles />
      <Highlights />
      <Testimonials />
    </ClientLayout>
  
  );
}
