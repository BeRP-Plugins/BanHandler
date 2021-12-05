import {
  Player,
  PluginApi,
} from "./pluginApi.i"

export interface BanHandler {
    new (api: PluginApi)
    onEnabled(): void
    onDisabled(): void
    userAdd(options: Options, reason: string, auth: string): Promise<boolean>
    userRemove(options: Options): Promise<boolean>
    userExist(options: Options): Promise<boolean>
    getUser(options: Options): Promise<BanlistEntry>
    getAllUsers(): Promise<BanlistEntry[]>
    getConfig(): Config
    getDatabase(): any // sqlite3 Database
}

export interface Options {
    // Can be a players Xuid or the BeRP player class.
    xuid?: string
    player?: Player
}

export interface BanlistEntry {
    name: string
    reason: string
    date: string
    auth: string
}

export interface Config {
    discordCode: string
    whitelist: string[]
}
