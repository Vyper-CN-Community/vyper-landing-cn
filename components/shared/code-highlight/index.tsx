import type { FC, ComponentProps } from "react";
import { BundledLanguage, codeToHtml } from "shiki";

export const CodeHighlight: FC<
  ComponentProps<"div"> & {
    lang: BundledLanguage;
    children: string;
  }
> = ({ children, lang, ...props }) => {
  return (
    <div {...props}>
      <h4 className="text-lg">{lang}</h4>
      <CodeBlock lang={lang}>{String(children)}</CodeBlock>
    </div>
  );
};

type Props = {
  children: string;
  lang: BundledLanguage;
};

async function CodeBlock(props: Props) {
  const out = await codeToHtml(props.children.replace(/^\n/, ""), {
    lang: props.lang,
    theme: "github-dark",
  });

  return (
    <div
      className="[&_pre]:rounded-md [&_pre]:p-4"
      dangerouslySetInnerHTML={{ __html: out }}
    />
  );
}
