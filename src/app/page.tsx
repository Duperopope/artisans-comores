import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import { getCmsContent } from "@/lib/cms";

export default function HomePage() {
  const cms = getCmsContent();

  return (
    <>
      <Hero cms={cms.hero} />
      <Services cms={cms.services} />
      <About />
      <Contact email={cms.contact.email} responseTime={cms.contact.responseTime} />
    </>
  );
}
