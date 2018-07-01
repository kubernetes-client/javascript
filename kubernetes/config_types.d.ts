export interface Cluster {
    readonly name: string;
    readonly caData: string;
    readonly caFile: string;
    readonly server: string;
    readonly skipTLSVerify: boolean;
}
export declare function newClusters(a: any): Cluster[];
export interface User {
    readonly name: string;
    readonly certData: string;
    readonly certFile: string;
    readonly keyData: string;
    readonly keyFile: string;
    readonly authProvider: any;
    readonly token: string;
    readonly username: string;
    readonly password: string;
}
export declare function newUsers(a: any): User[];
export interface Context {
    readonly cluster: string;
    readonly user: string;
    readonly name: string;
}
export declare function newContexts(a: any): Context[];
