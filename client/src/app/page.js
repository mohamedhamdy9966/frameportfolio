import Acomplishments from '../components/Acomplishments/Acomplishments';
import Approach from '../components/Approach/Approach';
import Contact from '../components/Contact/Contact';
import Faq from '../components/Faq/Faq';
import Hero from '../components/Hero/Hero';
import Projects from '../components/Projects/Projects';
import Software from '../components/Software/Software';
import Technologies from '../components/Technologies/Technologies';
import Testimonials from '../components/Testimonials/Testimonials';
import Timeline from '../components/TimeLine/TimeLine';
import { Layout } from '../layout/Layout';

export default function Home() {
  return (
    <Layout>
      {/* Marketing story */}
      <Hero />
      <Projects />
      <Technologies />

      {/* Software house story */}
      <Software />

      {/* Proof, process and conversion */}
      <Testimonials />
      <Acomplishments />
      <Timeline />
      <Approach />
      <Faq />
      <Contact />
    </Layout>
  );
}
