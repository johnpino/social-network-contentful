import getEntries from "@/utils/getEntries";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import Image from "next/image";

const Feed = async () => {
  const data = await getEntries({
    contentType: "post",
  });

  const posts = data.map((post) => (
    <div key={post.sys.id}>
      <div
        dangerouslySetInnerHTML={{
          __html: documentToHtmlString(post.fields.content),
        }}
      ></div>
      <div>
        <Image
          src={post.fields.author.fields.image}
          width={25}
          height={25}
          alt={`${post.fields.author.fields.name} Profile Photo`}
        />
      </div>
      <div>Published by: {post.fields.author.fields.name}</div>
      <div>On: {post.sys.createdAt}</div>
    </div>
  ));

  return <div className="flex flex-col mb-8 gap-4">{posts}</div>;
};

export default Feed;
