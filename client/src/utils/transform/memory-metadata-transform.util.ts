import type { Memory } from "../../types/memory"

export function transformPageMetadata(
  pageMetadata?: Record<string, unknown>
): Memory["page_metadata"] {
  if (!pageMetadata) return undefined

  return {
    ...Object.fromEntries(
      Object.entries(pageMetadata).map(([k, v]) => [
        k,
        typeof v === "string" ||
        typeof v === "number" ||
        typeof v === "boolean" ||
        Array.isArray(v)
          ? v
          : String(v),
      ])
    ),
    title:
      typeof pageMetadata.title === "string" ? pageMetadata.title : undefined,
    description:
      typeof pageMetadata.description === "string"
        ? pageMetadata.description
        : undefined,
    keywords: Array.isArray(pageMetadata.keywords)
      ? (pageMetadata.keywords as string[])
      : undefined,
    author:
      typeof pageMetadata.author === "string" ? pageMetadata.author : undefined,
    published_date:
      typeof pageMetadata.published_date === "string"
        ? pageMetadata.published_date
        : undefined,
  } as Memory["page_metadata"]
}
