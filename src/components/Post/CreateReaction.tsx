import getEntries from "@/utils/getEntries";
import {
  HeartIcon as HeartIconOutline,
  HandThumbUpIcon as HandThumbUpIconOutline,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartIconSolid,
  HandThumbUpIcon as HandThumbUpIconSolid,
} from "@heroicons/react/24/solid";
import { EntryProps } from "contentful-management";

type CreateReactionProps = {
  postId: string;
  author: EntryProps["fields"];
};

const CreateReaction = async (props: CreateReactionProps) => {
  const reactions = await getEntries({
    contentType: "reaction",
    fields: [{ name: "content.sys.id", value: props.postId }],
  });

  const authorReactions = reactions.filter((reaction) =>
    reaction.fields.users.find(
      (user: EntryProps) => user.fields.id === props.author.id
    )
  );

  return (
    <>
      <hr className="border-slate-300" />
      <div className="flex p-4 gap-4">
        <div>
          {authorReactions.some((reaction) =>
            reaction.fields.type.includes("Love")
          ) ? (
            <HeartIconSolid className="size-5" />
          ) : (
            <HeartIconOutline className="size-5" />
          )}
        </div>
        <div>
          {authorReactions.some((reaction) =>
            reaction.fields.type.includes("Like")
          ) ? (
            <HandThumbUpIconSolid className="size-5" />
          ) : (
            <HandThumbUpIconOutline className="size-5" />
          )}
        </div>
      </div>
    </>
  );
};

export default CreateReaction;
