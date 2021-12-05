import { Player } from "./pluginApi.i"

export interface Options {
    xuid?: string
    player?: Player
}

export interface BanlistEntry {
    name: string
    reason: string
    date: string
    auth: string
}
