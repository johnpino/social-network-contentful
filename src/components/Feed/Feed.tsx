import getEntries from "@/utils/getEntries";
import { Post } from "@/components";

const Feed = async () => {
  const data = await getEntries({
    contentType: "post",
  });

  const posts = data.map((post) => (
    <Post
      key={post.sys.id}
      id={post.sys.id}
      version={post.sys.version}
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
