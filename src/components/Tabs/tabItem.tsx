import type {ReactNode, FC} from 'react'

export interface ITabItemProps {
  /** Tab选项上面的文字 */
  label: string | React.ReactElement;
  /** Tab选项是否被禁用 */
  disabled?: boolean;
  children?: ReactNode;
}

export const TabItem: FC<ITabItemProps> = (props) => {
  const { children } = props
  
  return <div className="viking-tab-panel">{children}</div>;
}

export default TabItem;