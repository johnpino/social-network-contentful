import { CollectionProp, EntryProps } from "contentful-management";
import resolveResponse from "contentful-resolve-response"

type GetEntriesProps = {
  contentType: string;
  fields?: Array<{
    name: string,
    value: string
  }>
}

const getEntries = async ({ contentType, fields}: GetEntriesProps) => {
  const baseUrl = `${process.env.CONTENTFUL_DELIVERY_BASE_URL}/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT}/entries`;
  const searchParams = `?access_token=${process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN}&include=10&limit=10`;

  const mappedFields = fields ? fields.map(field => `fields.${field.name}=${field.value}`).join('&') : ''

  const url = `${baseUrl}${searchParams}&content_type=${contentType}&${mappedFields}`;

  const response = await fetch(url, { next: { tags: [ contentType ] } });
  const data: CollectionProp<EntryProps> = await response.json();

  const resolvedData = resolveResponse(data) as EntryProps[]

  return resolvedData;
};

export default getEntries
