export interface Category {
    id: number;
    name: string;
  }

export interface CategoryFormProps {
    onSubmit: (data: Category) => void;
    category: Category | null;
  } 

export interface CategoryListProps {
    category: Category[];
    onEdit: (category: Category) => void;
  }
export interface ICategory {
    id: number;
    name: string;
  }
export interface ICategoryObject {
    id: number;
    category: ICategory;
  }