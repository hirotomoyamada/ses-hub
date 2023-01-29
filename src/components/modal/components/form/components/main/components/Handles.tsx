import React from 'react';
import styles from './Item.module.scss';
import root from '../Main.module.scss';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import { useFormContext, useFieldArray, Controller } from 'react-hook-form';

import { Data } from 'functions/_form';
import { Autocomplete } from './Autocomplete';

interface PropType {
  index: 'matters' | 'resources';
}

const options = [
  { label: 'Java', value: 'Java' },
  { label: 'PHP', value: 'PHP' },
  { label: 'Python', value: 'Python' },
  { label: 'Ruby', value: 'Ruby' },
  { label: 'Go', value: 'Go' },
  { label: 'Scala', value: 'Scala' },
  { label: 'Perl', value: 'Perl' },
  { label: 'JavaScript', value: 'JavaScript' },
  { label: 'HTML', value: 'HTML' },
  { label: 'Swift', value: 'Swift' },
  { label: 'Objective-C', value: 'Objective-C' },
  { label: 'Kotlin', value: 'Kotlin' },
  { label: 'Unity', value: 'Unity' },
  { label: 'Cocos2d-x', value: 'Cocos2d-x' },
  { label: 'C', value: 'C' },
  { label: 'C++', value: 'C++' },
  { label: 'VC++', value: 'VC++' },
  { label: 'C#.NET', value: 'C#.NET' },
  { label: 'VB.NET', value: 'VB.NET' },
  { label: 'VB', value: 'VB' },
  { label: 'VBA', value: 'VBA' },
  { label: 'SQL', value: 'SQL' },
  { label: 'PL/SQL', value: 'PL/SQL' },
  { label: 'R', value: 'R' },
  { label: 'COBOL', value: 'COBOL' },
  { label: 'Apex', value: 'Apex' },
  { label: 'ASP.NET', value: 'ASP.NET' },
  { label: 'TypeScript', value: 'TypeScript' },
  { label: 'Stylus', value: 'Stylus' },
  { label: 'ESLint', value: 'ESLint' },
  { label: 'Vuex', value: 'Vuex' },
  { label: 'Rust', value: 'Rust' },
  { label: 'Dart', value: 'Dart' },
  { label: 'Node.js', value: 'Node.js' },
  { label: 'CakePHP', value: 'CakePHP' },
  { label: 'Ruby on Rails', value: 'Ruby on Rails' },
  { label: 'Spring', value: 'Spring' },
  { label: 'Django', value: 'Django' },
  { label: 'FuelPHP', value: 'FuelPHP' },
  { label: 'Struts', value: 'Struts' },
  { label: 'Catalyst', value: 'Catalyst' },
  { label: 'Spark', value: 'Spark' },
  { label: 'CodeIgniter', value: 'CodeIgniter' },
  { label: 'Symfony', value: 'Symfony' },
  { label: 'Zend Framework', value: 'Zend Framework' },
  { label: 'Flask', value: 'Flask' },
  { label: 'Pyramid', value: 'Pyramid' },
  { label: 'Kohana', value: 'Kohana' },
  { label: 'CherryPy', value: 'CherryPy' },
  { label: 'Seasar2', value: 'Seasar2' },
  { label: 'Backbone.js', value: 'Backbone.js' },
  { label: 'Knockout.js', value: 'Knockout.js' },
  { label: 'AngularJS', value: 'AngularJS' },
  { label: 'Laravel', value: 'Laravel' },
  { label: 'SAStruts', value: 'SAStruts' },
  { label: 'React', value: 'React' },
  { label: 'Vue.js', value: 'Vue.js' },
  { label: 'Phalcon', value: 'Phalcon' },
  { label: 'ReactNative', value: 'ReactNative' },
  { label: 'SpringBoot', value: 'SpringBoot' },
  { label: 'Slim', value: 'Slim' },
  { label: 'Yii', value: 'Yii' },
  { label: 'Ethna', value: 'Ethna' },
  { label: 'Tornado', value: 'Tornado' },
  { label: 'Ember.js', value: 'Ember.js' },
  { label: 'Flutter', value: 'Flutter' },
  { label: 'NET Core', value: 'NET Core' },
  { label: 'Bulma', value: 'Bulma' },
  { label: 'NuxtJS', value: 'NuxtJS' },
  { label: 'RSpec', value: 'RSpec' },
  { label: 'Flight', value: 'Flight' },
  { label: 'Swing', value: 'Swing' },
  { label: 'Next.js', value: 'Next.js' },
  { label: 'FastAPI', value: 'FastAPI' },
  { label: 'VBA', value: 'VBA' },
];

export const Handles: React.FC<PropType> = ({ index }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<Data['matter'] & Data['resource']>();

  const {
    fields: handlesFields,
    append: handlesAppend,
    remove: handlesRemove,
  } = useFieldArray({
    control,
    name: 'handles',
  });

  return (
    <div className={root.main_col}>
      <div className={root.main_grid}>
        {handlesFields.map((field, i) => (
          <Controller
            control={control}
            name={`handles.${i}.handle` as const}
            rules={{
              required: i === 0 && {
                value: true,
                message: '項目を入力してください',
              },
            }}
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <div key={field.id} className={styles.item}>
                <Autocomplete
                  ref={ref}
                  name={name}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  placeholder="言語・フレームワーク"
                  error={!!errors.handles?.[i]?.handle}
                  options={options}
                />

                <div className={styles.item_btn}>
                  {i !== 0 && (
                    <button
                      type="button"
                      className={styles.item_btn_remove}
                      onClick={() => handlesRemove(i)}>
                      <RemoveIcon className={styles.item_btn_icon} />
                    </button>
                  )}

                  {index === 'matters' &&
                    i === handlesFields.length - 1 &&
                    i < 4 && (
                      <button
                        type="button"
                        className={styles.item_btn_add}
                        onClick={() => handlesAppend({ handle: '' })}>
                        <AddIcon className={styles.item_btn_icon} />
                      </button>
                    )}

                  {index === 'resources' &&
                    i === handlesFields.length - 1 &&
                    i < 9 && (
                      <button
                        type="button"
                        className={styles.item_btn_add}
                        onClick={() => handlesAppend({ handle: '' })}>
                        <AddIcon className={styles.item_btn_icon} />
                      </button>
                    )}
                </div>

                {errors?.handles?.[i]?.handle?.message && (
                  <span className={styles.item_error}>
                    {errors.handles[i].handle?.message}
                  </span>
                )}
              </div>
            )}
          />
        ))}
      </div>
    </div>
  );
};
