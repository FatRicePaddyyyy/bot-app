# xのbotを作成するアプリです。
T3 stack とsupabaseを用いています。









# 認証がうまくいかない
```
export default function AuthGitHubButton() {
  return (
    <form>
      <Button 
        onClick={() => signIn("github", { callbackUrl: "/" })} 
        className="w-full"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
            fill="currentColor"
          />
        </svg>
        GitHubでログイン
      </Button>
    </form>
  )
}
```
こんな感じで，formでラップしていた．(実際に直接の子としていたわけではないが)このようにすると，ボタンを押したときに，フォームの処理が走り，認証がされる前にページがリロードされてしまり，認証ができなかった．<form>を消したら動いた．

# limaの導入
```
npx @liam-hq/cli init
npx @liam-hq/cli erd build --input prisma/schema.prisma --format prisma
npx http-server dist
```

# プレフェッチについて
```
// void api.twitterAccount.all.prefetch(); // レンダリングプロセス中にプレフェッチされる
```
このようにコメントアウトすると、以下のようなエラー
```
Uncaught Error: Switched to client rendering because the server rendering errored:

UNAUTHORIZED
    at TRPCClientError.from (file:///Users/ota/Desktop/git-managed/x-bot-app-rev/.next/server/chunks/ssr/node_modules_262ae0._.js:5563:20)
    at eval (file:///Users/ota/Desktop/git-managed/x-bot-app-rev/.next/server/chunks/ssr/node_modules_262ae0._.js:6461:216)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
```
これはtrpc.tsで想定しているエラー
```
export const protectedProcedure = t.procedure
  .use(timingMiddleware)
  .use(({ ctx, next }) => {
    if (!ctx.session || !ctx.session.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
      ctx: {
        // infers the `session` as non-nullable
        session: { ...ctx.session, user: ctx.session.user },
      },
    });
  });

```
どうやら、``` api.twitterAccount.all.useSuspenseQuery()```を実行するときはセッション情報を取得できていないらしい。でもプレフェッチすると、セッション情報を取得できているようだ。画面の挙動としては、エラーが出たあと、データは取得されている。``` Switched to client rendering```とあるから、クライアントコンポーネントにフォールバックし、クライアントではセッション情報を取得できているようだ。サーバーではセッション情報を取得できない?
あとそもそも、``` `use client` ```をつけているのに、なぜサーバーサイドで取得しようとしている?

プレフェッチを消し、以下のように```api.twitterAccount.all.useQuery()```にするとエラーが消えた。これは、最初からクライアントサイドでしか動かない。

```
export function TwitterAccountsListPage() {
  const { data: accounts } = api.twitterAccount.all.useQuery();
  const [modalState, setModalState] = useState<ModalState>(null);
  if (!accounts) return <div>Loading...</div>;

  return (
    <ModalContext.Provider value={{ modalState, setModalState }}>
      <TwitterAccountsList accounts={accounts} />
      <TwitterAccountDeleteDialog />
      <TwitterAccountFormDialog
        open={modalState?.type === "edit"}
        setOpen={(open: boolean) => setModalState(open ? modalState : null)}
        initialAccount={modalState?.account ?? null}
      />
    </ModalContext.Provider>
  );
}
```
