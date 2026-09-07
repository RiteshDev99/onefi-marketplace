export type ShopCategoryTabKey = 'top_brands' | 'nearby_stores' | 'marketplace';

export interface ShopCategoryTab {
  key: ShopCategoryTabKey;
  label: string;
  badge?: string;
  isImplemented: boolean;
}

export const SHOP_CATEGORY_TABS: ShopCategoryTab[] = [
  {
    key: 'top_brands',
    label: 'Top Brands',
    isImplemented: false,
  },
  {
    key: 'nearby_stores',
    label: 'Nearby Stores',
    isImplemented: false,
  },
  {
    key: 'marketplace',
    label: '1Fi Marketplace',
    badge: 'Live',
    isImplemented: true,
  },
];
