export interface AjaxOptionTs {
  type: "get" | "post" | "GET";
  url: string;
  data: Document | XMLHttpRequestBodyInit | null | undefined;
  success: (key: string) => void;
  failed: (key: number) => void;
}

export interface AutoReboundTs {
  speedX: number;
  speedY: number;
  ms: number;
  className: string;
}
