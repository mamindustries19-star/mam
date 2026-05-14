import { Helmet } from "react-helmet-async";

type Props = {
  title: string;
  description: string;
  path: string;
  jsonLd?: object;
};

const SEO = ({ title, description, path, jsonLd }: Props) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={path} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={path} />
    <meta property="og:type" content="website" />
    {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
  </Helmet>
);

export default SEO;
