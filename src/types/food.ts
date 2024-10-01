export interface Food {
    id: number;
    name: string;
    category: string; 
    iddsi_level: number;
    iddsiLevelName?: string;
    categoryName?: string;
  }

  export interface AssignedFood {
    id: number;
    name: string;
    category: string
    iddsi_level: number;
    assigned: number;
    iddsiLevelName?: string;
    categoryName?: string;
  }

export interface FoodFormProps {
    onSubmit: (data: Food) => void;
    food: Food | null;
  } 

export interface FoodListProps {
    food: Food[];
    onEdit: (food: Food) => void;
  }

export interface FoodTableProps {
    assignedFoodList: AssignedFood[];
    unAssignedFoodList:AssignedFood[];
    onAssign: (id: number) => void;
    onUnAssign: (id: number) => void;
}

export interface IFoodItem {
  id?:number|string;
  name: string;
  category: string;
  iddsi_level: number;
  created_by?:number|string ; 
}

export interface IMainObject {
  id: number;
  food: IFoodItem;
}

export interface IAssignFood {
  resident_id: string;
  food_id: number;
  created_by?:number|string ; 
}
