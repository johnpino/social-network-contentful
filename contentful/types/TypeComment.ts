import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeUserSkeleton } from "./TypeUser";

export interface TypeCommentFields {
    content: EntryFieldTypes.RichText;
    author: EntryFieldTypes.EntryLink<TypeUserSkeleton>;
    likedBy?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeUserSkeleton>>;
}

export type TypeCommentSkeleton = EntrySkeletonType<TypeCommentFields, "comment">;
export type TypeComment<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeCommentSkeleton, Modifiers, Locales>;
