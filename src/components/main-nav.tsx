import Image from "next/image"

import Icon from "~/app/android-chrome-512x512.png"
import Link from "~/components/link"
import { siteConfig, type NavItem } from "~/config/site"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <nav className="flex items-center gap-4 md:gap-10">
      <Link href="/" className="font-bold text-xl flex items-center gap-2">
        <Image src={Icon} alt={siteConfig.name} className="w-8 h-8" />
        <span className="hidden sm:inline">{siteConfig.name}</span>
      </Link>
      {!!items?.length && (
        <>
          {items.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className="text-lg font-semibold text-muted-foreground"
                >
                  {item.title}
                </Link>
              ),
          )}
        </>
      )}
    </nav>
  )
}
