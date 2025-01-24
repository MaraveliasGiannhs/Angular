import { AssetType } from "../Models/asset-type"

export interface AssetLookup{
    id?: string 
    like: string
    pageIndex: number
    itemsPerPage: number //match names to work with api
    orderItem:string
    ascendingOrder:boolean
}