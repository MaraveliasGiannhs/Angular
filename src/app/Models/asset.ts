import { AssetType } from "./asset-type";

export interface Asset {
  id : string;
  name : string;
  createdAt: string;
  updatedAt: string
  assetType: AssetType;
  }
