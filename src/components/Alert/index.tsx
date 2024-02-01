import classNames from "classnames";
import { useState } from 'react';

type AlertType = 'success' | 'default' | 'danger' | 'warning';

export interface IAlertProps {
  /**
   * 标题
   */
  title: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * 类型
   */
  type?: AlertType;
  /**
   * 关闭alert时触发的事件
   */
  onClose?: () => void;
  /**
   * 是否显示关闭图标
   */
  closable?: boolean;
}

const Alert: React.FC<IAlertProps> = (props) => {
  const { title, description, type = 'default', onClose, closable } = props;
  const [hide, setHide] = useState(false)
  const classes = classNames('min-alert', {
    [`min-alert-${type}`]: type
  })

  const titleClass = classNames('min-alert-title', {
    'bold-title': description
  })

  const handleClose = (e: React.MouseEvent) => {
    if (onClose) onClose()
    setHide(true)
  }

  return (
      <div className={classes}>
        <span className={titleClass}>{title}</span>
        {description && <p className="min-alert-desc"> {description}</p>}
        {closable && (
          <span className="min-alert-close" onClick={handleClose}>X</span>
        )}
      </div>
  );
};

Alert.defaultProps = {
  title: "成功提示的文案"
};

export default Alert