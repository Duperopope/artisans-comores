import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import VideoSection from "@/components/sections/VideoSection";
import Contact from "@/components/sections/Contact";
import { getCmsContent } from "@/lib/cms";

export default function HomePage() {
  const cms = getCmsContent();

  return (
    <>
      <Hero cms={cms.hero} />
      <Services cms={cms.services} />
      <About />
      <VideoSection media={cms.media} />
      <Contact email={cms.contact.email} responseTime={cms.contact.responseTime} />
    </>
  );
}
