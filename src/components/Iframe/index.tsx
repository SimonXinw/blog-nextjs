import React from "react";

interface IframeProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  src: string;
  width?: string | number;
  height?: string | number;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
}

const IframeComponent: React.FC<IframeProps> = ({
  src,
  width = "100%",
  height = "100%",
  title = "iframe",
  className,
  style,
  ...props
}) => {
  const iframeStyle: React.CSSProperties = {
    border: "none",
    width: "100%",
    height: "100%",
    flex: "1 1 auto",
    display: "block",
    overflow: "hidden",
    ...style, // 合并传入的 style
  };

  return (
    <iframe
      src={src}
      title={title}
      className={className} // 支持传入 className
      style={iframeStyle} // 支持传入 style
      {...props} // 支持其他所有 props
    />
  );
};

export default IframeComponent;
