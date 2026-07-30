import Hero from "../../components/Hero";
import Services from "../../components/Services";
import AboutSummary from "../../components/AboutSummary";
import CallToAction from "../../components/CallToAction";
import RecentBlogs from "../../components/RecentBlogs";
import ContactPreview from "../../components/ContactPreview";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Services /> 
      <AboutSummary />
      <CallToAction />
      <RecentBlogs />
      <ContactPreview />
    </div>
  );
}