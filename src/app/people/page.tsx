import Image from "next/image"
import { cn } from "@hyoban/utils"

import Link from "~/components/link"
import { Separator } from "~/components/ui/separator"
import { getFeedInfoList } from "~/lib/unsafe"

export const revalidate = 3600

const ICON_MAP: Map<string, string> = new Map([
  ["twitter.com", "i-simple-icons-twitter"],
  ["github.com", "i-simple-icons-github"],
  ["www.youtube.com", "i-simple-icons-youtube"],
  ["space.bilibili.com", "i-simple-icons-bilibili"],
  ["discord.com", "i-simple-icons-discord"],
  ["t.me", "i-simple-icons-telegram"],
])

function IconLink({ link }: { link: string }) {
  if (!ICON_MAP.get(new URL(link).hostname)) return null

  return (
    <Link href={link} className="flex items-center text-sm">
      <div className={cn(ICON_MAP.get(new URL(link).hostname))}></div>
    </Link>
  )
}

export default async function SubscriptionPage() {
  const feedInfoList = await getFeedInfoList()
  if (!feedInfoList) return null

  return (
    <div className="m-5 sm:m-10">
      {feedInfoList
        .sort((a, b) => a.title.localeCompare(b.title))
        .map((feedInfo) => (
          <div
            key={feedInfo.id}
            className="group mx-auto my-4 flex w-full max-w-xl items-center rounded-md px-4 py-3 hover:bg-accent"
          >
            <Image
              src={feedInfo.avatar}
              className="h-12 w-12 shrink-0 grow-0 rounded-full bg-white object-cover"
              alt="avatar"
              width={48}
              height={48}
            />
            <div className="ml-4 flex w-full flex-col self-stretch">
              <div className="flex grow flex-col sm:flex-row sm:items-center sm:justify-between">
                <Link href={feedInfo.url} className="flex items-center">
                  <h3 className="text-lg font-semibold">{feedInfo.title}</h3>
                </Link>

                <span className="my-2 flex gap-3">
                  {feedInfo.socials
                    .filter((link) => link)
                    .map((link) => (
                      <IconLink key={link} link={link} />
                    ))}
                </span>
              </div>
              <Separator className="group-hover:bg-accent" />
            </div>
          </div>
        ))}
    </div>
  )
}
