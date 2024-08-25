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
import { auth } from "@/auth";

type CreateReactionProps = {
  postId: string;
  author: EntryProps;
};

const CreateReaction = async (props: CreateReactionProps) => {
  const session = await auth();

  const reactions = await getEntries({
    contentType: "reaction",
    fields: [{ name: "content.sys.id", value: props.postId }],
  });

  const authorReactions = reactions.filter((reaction) =>
    reaction.fields.users?.find(
      (user: EntryProps) => user.fields.id === session?.user.id
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
              <button type="submit" disabled={!session}>
                <HeartIconSolid className="size-5 text-green-500" />
              </button>
            ) : (
              <button type="submit" disabled={!session}>
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
              <button type="submit" disabled={!session}>
                <HandThumbUpIconSolid className="size-5 text-green-500" />
              </button>
            ) : (
              <button type="submit" disabled={!session}>
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
