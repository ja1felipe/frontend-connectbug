export type RewardRequestType = {
  name: string;
  url: string;
  notification_active: boolean;
  notification_title?: string;
  notification_text?: string;
};

export type RewardType = {
  id: string;
  name: string;
  url: string;
  notification_active: boolean;
  notification_title: string;
  notification_text: string;
  created_at: string;
  updated_at: string;
};
