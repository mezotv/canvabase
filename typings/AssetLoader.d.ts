export = AssetLoader;
declare class AssetLoader {
    constructor(...sourceDirectories: any[]);
    assetDirs: string[];
    load(): Promise<any>;
    readDir(directory: any): Promise<any>;
}
//# sourceMappingURL=AssetLoader.d.ts.map