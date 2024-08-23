import { User } from "next-auth";
import publishContentfulEntry from "@/utils/publishEntry";
import createEntry from "@/utils/createEntry";
import { CollectionProp, EntryProps } from "contentful-management";
import getEntries from "./getEntries";

const handleUserAccount = async (user: User) => {
  const data = await getEntries({
    contentType: "user",
    fields: [{ name: "email", value: user.email || "" }],
  });

  if (data.items.length === 0) {
    const userData = await createEntry("user", {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
    });

    await publishContentfulEntry(userData);

    return;
  }
};

export default handleUserAccount;
