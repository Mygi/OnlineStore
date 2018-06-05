export enum BrowserType {
    Firefox,
    Chrome,
    IE,
    Edge,
    Safari,
    Opera
}

export enum BrowserState {
    loading,
    loaded,
    init,
    beforeChange,
    changeValid,
    afterChange,
    sessionEnded
}
export class Browser {
    browserType: BrowserType;
    browserVersion: string;
    deviceWidth: number;
    deviceHeight: number;
    screenHeight: number;
    screenWidth: number;
    browserState: BrowserState;
    scrollX: number;
    scrollY: number;
}
