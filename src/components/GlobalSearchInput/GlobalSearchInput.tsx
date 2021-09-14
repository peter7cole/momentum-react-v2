/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FC, useRef, useState, useEffect } from 'react';
import classnames from 'classnames';
import { useFocus } from '@react-aria/interactions';

import ButtonSimple from '../ButtonSimple';
import { STYLE } from './GlobalSearchInput.constants';
import { Props } from './GlobalSearchInput.types';
import './GlobalSearchInput.style.scss';
import { useSearchField } from '@react-aria/searchfield';
import { useSearchFieldState } from '@react-stately/searchfield';
import { difference } from 'lodash';

import Icon from '../Icon';
import { BaseEvent } from '@react-types/shared';
/**
 * Global search input. Used for global search only
 */
const GlobalSearchInput: FC<Props> = (props: Props) => {
  const {
    initialLabel = '',
    className,
    id,
    style,
    searching,
    onKeyDown,
    onFiltersChange,
    filters = [],
    clearButtonAriaLabel,
    onClear,
  } = props;
  const [previousFilters, setPreviousFilters] = useState(filters);
  const [focus, setFocus] = useState(false);
  const [ariaAlert, setAriaAlert] = useState('');
  const state = useSearchFieldState(props);
  const ref = useRef(null);
  const { focusProps } = useFocus({
    onFocus: () => {
      setFocus(true);
    },
    onBlur: () => {
      setFocus(false);
    },
  });

  useEffect(() => {
    const newFilters = difference(filters, previousFilters);
    if (newFilters.length) {
      setAriaAlert(newFilters[0].translations.filterAdded);
    }
    setPreviousFilters(filters);
  }, [JSON.stringify(filters)]);

  const onClearPress = () => {
    onFiltersChange([]);
    onClear();
  };

  const { inputProps, clearButtonProps, labelProps } = useSearchField(
    { ...props, placeholder: filters.length ? '' : props.placeholder, onClear: onClearPress },
    state,
    ref
  );

  const additionalClasses = [];
  if (focus) {
    additionalClasses.push('search-input-focus');
  }

  const handleClick = () => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const target = e.target as HTMLInputElement;
    if (key === 'Backspace') {
      if (!(target.selectionStart === 0 && target.selectionEnd === 0)) {
        return;
      }
      const filterToRemove = filters[filters.length - 1];
      onFiltersChange && filters.length && onFiltersChange(filters.slice(0, filters.length - 1));
      setAriaAlert(filterToRemove.translations.filterRemoved);
    } else {
      if (onKeyDown) {
        onKeyDown(e as BaseEvent<React.KeyboardEvent<HTMLInputElement>>);
      }
      inputProps.onKeyDown(e);
    }
  };

  const buildFilters = () => {
    const filterArray = [];
    const labels = [];
    filters.forEach((filter) => {
      labels.push(filter.value ? filter.translations.nonempty : filter.translations.empty);

      filterArray.push(
        <div key={filter.term} className="search-context-container">
          <p>{filter.translations.text}</p>
        </div>
      );
    });

    const label = labels.length ? `${labels.join(', ')}:` : initialLabel;

    return { filterArray, label };
  };

  const { label, filterArray } = buildFilters();

  return (
    <div
      className={classnames(className, STYLE.wrapper, ...additionalClasses)}
      id={id}
      onClick={handleClick}
      style={style}
    >
      <label htmlFor={inputProps.id} {...labelProps}>
        {label}
      </label>
      <div>
        <Icon
          weight="light"
          scale={18}
          className="search-icon"
          name={searching ? 'spinner' : 'search'}
        />
      </div>
      <div className="input-container">
        {filterArray}
        <input {...inputProps} {...focusProps} ref={ref} onKeyDown={handleKeyDown} />
        {ariaAlert && (
          <div className="aria-alert" aria-live="assertive" role="alert">
            {ariaAlert}
          </div>
        )}
      </div>
      {(!!state.value || !!filters.length) && (
        <ButtonSimple
          className="clear-icon"
          {...clearButtonProps}
          aria-label={clearButtonAriaLabel}
        >
          <Icon scale={18} name="cancel" />
        </ButtonSimple>
      )}
    </div>
  );
};

export default GlobalSearchInput;
