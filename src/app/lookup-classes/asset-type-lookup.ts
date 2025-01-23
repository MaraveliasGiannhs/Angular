export interface AssetTypeLookup{
    id?: string 
    like?: string
    pageIndex: number
    itemsPerPage: number //match names to work with api
    orderItem:string
    ascendingOrder:boolean
}