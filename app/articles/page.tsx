import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Link from "next/link";
import { createClient } from "@/lib/prismic";

export default async function ArticlesPage() {
  const client = createClient();
  const articles = await client.getAllByType("article", {
    orderings: [{ field: "my.article.publication_date", direction: "desc" }],
  });

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">All Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div key={article.id} className="border rounded-lg overflow-hidden">
            <PrismicNextImage field={article.data.main_image} />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">
                <PrismicRichText field={article.data.title} />
              </h2>
              <p className="text-gray-600 mb-4">
                <PrismicRichText field={article.data.summary} />
              </p>
              <Link
                href={`/articles/${article.uid}`}
                className="text-blue-500 hover:underline"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
