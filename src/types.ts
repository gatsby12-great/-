export type ThemeId = 'minimal' | 'xiaohongshu' | 'knowledge';

export type WechatTheme = {
  id: ThemeId;
  name: string;
  description: string;
  containerStyle: string;
  tagStyles: Record<string, string>;
};
