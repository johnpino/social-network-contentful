import getEntries from "@/utils/getEntries";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

const Feed = async () => {
  const data = await getEntries({
    contentType: "post",
  });

  const posts = data.map((post) => (
    <div
      key={post.sys.id}
      dangerouslySetInnerHTML={{
        __html: documentToHtmlString(post.fields.content),
      }}
    ></div>
  ));

  return <div>{posts}</div>;
};

export default Feed;
