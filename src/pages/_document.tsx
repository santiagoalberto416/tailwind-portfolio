import { Html, Head, Main, NextScript } from 'next/document'
import { restoreStyleScript } from '@/components/styleSwitcher/portfolioStyles'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script dangerouslySetInnerHTML={{ __html: restoreStyleScript }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
