import { CibClass } from '#/cibClass';
import React from 'react';

export type ModalProps = {
  title: string;
  children?: React.ReactNode;
  onCloseModal: () => void;
  onValidate: () => void;
  size?: 'big';
  validationDisabled?: boolean;
};
export const Modal: React.FC<ModalProps> = ({
  title,
  children,
  onCloseModal,
  onValidate,
  size,
  validationDisabled,
}) => {
  return (
    <div data-testid="modal" className={CibClass.cibModalScreenContainer} onMouseDown={onCloseModal}>
      <div className={CibClass.cibModalContainer} onMouseDown={(event) => event.stopPropagation()}>
        <div
          data-testid="modal-top"
          className={`${CibClass.cibModalTopContainer} ${CibClass.cibMainFontHeadingMRegularUppercase} ${CibClass.cibBgGray100} ${CibClass.cibShadowXsDown} text-capitalize`}
        >
          <span className={CibClass.cibZ1}>{title}</span>
          <div className={CibClass.cibModalCrossContainer}>
            <cib-icon name="ic_close" size={1.5} onClick={onCloseModal}></cib-icon>
          </div>
        </div>
        <div
          className={`${CibClass.cibModalContentContainer} ${CibClass.cibMainFontBodyMRegular} ${
            CibClass.cibScrollbar
          } ${CibClass.cibOverflowYAuto}${size === 'big' ? ' rps-modal-big' : ''}`}
          style={{ maxHeight: 'calc(100vh - 286px)' }}
        >
          <div className={`${CibClass.cibWFull} ${CibClass.cibModalDescriptionContainer}`}>{children}</div>
          <div className={CibClass.cibModalButtonContainer}>
            <cib-button small text="Cancel" outlined onClick={onCloseModal}></cib-button>
            <cib-button
              small
              text="Validate"
              onClick={() => {
                onValidate();
                onCloseModal();
              }}
              disabled={validationDisabled}
            ></cib-button>
          </div>
        </div>
      </div>
    </div>
  );
};
