export interface _api {
  getData: () => Promise<any> | any;
  getAuth: () =>
    | Promise<any>
    | {
        status: number;
        body: {
          accessToken?: string;
        };
      };
}
