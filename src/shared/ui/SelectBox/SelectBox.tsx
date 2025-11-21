"use client";

import * as Select from "@radix-ui/react-select";
import s from "./SelectBox.module.scss";

type Props = {
  label: string;
  options: string[];
  value: string;
  placeholder?: string;
  disabled?: boolean;
  icon?: string; // Необходимо передать имя svg файла с иконкой без '.svg'
  onChange: (val: string) => void;
};

export const SelectBox = (props: Props) => {
  const { value, label, options, placeholder, disabled, icon, onChange } = props;

  return (
    <>
      <div className="wrapper">
        {label && <div className={s.label}>{label}</div>}
        <Select.Root value={value} onValueChange={onChange} disabled={disabled}>
          <Select.Trigger className={s.trigger} aria-label={label ?? placeholder}>
            {icon && (
              <Select.Icon className={s.iconLeft}>
                <img src={"/icons/" + icon + ".svg"} alt="icon" />
              </Select.Icon>
            )}

            {/* здесь оторажается vale указанное
            в root, а placeholder в зависимости от того указан он или нет */}
            <Select.Value placeholder={placeholder} />

            <Select.Icon className={s.icon}>
              <img src="icons/arrow.svg" alt="arrow" />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            {/* ⬇️ sideOffset={-1} нужен чтобы убрать расстояние между триггетом и выпадающим
            контентом, position="popper" указывает что контент располагается относительно
            портала, т.е. не рядом с тригером */}
            <Select.Content className={s.content} sideOffset={-1} position="popper">
              <Select.Viewport className={s.viewport}>
                {options.map(option => (
                  <Select.Item key={option} value={option} className={s.item}>
                    <Select.ItemText>{option}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
    </>
  );
};
