import {
  DOMAttributes,
  forwardRef,
  MutableRefObject,
  Ref,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styles from './Item.module.scss';

type ReactRef<T> = Ref<T> | MutableRefObject<T>;

const assignRef = <T extends any = any>(
  ref: ReactRef<T> | undefined,
  value: T,
) => {
  if (ref == null) return;

  if (typeof ref === 'function') {
    ref(value);

    return;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ref.current = value;
  } catch (error) {
    throw new Error(`Cannot assign value '${value}' to ref '${ref}'`);
  }
};

const mergeRefs =
  <T extends any = any>(...refs: (ReactRef<T> | null | undefined)[]) =>
  (node: T | null) => {
    refs.forEach((ref) => {
      assignRef(ref, node);
    });
  };

const handlerAll =
  <T extends (event: any) => void>(...funcs: (T | undefined)[]) =>
  (event: (T extends (...args: infer R) => any ? R : never)[0]) => {
    funcs.some((func) => {
      func?.(event);

      return event?.defaultPrevented;
    });
  };

const halfToFullWidth = (value: string) => {
  value = value.replace(/[！-～]/g, (v) =>
    String.fromCharCode(v.charCodeAt(0) - 0xfee0),
  );

  const map: Record<string, string> = {
    ｶﾞ: 'ガ',
    ｷﾞ: 'ギ',
    ｸﾞ: 'グ',
    ｹﾞ: 'ゲ',
    ｺﾞ: 'ゴ',
    ｻﾞ: 'ザ',
    ｼﾞ: 'ジ',
    ｽﾞ: 'ズ',
    ｾﾞ: 'ゼ',
    ｿﾞ: 'ゾ',
    ﾀﾞ: 'ダ',
    ﾁﾞ: 'ヂ',
    ﾂﾞ: 'ヅ',
    ﾃﾞ: 'デ',
    ﾄﾞ: 'ド',
    ﾊﾞ: 'バ',
    ﾋﾞ: 'ビ',
    ﾌﾞ: 'ブ',
    ﾍﾞ: 'ベ',
    ﾎﾞ: 'ボ',
    ﾊﾟ: 'パ',
    ﾋﾟ: 'ピ',
    ﾌﾟ: 'プ',
    ﾍﾟ: 'ペ',
    ﾎﾟ: 'ポ',
    ｳﾞ: 'ヴ',
    ﾜﾞ: 'ヷ',
    ｦﾞ: 'ヺ',
    ｱ: 'ア',
    ｲ: 'イ',
    ｳ: 'ウ',
    ｴ: 'エ',
    ｵ: 'オ',
    ｶ: 'カ',
    ｷ: 'キ',
    ｸ: 'ク',
    ｹ: 'ケ',
    ｺ: 'コ',
    ｻ: 'サ',
    ｼ: 'シ',
    ｽ: 'ス',
    ｾ: 'セ',
    ｿ: 'ソ',
    ﾀ: 'タ',
    ﾁ: 'チ',
    ﾂ: 'ツ',
    ﾃ: 'テ',
    ﾄ: 'ト',
    ﾅ: 'ナ',
    ﾆ: 'ニ',
    ﾇ: 'ヌ',
    ﾈ: 'ネ',
    ﾉ: 'ノ',
    ﾊ: 'ハ',
    ﾋ: 'ヒ',
    ﾌ: 'フ',
    ﾍ: 'ヘ',
    ﾎ: 'ホ',
    ﾏ: 'マ',
    ﾐ: 'ミ',
    ﾑ: 'ム',
    ﾒ: 'メ',
    ﾓ: 'モ',
    ﾔ: 'ヤ',
    ﾕ: 'ユ',
    ﾖ: 'ヨ',
    ﾗ: 'ラ',
    ﾘ: 'リ',
    ﾙ: 'ル',
    ﾚ: 'レ',
    ﾛ: 'ロ',
    ﾜ: 'ワ',
    ｦ: 'ヲ',
    ﾝ: 'ン',
    ｧ: 'ァ',
    ｨ: 'ィ',
    ｩ: 'ゥ',
    ｪ: 'ェ',
    ｫ: 'ォ',
    ｯ: 'ッ',
    ｬ: 'ャ',
    ｭ: 'ュ',
    ｮ: 'ョ',
    '｡': '。',
    '､': '、',
    ｰ: 'ー',
    '｢': '「',
    '｣': '」',
    '･': '・',
  };

  const reg = new RegExp('(' + Object.keys(map).join('|') + ')', 'g');

  return value
    .replace(reg, (v) => map[v])
    .replace(/ﾞ/g, '゛')
    .replace(/ﾟ/g, '゜');
};

type Option = { label: string; value: string };

export type AutocompleteProps = Omit<
  DOMAttributes<HTMLInputElement>,
  'onChange'
> & {
  name?: string;
  value?: string;
  placeholder?: string;
  error?: boolean;
  options: Option[];
  noOptionsMessage?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
};

export const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
  (
    {
      value,
      options,
      noOptionsMessage = '該当がありません',
      error,
      onChange,
      onComplete,
      ...rest
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [computedValue, setComputedValue] = useState<string>(value ?? '');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (!inputRef.current) return;

      inputRef.current.value = value ?? '';
    }, []);

    const computedOptions: Option[] = useMemo(() => {
      const value = inputRef.current?.value ?? '';

      const values = value.replace('　', ' ').split(' ');
      const computedValues = values
        .map((value) => halfToFullWidth(value).toUpperCase())
        .filter(Boolean);

      return !computedValues.length
        ? options
        : options.filter(({ label }) =>
            computedValues.some((value) =>
              halfToFullWidth(label).toUpperCase().includes(value),
            ),
          );
    }, [inputRef.current?.value]);

    const onFocus = useCallback(() => {
      setIsOpen(true);
    }, []);

    const onBlur = useCallback(() => {
      setTimeout(() => {
        const value = inputRef.current?.value ?? '';

        const isCorrect = options.some(({ label }) => label === value);

        if (!isCorrect && inputRef.current) {
          inputRef.current.value = '';
          onChange?.('');
        }

        if (isCorrect) onComplete?.(computedValue);

        setIsOpen(false);
      }, 200);
    }, []);

    const onClick = useCallback((label: string, value: string) => {
      if (!inputRef.current) return;

      inputRef.current.value = label;
      setComputedValue(value);
      onChange?.(value);
    }, []);

    return (
      <div className={styles.autocomplete}>
        <input
          autoComplete="off"
          ref={mergeRefs(ref, inputRef)}
          placeholder="言語・フレームワーク"
          className={`${styles.item_input} ${error && styles.item_input_error}`}
          {...rest}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={handlerAll(rest.onFocus, onFocus)}
          onBlur={handlerAll(rest.onBlur, onBlur)}
        />

        {isOpen ? (
          <ul className={styles.autocomplete_menu}>
            {computedOptions.length ? (
              computedOptions.map(({ label, value }, i) => (
                <li
                  key={i}
                  className={styles.autocomplete_item}
                  onClick={() => onClick(label, value)}>
                  {label}
                </li>
              ))
            ) : (
              <li className={styles.autocomplete_not_found}>
                {noOptionsMessage}
              </li>
            )}
          </ul>
        ) : null}
      </div>
    );
  },
);
