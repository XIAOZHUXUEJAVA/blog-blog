import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

export default function FourZeroFour() {
  return (
    <>
      <PageSEO title={`Page Not Found - ${siteMetadata.title}`} />
      <div className="flex flex-col items-start justify-start md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6">
        {/* <div className="space-x-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-6xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:border-r-2 md:px-6 md:text-8xl md:leading-14">
            公告
          </h1>
        </div> */}

        <div className="space-x-2 pt-2 pb-4 md:space-y-4">
          <h1 className="text-4xl font-bold leading-7 tracking-tight text-gray-900 dark:text-gray-100 md:border-r-2 md:px-4 md:text-7xl md:leading-12">
            Announcement
          </h1>
        </div>
        <div className="max-w-md">
          {/* <p className="mb-4 text-base font-bold leading-normal md:text-2xl">
                        - 欲发表评论请使用 GitHub 账号登录。
                        <br />
                        - 受限于特定情况，访问本站有时可能需要科学上网工具。感谢您的理解与支持。
                        <br />
                        - 个别图片可能在在非科学上网的情况下无法访问，正在优化中。
                    </p> */}
          <p className="mb-4 text-sm font-bold leading-normal">
            - 欲发表评论请使用 GitHub 账号登录。
            <br />
            <br />
            - 受限于特定情况，访问本站有时可能需要科学上网工具。
            <br />
            <br />
            - 个别图片可能在在非科学上网的情况下无法访问，正在优化中。
            <br />
            <br />- 感谢您的理解与支持。
          </p>

          {/* <p className="mb-8">
                        But dont worry, you can find plenty of other things on our homepage.
                    </p> */}
          <Link href="/">
            <button className="focus:shadow-outline-blue inline rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none dark:hover:bg-blue-500">
              回到主页
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}
