export type ThemeId =
  | 'minimal'
  | 'xiaohongshu'
  | 'knowledge'
  | 'magazine'
  | 'tech'
  | 'orange'
  | 'green'
  | 'dark'
  | 'fable';

export type FontSize = 'compact' | 'normal' | 'large';
export type LineHeight = 'tight' | 'normal' | 'loose';
export type PreviewWidth = 'phone' | 'wechat';

export type EditorOptions = {
  fontSize: FontSize;
  lineHeight: LineHeight;
  previewWidth: PreviewWidth;
};

export type WechatTheme = {
  id: ThemeId;
  name: string;
  description: string;
  containerStyle: string;
  tagStyles: Record<string, string>;
  classStyles: Record<string, string>;
};

export type LayoutBlock = {
  id: string;
  name: string;
  group: string;
  description: string;
  snippet: string;
};
