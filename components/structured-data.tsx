export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Tush Love Calculator",
    description:
      "A fun and romantic love calculator to test compatibility between couples. Features include love percentage calculator, horoscopes, love language quiz, and relationship challenges.",
    url: "https://tush-love-calculator.vercel.app",
    applicationCategory: "Entertainment",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Organization",
      name: "Tush Love Calculator",
    },
    publisher: {
      "@type": "Organization",
      name: "Tush Love Calculator",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1250",
      bestRating: "5",
      worstRating: "1",
    },
    featureList: [
      "Love Compatibility Calculator",
      "Daily Love Horoscope",
      "Love Language Quiz",
      "Relationship Timeline Tracker",
      "Couple Challenges",
      "Love Quotes Collection",
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}
