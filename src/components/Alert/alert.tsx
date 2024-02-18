import classNames from "classnames";
import { useState } from "react";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";

type AlertType = "success" | "default" | "danger" | "warning";

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

export const Alert: React.FC<IAlertProps> = (props) => {
  const { title, description, type = "default", onClose, closable } = props;
  const [hide, setHide] = useState(false);
  const classes = classNames("min-alert", {
    [`min-alert-${type}`]: type,
  });

  const titleClass = classNames("min-alert-title", {
    "bold-title": description,
  });

  const handleClose = (e: React.MouseEvent) => {
    if (onClose) onClose();
    setHide(true);
  };

  return (
    <Transition in={!hide} timeout={300} animation="zoom-in-top">
      <div className={classes}>
        <div className="min-alert-top">
          <span className={titleClass}>{title}</span>
          {closable && (
            <span className="min-alert-close" onClick={handleClose}>
              <Icon icon="times" size="lg" />
            </span>
          )}
        </div>
        {description && <p className="min-alert-desc"> {description}</p>}
      </div>
    </Transition>
  );
};

Alert.defaultProps = {
  closable: true,
};
