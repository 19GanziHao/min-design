import React from "react";
import type { CSSProperties, FC } from "react";
import { ThemeProps } from "../Icon/icon";

export interface ProgressProps {
  /**
   * 百分比
   */
  percent: number;
  /**
   * 设置高度
   */
  strokeHeight?: number;
  /**
   *是否显示文字
   */
  showText?: boolean;
  /**
   * 自定义样式
   */
  styles?: CSSProperties;
  /**
   * 自定义颜色
   */
  theme?: ThemeProps;
}

export const Progress: FC<ProgressProps> = (props) => {
  const { percent, strokeHeight, showText, styles, theme } = props;
  return (
    <div className="min-progress-bar" style={styles}>
      <div
        className="min-progress-bar-outer"
        style={{ height: `${strokeHeight}px` }}
      >
        <div
          className={`min-progress-bar-inner color-${theme}`}
          style={{ width: `${percent}%` }}
        >
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  );
};

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: "primary",
};
