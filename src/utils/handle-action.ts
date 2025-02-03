import { type Prompt, type TemplateVariable } from "~/server/types";

export const handlePromptSelect = async ({
  promptId,
  prompts,
  setCompiledPrompt,
  setTemplateVariables,
  setSelectedPrompt,
  setPromptContent,
  setIsTemplate,
  setShowTemplateDialog,
}: {
  promptId: number;
  prompts: Prompt[];
  setCompiledPrompt: (prompt: Prompt | null) => void;
  setTemplateVariables: (variables: TemplateVariable[]) => void;
  setSelectedPrompt: (prompt: Prompt | null) => void;
  setPromptContent: (content: string) => void;
  setIsTemplate: (isTemplate: boolean) => void;
  setShowTemplateDialog: (showTemplateDialog: boolean) => void;
}) => {
  try {
    // 既存のコンパイル済みプロンプトと変数をリセット
    setCompiledPrompt(null);
    setTemplateVariables([]);
    const prompt = prompts.find((p) => p.id === promptId);
    if (!prompt) return;
    setSelectedPrompt(prompt);
    setPromptContent(prompt.content);
    setIsTemplate(prompt.isTemplate ?? false);

    // テンプレートの場合のみ変数を抽出
    if (prompt.isTemplate) {
      const content = prompt.content;
      const regex = /{([^}]+)}/g;
      const matches: RegExpMatchArray | null = content.match(regex);

      if (matches) {
        // 重複を除去して変数名を抽出
        const uniqueVariables = [
          ...new Set(matches.map((match) => match.slice(1, -1))),
        ];

        if (uniqueVariables.length > 0) {
          // 変数オブジェクトを作成してステートを更新
          setTemplateVariables(
            uniqueVariables.map((name) => ({ name, value: "" })),
          );
          // ダイアログを表示
          setShowTemplateDialog(true);
        }
      }
    }
  } catch (error) {
    console.error("Error fetching prompt:", error);
  }
};
