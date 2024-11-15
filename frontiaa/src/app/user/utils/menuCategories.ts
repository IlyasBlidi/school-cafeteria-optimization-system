export type Category = {
    id: string;
    icon: string;
    label: string;
    count: string;
}
  
// hadchi khass i dynamisa men baed (ila zedna chi plat itzad `count`)
export const menuCategories: Category[] = [
    {
      id: 'breakfast',
      icon: '🍳',
      label: 'Breakfast',
      count: '12 Menu In Stock'
    },
    {
      id: 'lunch',
      icon: '🍱',
      label: 'Lunch',
      count: '12 Menu In Stock'
    },
    {
      id: 'dinner',
      icon: '🍽️',
      label: 'Dinner',
      count: '12 Menu In Stock'
    },
    {
      id: 'soup',
      icon: '🥣',
      label: 'Soup',
      count: '12 Menu In Stock'
    },
    {
      id: 'desserts',
      icon: '🍨',
      label: 'Desserts',
      count: '12 Menu In Stock'
    },
    {
      id: 'sideDish',
      icon: '🥗',
      label: 'Side Dish',
      count: '12 Menu In Stock'
    },
    {
      id: 'appetizer',
      icon: '🥟',
      label: 'Appetizer',
      count: '12 Menu In Stock'
    },
    {
      id: 'beverages',
      icon: '☕',
      label: 'Beverages',
      count: '12 Menu In Stock'
    }
  ];