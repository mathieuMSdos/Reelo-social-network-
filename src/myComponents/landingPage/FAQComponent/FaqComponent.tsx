import { FaqInteractive } from "./FaqInteractive";

const FaqComponent = () => {
  // array de questions
  const faqItems = [
    {
      question: "How does Reello verify real estate listings?",
      answer:
        "Reello uses advanced AI algorithms to analyze thousands of data points from multiple trusted sources. Our system cross-references property details, ownership records, and market data to authenticate listings and detect potential fraudulent activities. This ensures that every property opportunity you see is genuine and accurately represented.",
    },
    {
      question:
        "What data does Reello collect and how is my privacy protected?",
      answer:
        "We collect essential data related to your property interests, portfolio management preferences, and investment criteria to provide personalized recommendations. All user data is encrypted, stored securely, and never shared with third parties without explicit consent. You can manage your privacy settings and data preferences from your dashboard at any time.",
    },
    {
      question: "How accurate are Reello's market analysis predictions?",
      answer:
        "Our AI-powered market analysis tool maintains a high accuracy rate by continuously learning from real-time market data, historical trends, and multiple economic indicators. While no prediction tool is 100% accurate, we provide confidence scores with each analysis and regularly update our models to ensure the most reliable insights possible.",
    },
    {
      question:
        "Can I integrate Reello with my existing property management tools?",
      answer:
        "Yes! Reello offers API integration capabilities with major property management platforms and CRM systems. Our Smart Portfolio Tracking feature can import existing property data, sync with your current tools, and consolidate all your real estate information in one seamless dashboard.",
    },
    {
      question: "What happens if Reello's AI system makes a mistake?",
      answer:
        "While our AI system is highly reliable, we maintain a dedicated support team to handle any discrepancies. If you notice any inaccuracies in our analysis or verification results, you can report them through our platform. We investigate all reported issues within 24 hours and provide compensation credits if our system makes a verified error.",
    },
  ];

  return (
    <div className="w-full py-32 flex flex-col gap-10 px-10 md:flex-row md:gap-2">
      <div className=" text-darkLine/90 flex flex-col gap-8 text-center">
        <h2 className="text-3xl font-extrabold lg:text-6xl">
          Frequently Asked Questions
        </h2>
        <p className="text-balance text-muted-foreground lg:text-lg">
          Have another question? Contact me on Twitter or by email.
        </p>
      </div>
      <div className=" mx-auto md:w-1/2  ">
        {/* La partie interactive est isolée */}
        <FaqInteractive items={faqItems} />
      </div>
    </div>
  );
};

export default FaqComponent;
