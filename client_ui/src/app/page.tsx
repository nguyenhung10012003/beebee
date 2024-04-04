import Hero from '@/components/hero';
import Navbar from '@/components/navbar';
import SectionTitle from '@/components/sectionTitle';
import Benefits from '@/components/benefits';
import Testimonials from '@/components/testimonials';
import Cta from '@/components/cta';
import Faq from '@/components/faq';
import { benefits } from '@/components/data';
import Footer from '@/components/footer';
import PopupWidget from '@/components/popupWidget';
import React from 'react';

const Home = () => {
  return (
    <>
      <div className="md:px-4 lg:px-10">
        <Navbar />
        <Hero />
        <SectionTitle
          pretitle="BeeBee Benefits"
          title=" Why should you use our services">
          We provide a comprehensive suite of tools empowering you to effectively
          promote and publicize your business across various platforms,
          ensuring maximum reach and impact for your brand.
        </SectionTitle>
        {benefits.map((benefit, index) => (
          <Benefits key={index} data={benefit} imgPos={index % 2 == 1 ? 'right' : ''} />
        ))}
        <SectionTitle
          pretitle="Testimonials"
          title="Here's what our customers said">
          Testimonails is a great way to increase the brand trust and awareness.
          Here are some of our customers feedback.
        </SectionTitle>
        <Testimonials />
        <SectionTitle pretitle="FAQ" title="Frequently Asked Questions">
          We have answered a wide range of Questions for your Convenience.
        </SectionTitle>
        <Faq />
        <Cta />
      </div>
      <Footer />
      <PopupWidget />
    </>
  );
};

export default Home;