import { Helmet } from "react-helmet-async";

type Props = {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  image?: string;
  jsonLd?: object;
  type?: "website" | "article";
};

const SITE_URL = "https://mamindustries.in"; // Replace with actual domain if different
const DEFAULT_IMAGE = "/og-image.jpg"; // Should create this asset

const SEO = ({ 
  title, 
  description, 
  path, 
  keywords, 
  image = DEFAULT_IMAGE, 
  jsonLd, 
  type = "website" 
}: Props) => {
  const fullTitle = title.includes("MAM Industries") ? title : `${title} | MAM Industries`;
  const fullUrl = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const fullImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Verification Tags (Optional - can add Search Console here) */}
      
      {/* Structured Data */}
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
};

export default SEO;
