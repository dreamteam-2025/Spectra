import s from "./DocumentLayout.module.scss";

interface DocumentLayoutProps {
  title: string;
  content: string;
}

export const DocumentLayout = ({ title, content }: DocumentLayoutProps) =>{
  return (
    <div className={s.documentLayout}>
      <h1>{title}</h1>
      <div className={s.content}>{content}</div>
    </div>
  );
}