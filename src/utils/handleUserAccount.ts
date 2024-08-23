"use server";

import { User } from "next-auth";
import publishContentfulEntry from "@/utils/publishEntry";
import createEntry from "@/utils/createEntry";
import { CollectionProp, EntryProps } from "contentful-management";

const handleUserAccount = async (user: User) => {
  const baseUrl = `${process.env.CONTENTFUL_DELIVERY_BASE_URL}/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT}/entries`;
  const searchParams = `?access_token=${process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN}&include=10&limit=2`;
  const url = `${baseUrl}${searchParams}&content_type=user&fields.email=/${user.email}`;

  const response = await fetch(url);
  const data: CollectionProp<EntryProps> = await response.json();

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
