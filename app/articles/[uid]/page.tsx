import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { createClient } from "@/lib/prismic";

export async function generateStaticParams() {
  const client = createClient();
  const articles = await client.getAllByType("article");

  return articles.map((article) => ({
    uid: article.uid,
  }));
}

export default async function ArticlePage({
  params,
}: {
  params: { uid: string };
}) {
  const client = createClient();
  const article = await client.getByUID("article", params.uid);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">
        <PrismicRichText field={article.data.title} />
      </h1>
      <div className="mb-8">
        <PrismicNextImage field={article.data.main_image} />
      </div>
      <div className="prose max-w-none">
        <PrismicRichText field={article.data.content} />
      </div>
    </div>
  );
}
