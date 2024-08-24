import getEntries from "@/utils/getEntries";
// import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import Image from "next/image";
import { Post } from "@/components";

const Feed = async () => {
  const data = await getEntries({
    contentType: "post",
  });

  //   for(const i of data) {
  //     if(i.fields.comments) {
  //         for(const j of i.fields.comments) {
  //             console.log(j.fields.content)
  //         }
  //     }
  //   }

  const posts = data.map((post) => (
    <Post
      key={post.sys.id}
      author={post.fields.author.fields}
      comments={post.fields.comments}
      createdAt={post.sys.createdAt}
    >
      {post.fields.content}
    </Post>
  ));

  return <div className="flex flex-col mb-8 gap-4 justify-center max-w-lg mx-auto">{posts}</div>;
};

export default Feed;
