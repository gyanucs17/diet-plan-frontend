export interface Resident {
    id: number;
    name: string;
    iddsi_level: number;
    iddsiLevelName?: string;
  }
export interface IGetResident {
    id: number;
    name: string;
    iddsi_level: string;
    iddsiLevelName: string;
  }
export interface ResidentSelectProps {
  onChange: (residentName: string) => void;
}  

export interface ResidentFormProps {
  onSubmit: (data: Resident) => void;
  resident: Resident | null;
}

export interface ResidentListProps {
  resident: Resident[];
  onEdit: (resident: Resident) => void;
}

export interface IHomeItem {
  id?:number|string;
  name: string;
  iddsi_level: number;
  created_by?:number|string ; 
}

export interface IHomeObject {
  id: number;
  resident: IHomeItem;
}