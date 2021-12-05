import {
  PluginApi, 
} from './@interface/pluginApi.i'
import fs from 'fs'
import path from 'path'
import {
  Database,
  OPEN_CREATE,
  OPEN_READWRITE,
} from 'sqlite3'
import {
  Options,
  BanlistEntry,
} from './@interface/BanHandler'

class BanHandler {
    private api: PluginApi
    private db: Database

    constructor(api: PluginApi) {
      this.api = api
    }

    public onEnabled(): void {
      this.api.getLogger().info('Enabled!')
      const dbCheck = this._dbCheck()
      if (!dbCheck) {
        this.api.getLogger().warn("banlist.db does not exist! Attempting to create Database.")
        this.db = new Database(path.resolve(this.api.path + "/banlist.db"), OPEN_CREATE | OPEN_READWRITE, err => {
          if (err) return this.api.getLogger().error(err)
        })
        this.api.getLogger().success("Successfully mounted to banlist.db!")
      } else {
        this.db = new Database(path.resolve(this.api.path + "/banlist.db"), OPEN_READWRITE, err => {
          if (err) return this.api.getLogger().error(err)
        })
        this.api.getLogger().success("Successfully mounted to banlist.db!")
      }
      this.db.run(`CREATE TABLE IF NOT EXISTS bans(name TEXT, reason TEXT, date TEXT, auth TEXT)`, (err) => {
        if (err) return this.api.getLogger().error(err)
      })
      this.api.getEventManager().on("PlayerInitialized", async (player) => {
        const check = await this.userExist({
          player,
        })
        if (!check) return
        const data = await this.getUser({
          player,
        })
        player.kick(`§r\n§7You have been banned from §l${this.api.getRealmManager().getName()}§r§7.\nYou can apply for an apeal on our Discord, our code: §l§9XXX-XXX§r§7.\n§7You Were Banned on§b ${data.date}§7, by §c${data.auth}§7.\n§7Ban Reason:§r §l§c${data.reason}`)
      })
    }
    public onDisabled(): void {
      this.api.getLogger().info('Disabled!')
    }
    private _dbCheck(): boolean {
      return fs.existsSync(path.resolve(this.api.path + "/banlist.db"))
    }
    public async userAdd(options: Options, reason: string, auth: string): Promise<boolean> {
      return new Promise(async (res) => {
        const check = await this.userExist(options)
        if (check) {
          this.api.getLogger().warn(`The player with the xuid of ${options.xuid || options.player.getXuid()} already exists in the banlist.`)

          return res(false)
        } else {
          this.db.run(`INSERT INTO bans VALUES("${options.xuid || options.player.getXuid()}", "${reason}", "${(new Date().getMonth() + 1) + '/' + new Date().getDate() + '/' + new Date().getFullYear()}", "${auth}")`)

          return res(true)
        }
      })
    }
    public async userExist(options: Options): Promise<boolean> {
      return new Promise((res) => {
        this.db.get(`SELECT name FROM bans WHERE name = "${options.xuid || options.player.getXuid()}"`, (err, row) => {
          if (err) return this.api.getLogger().error(err)
          if (row == undefined) return res(false)
    
          return res(true)
        })
      })
    }
    public async getUser(options: Options): Promise<BanlistEntry> {
      return new Promise((res) => {
        this.db.all(`SELECT * FROM bans WHERE name = "${options.xuid || options.player.getXuid()}"`, (err, rows) => {
          if (err) return this.api.getLogger().error(err)
          
          return res(rows[0])
        })
      })
    }
}

export = BanHandler
