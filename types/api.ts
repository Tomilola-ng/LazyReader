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
  upload: (file: File) => Promise<any>
      | null
      | {
          message: string,
          file: {
            key: string,
            name: string,
            url: string
          },
          status: number
        };
}
