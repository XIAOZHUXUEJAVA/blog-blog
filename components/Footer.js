import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size="6" />
          <SocialIcon kind="github" href={siteMetadata.github} size="6" />
          {/* <SocialIcon kind="facebook" href={siteMetadata.facebook} size="6" /> */}
          {/* <SocialIcon kind="youtube" href={siteMetadata.youtube} size="6" /> */}
          {/* <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size="6" /> */}
          {/* <SocialIcon kind="twitter" href={siteMetadata.twitter} size="6" /> */}
          {/* <SocialIcon kind="kevicons-talk" href={siteMetadata.qq} size="6" /> */}
          {/* sasasasasa */}

          <a href={siteMetadata.qq}>
            <svg fill="#50c8fd" viewBox="0 0 24 24" width="22" height="22">
              <path
                d="M12.003 2c-2.265 0-6.29 1.364-6.29 7.325v1.195S3.55 14.96 3.55 17.474c0 .665.17 1.025.281 1.025.114 0 .902-.484 1.748-2.072 0 0-.18 2.197 1.904 3.967 0 0-1.77.495-1.77 1.182 0 .686 4.078.43 6.29 0 2.239.425 6.287.687 6.287 0 0-.688-1.768-1.182-1.768-1.182 2.085-1.77 1.905-3.967 1.905-3.967.845 1.588 1.634 2.072 1.746 2.072.111 0 .283-.36.283-1.025 0-2.514-2.166-6.954-2.166-6.954V9.325C18.29 3.364 14.268 2 12.003 2z"
                fillRule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">{siteMetadata.title}</Link>
        </div>
        {/* <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          <Link href="https://github.com/XIAOZHUXUEJAVA"></Link>
        </div> */}
      </div>
    </footer>
  )
}
