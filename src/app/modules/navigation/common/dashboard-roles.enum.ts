// simple data structure to allow for stricter conventions in routing

export enum DashboardRoles {
    admin = 3,
    buyer = 2,
    seller = 1,
    public = 0
}
export enum UrlSegments {
    dashboard = 0,
    role = 0,
    page = 1
}
