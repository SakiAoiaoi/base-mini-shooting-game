//app/.well-known/farcaster.json/route.ts

/**
 * オブジェクトから未定義(undefined)、空文字、空配列のプロパティを取り除くためのヘルパー関数です。
 * Farcasterのフレームメタデータなど、不要なプロパティを含めないようにするために使用します。
 * @param properties - クリーニング対象のプロパティを持つオブジェクト
 * @returns - 有効なプロパティのみを持つ新しいオブジェクト
 */
function withValidProperties(
  properties: Record<string, undefined | string | string[]>
) {
  return Object.fromEntries(
    Object.entries(properties).filter(([key, value]) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return !!value;
    })
  );
}

/**
 * Farcasterアプリケーションのメタデータを返すAPIエンドポイントです。
 * `.well-known/farcaster.json` としてFarcasterに認識されます。
 * アプリケーションの名前、説明、アイコン、Webhook URLなどの情報を提供します。
 * @see https://docs.farcaster.xyz/reference/app-metadata
 */
export async function GET() {
  const URL = process.env.NEXT_PUBLIC_URL;

  return Response.json({
    // Farcasterアカウントの関連付け情報
    accountAssociation: {
      header:
        "eyJmaWQiOjE5MzMzOCwidHlwZSI6ImF1dGgiLCJrZXkiOiIweDA0NjYwYzA1NTc3N2FCOTc4RTdEOTI1NDM5M2MxNzQ2OUZkQjAxMkUifQ",
      payload:
        "eyJkb21haW4iOiJiYXNlLW1pbmktc2hvb3RpbmctZ2FtZS1laWdodC52ZXJjZWwuYXBwIn0",
      signature:
        "riHHjw0S2dJqjdm2wX/RkUAnDkfni+XiGVp+mpo3Cj1spQRQQIvyPQ7sZhdExiM+zDKXPyTk+6+MsfoaVkvsrhs=",
    },
    // Farcasterフレームのメタデータ
    frame: withValidProperties({
      version: "1",
      name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
      subtitle: process.env.NEXT_PUBLIC_APP_SUBTITLE,
      description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
      screenshotUrls: [],
      iconUrl: process.env.NEXT_PUBLIC_APP_ICON,
      splashImageUrl: process.env.NEXT_PUBLIC_APP_SPLASH_IMAGE,
      splashBackgroundColor: process.env.NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR,
      homeUrl: URL,
      webhookUrl: `${URL}/api/webhook`,
      primaryCategory: process.env.NEXT_PUBLIC_APP_PRIMARY_CATEGORY,
      tags: [],
      heroImageUrl: process.env.NEXT_PUBLIC_APP_HERO_IMAGE,
      tagline: process.env.NEXT_PUBLIC_APP_TAGLINE,
      ogTitle: process.env.NEXT_PUBLIC_APP_OG_TITLE,
      ogDescription: process.env.NEXT_PUBLIC_APP_OG_DESCRIPTION,
      ogImageUrl: process.env.NEXT_PUBLIC_APP_OG_IMAGE,
    }),
    // Base Builderに登録する際に必要となる情報
    baseBuilder: {
      // Base Buildに登録する際に必要となる(自分のFarcasterアカウントのウォレットアドレスを設定する)
      // このアプリを編集・管理できるFarcasterアカウントに紐づくウォレットアドレス
      allowedAddresses: ["0x04660c055777aB978E7D9254393c17469FdB012E"],
    },
  });
}
