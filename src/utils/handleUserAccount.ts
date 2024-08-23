import { User } from "next-auth";
import publishEntry from "@/utils/publishEntry";
import createEntry from "@/utils/createEntry";
import getEntries from "./getEntries";

const handleUserAccount = async (user: User, id: string) => {
  const data = await getEntries({
    contentType: "user",
    fields: [{ name: "id", value: id || "" }],
  });

  if (data.length === 0) {
    const userData = await createEntry("user", {
      id,
      name: user.name,
      email: user.email,
      image: user.image,
    });

    await publishEntry(userData);

    return userData.sys.id;
  }

  return data[0].sys.id
};

export default handleUserAccount;
