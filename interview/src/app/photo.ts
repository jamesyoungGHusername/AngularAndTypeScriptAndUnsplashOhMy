export interface Photo {
    id:String;
    created_at:String;
    width:Number;
    height:Number;
    description:String;
    urls:String;
    links:Links;
}
export interface PhotoSearch {
    total:number;
    total_pages:number;
    results:Photo[]
}
export interface Links{
    self:String;
    html:String;
    download:String;
    download_location:String;
}
