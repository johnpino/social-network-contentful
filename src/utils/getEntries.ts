import { CollectionProp, EntryProps } from "contentful-management";

type GetEntriesProps = {
  contentType: string;
  fields: Array<{
    name: string,
    value: string
  }>
}

const getEntries = async ({ contentType, fields}: GetEntriesProps) => {
  const baseUrl = `${process.env.CONTENTFUL_DELIVERY_BASE_URL}/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT}/entries`;
  const searchParams = `?access_token=${process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN}&include=10&limit=2`;

  const mappedFields = fields.map(field => `fields.${field.name}=${field.value}`).join('&')

  const url = `${baseUrl}${searchParams}&content_type=${contentType}&${mappedFields}`;

  const response = await fetch(url);
  const data: CollectionProp<EntryProps> = await response.json();

  return data;
};

export default getEntries
