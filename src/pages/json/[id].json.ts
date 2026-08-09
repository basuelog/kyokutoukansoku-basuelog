import { createClient } from 'microcms-js-sdk';

// 1. ビルド時に、どの記事（ID）のJSONを作るかの一覧をAstroに教えてあげる
export async function getStaticPaths() {
  const client = createClient({
    serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
    apiKey: import.meta.env.MICROCMS_API_KEY,
  });

  // 全記事のデータをmicroCMSから取得
  const response = await client.get({ endpoint: 'logs', queries: { limit: 100 } });

  // 記事ごとのIDと本文のセットをAstroのビルド機能に引き渡す
  return response.contents.map((content) => ({
    params: { id: content.id },
    props: { body: content.body },
  }));
}

// 2. 引き渡されたデータをもとに、実際にただのJSONファイルとして書き出す
export const GET = async ({ props }) => {
  return new Response(JSON.stringify({ body: props.body }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
