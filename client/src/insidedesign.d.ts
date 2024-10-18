/* eslint-disable @typescript-eslint/no-explicit-any */

declare type CibColor =
  | 'gray-100'
  | 'gray-200'
  | 'gray-300'
  | 'gray-400'
  | 'gray-500'
  | 'gray-600'
  | 'gray-700'
  | 'gray-800'
  | 'gray-000'
  | 'accent'
  | 'secondary'
  | 'azure'
  | 'blueberry'
  | 'cherry'
  | 'cobalt'
  | 'forest'
  | 'fuchsia'
  | 'peacock'
  | 'plum'
  | 'pumpkin'
  | 'terracotta'
  | 'danger'
  | 'info'
  | 'success'
  | 'warning'
  | 'primary-hover'
  | 'primary-pressed'
  | 'primary-selected'
  | 'primary-background'
  | 'primary'
  | 'transparent'
  | 'cacib-200'
  | 'azure-200'
  | 'red-200'
  | 'cherry-200'
  | 'terracotta-200'
  | 'divider'
  | 'logo'
  | 'tableRowHover'
  | 'tableRow'
  | 'dark-gray-100'
  | 'dark-gray-200'
  | 'dark-gray-300'
  | 'dark-gray-400'
  | 'dark-gray-500'
  | 'dark-gray-600'
  | 'dark-gray-700'
  | 'dark-gray-800'
  | 'dark-gray-000'
  | 'dark-accent'
  | 'dark-secondary'
  | 'dark-azure'
  | 'dark-blueberry'
  | 'dark-cherry'
  | 'dark-cobalt'
  | 'dark-forest'
  | 'dark-fuchsia'
  | 'dark-peacock'
  | 'dark-plum'
  | 'dark-pumpkin'
  | 'dark-terracotta'
  | 'dark-danger'
  | 'dark-info'
  | 'dark-success'
  | 'dark-warning'
  | 'dark-primary-hover'
  | 'dark-primary-pressed'
  | 'dark-primary-selected'
  | 'dark-primary-background'
  | 'dark-primary'
  | 'dark-transparent'
  | 'dark-divider'
  | 'dark-logo'
  | 'dark-tableRowHover'
  | 'dark-tableRow';

declare type CibIconName =
  | 'ic_setting'
  | 'ic_flat_delete_filter'
  | 'ic_chevron_left'
  | 'ic_chevron_right'
  | 'ic_chevron_up'
  | 'ic_chevron_down'
  | 'ic_flat_transfert'
  | 'ic_flat_close'
  | 'ic_close'
  | 'ic_expand'
  | 'ic_delete'
  | 'ic_outlined_alert'
  | 'ic_flat_alert'
  | 'ic_flat_info'
  | 'ic_search'
  | 'ic_filled_close';

declare namespace JSX {
  interface IntrinsicElements {
    'cib-header': any;
    'cib-logo': any;
    'cib-icon': {
      name: CibIconName;
      size?: number;
      color?: string;
      'no-fill'?: boolean;
      stroke?: boolean;
      class?: string;
      'no-hover'?: boolean;
      'no-active'?: boolean;
      context?: string;
      onClick?: (param: any) => void;
    };
    'cib-language': any;
    'cib-avatar': any;
    'cib-footer': any;
    'cib-toast': { position?: 'top' | 'bottom'; placement?: 'right' | 'center'; 'vertical-distance'?: string | number };
    'cib-radio-button': {
      label: string;
      name: string;
      checked: boolean;
      disabled?: boolean;
      error?: boolean;
    };
    'cib-button': {
      text?: string;
      value?: string;
      outlined?: boolean;
      small?: boolean;
      disabled?: boolean;
      'icon-name-left'?: CibIconName;
      'icon-name-right'?: CibIconName;
      'icon-name-center'?: CibIconName;
      fill?: boolean;
      type?: 'submit' | 'reset' | 'button';
      onClick?: (param: any) => void;
      class?: string;
      children?: React.ReactNode;
    };
    'cib-checkbox': {
      label: string;
      name: string;
      checked: boolean;
      disabled?: boolean;
      error?: boolean;
      key?: string | number;
      onClick?: (event: Event) => void;
    };
    'cib-tag': {
      text: string;
      color: CibColor;
      type?: 'category' | 'status';
      outlined?: boolean;
    };
    'cib-toggle': { label?: string; name?: string; disabled?: boolean; toggled?: boolean; onClick?: () => void };
    'cib-tooltip': {
      'title-text'?: string;
      position?: 'top' | 'bottom' | 'left' | 'right';
      'pointer-placement'?: 'start' | 'middle' | 'end';
      'background-color'?: 'white' | 'gray';
      persistent?: boolean;
      children: React.ReactNode;
    };
    'cib-input-text': {
      value?: string;
      name?: string;
      label?: string;
      placeholder?: string;
      instruction?: string;
      valid?: boolean;
      'error-text'?: string;
      disabled?: boolean;
      required?: boolean;
      width?: string | number;
      autocomplete?: string;
      'optional-text'?: string;
      'tooltip-title'?: string;
      'tooltip-text'?: string;
      'tooltip-position'?: string;
      onChange?: (event: { target: any }) => void;
      onBlur?: (event: { target: any }) => void;
    };
  }
}
