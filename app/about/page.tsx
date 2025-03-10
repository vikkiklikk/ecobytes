import { PrismicRichText } from "@prismicio/react";
import { createClient } from "@/prismicio";

export default async function AboutPage() {
  const client = createClient();
  const page = await client.getSingle("about");

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">
        <PrismicRichText field={page.data.title} />
      </h1>
      <div className="prose max-w-none">
        <PrismicRichText field={page.data.content} />
      </div>
    </div>
  );
}
