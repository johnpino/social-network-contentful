import createReaction from "@/utils/createReaction";
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
import { submitReactionAction } from "./actions";

type CreateReactionProps = {
  postId: string;
  author: EntryProps;
};

const CreateReaction = async (props: CreateReactionProps) => {
  const reactions = await getEntries({
    contentType: "reaction",
    fields: [{ name: "content.sys.id", value: props.postId }],
  });

  const authorReactions = reactions.filter((reaction) =>
    reaction.fields.users?.find(
      (user: EntryProps) => user.fields.id === props.author.fields.id //TODO: Check if there's a way to improve this so we use the same ID through the file
    )
  );

  return (
    <>
      <hr className="border-slate-300" />
      <div className="flex p-4 gap-4">
        <div>
          <form
            action={submitReactionAction.bind(
              null,
              "Love",
              props.postId,
              props.author.sys.id
            )}
          >
            {authorReactions.some((reaction) =>
              reaction.fields.type.includes("Love")
            ) ? (
              <button type="submit">
                <HeartIconSolid className="size-5" />
              </button>
            ) : (
              <button type="submit">
                <HeartIconOutline className="size-5" />
              </button>
            )}
          </form>
        </div>
        <div>
          <form
            action={submitReactionAction.bind(
              null,
              "Like",
              props.postId,
              props.author.sys.id
            )}
          >
            {authorReactions.some((reaction) =>
              reaction.fields.type.includes("Like")
            ) ? (
              <button type="submit">
                <HandThumbUpIconSolid className="size-5" />
              </button>
            ) : (
              <button type="submit">
                <HandThumbUpIconOutline className="size-5" />
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateReaction;
