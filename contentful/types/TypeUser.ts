import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeCommentSkeleton } from "./TypeComment";
import type { TypePostSkeleton } from "./TypePost";

export interface TypeUserFields {
    id: EntryFieldTypes.Symbol;
    name: EntryFieldTypes.Symbol;
    email: EntryFieldTypes.Symbol;
    image?: EntryFieldTypes.Symbol;
    comments?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeCommentSkeleton>>;
    likes?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeCommentSkeleton | TypePostSkeleton>>;
}

export type TypeUserSkeleton = EntrySkeletonType<TypeUserFields, "user">;
export type TypeUser<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeUserSkeleton, Modifiers, Locales>;
