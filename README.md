# BanHandler
BanHandler is a basic API to add and remove players from a banlist.
If a player is on that banlist, they will be disconnected each time they join that realm.

# Using in other Plugins
```ts
import { PluginApi } from './@interface/pluginApi.i'
import { BanHandler } from './@interface/BanHandler.i'

class examplePlugin {
    private api: PluginApi

    constructor(api: PluginApi) {
      this.api = api
    }

    public onLoaded(): void {
      this.api.getLogger().info('Plugin loaded!')
    }
    public onEnabled(): void {
      this.api.getLogger().info('Plugin enabled!')

      const banhandler = this.api.getPlugins().get("banhandler")
      const plugin = banhandler.plugin as unknown as BanHandler // The plugins banlist api
      for (const [, player] of this.api.getPlayerManager().getPlayerList()) {
        plugin.userAdd({
          player,
        }, "Hacking/Name Spoof", "Server")
      }

    }
    public onDisabled(): void {
      this.api.getLogger().info('Plugin disabled!')
    }
}

export = examplePlugin

```

# Methods

## onEnabled
```ts
onEnabled(): void
```
Fires when BeRP enables the plugin.

## onDisabled
```ts
onDisabled(): void
```
Fires when BeRP disables the plugin.

## userAdd
```ts
userAdd(options: Options, reason: String, auth: String): Promise<boolean>
```
Adds a user to the banlist.

Types: *[Options](https://github.com/BeRP-Plugins/BanHandler/blob/19d2b05238de61cd2ba035ea75f89521aef2e084/src/%40interface/BanHandler.i.ts#L19)*

## userRemove
```ts
userRemove(options: Options): Promise<boolean>
```
Removes a user to the banlist.

Types: *[Options](https://github.com/BeRP-Plugins/BanHandler/blob/19d2b05238de61cd2ba035ea75f89521aef2e084/src/%40interface/BanHandler.i.ts#L19)*

## userExist
```ts
userExist(options: Options): Promise<boolean>
```
Checks if a user exists in the banlist.

Types: *[Options](https://github.com/BeRP-Plugins/BanHandler/blob/19d2b05238de61cd2ba035ea75f89521aef2e084/src/%40interface/BanHandler.i.ts#L19)*

## getUser
```ts
getUser(options: Options): Promise<BanlistEntry>
```
Gets a players banlist entry.

Types: *[Options](https://github.com/BeRP-Plugins/BanHandler/blob/19d2b05238de61cd2ba035ea75f89521aef2e084/src/%40interface/BanHandler.i.ts#L19)*, *[BanlistEntry](https://github.com/BeRP-Plugins/BanHandler/blob/19d2b05238de61cd2ba035ea75f89521aef2e084/src/%40interface/BanHandler.i.ts#L25)*

## getAllUsers
```ts
getAllUsers(): Promise<BanlistEntry[]>
```
Gets all the player entries in the banlist.

Types: *[BanlistEntry](https://github.com/BeRP-Plugins/BanHandler/blob/19d2b05238de61cd2ba035ea75f89521aef2e084/src/%40interface/BanHandler.i.ts#L25)*

## getConfig
```ts
getConfig(): Config
```
Returns the config for the banlist.

Types: *[Config](https://github.com/BeRP-Plugins/BanHandler/blob/19d2b05238de61cd2ba035ea75f89521aef2e084/src/%40interface/BanHandler.i.ts#L32)*

## getDatabase
```ts
getDatabase(): Database
```
Returns the database.

Types: *[Database](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/bf23e7ce0f618e78de54c3f182469f9feaaadf9c/types/sqlite3/index.d.ts#L53)*

