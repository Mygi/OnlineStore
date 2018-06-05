export class Pagination {
   public total: number;
   public count: number;
   public perPage: number;
   public currentPage: number;
   public totalPages: number;
   public links: string[];
   /**
    *
    */
    constructor( total: number,
        count: number,
        per_page: number,
        current_page: number,
        total_pages: number,
        links: string[]) {
       this.total        = total;
       this.count        = count;
       this.perPage      = per_page;
       this.currentPage  = current_page;
       this.totalPages   = total_pages;
       this.links        = links;
   }
}
