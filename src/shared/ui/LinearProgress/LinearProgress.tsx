import s from "./LinearProgress.module.scss";

type Props = {
  height?: number;
  width?: number;
};

export const LinearProgress = ({ height = 4, width }: Props) => {
  return (
    <div className={s.root} style={{ height, width }}>
      <div className={`${s.bar} ${s.indeterminate1}`} />
      <div className={`${s.bar} ${s.indeterminate2}`} />
    </div>
  );
};
